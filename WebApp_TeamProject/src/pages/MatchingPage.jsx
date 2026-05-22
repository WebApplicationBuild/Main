import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Category from '../components/MatchingPage/Category';
import Writing from '../components/MatchingPage/Writing';
import Board from '../components/MatchingPage/Board';
import { matchingPosts } from '../api/mockData';
import '../styles/Matching.css';

function Matching() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postIdFromUrl = Number(searchParams.get("postId"));
  
  const [isWritingMode, setIsWritingMode] = useState(false);//현재 화면이 글쓰기 모드인지 여부 (true=글쓰기 화면, false=목록 화면)
  const [selectedPostId, setSelectedPostId] = useState(null);//현재 상세보기(아코디언)가 열린 게시글 id (없으면 null)
  
  // 데이터 상태 관리
  const [posts, setPosts] = useState(matchingPosts);//등록된 게시글 목록 배열 (초기값으로 mock 데이터 사용)

  const [activeCategories, setActiveCategories] = useState([]); //현재 필터로 선택된 카테고리 이름 배열
  const [searchTerm, setSearchTerm] = useState(''); // 실시간 검색어 상태 관리

  const selectedPost =
    posts.find((post) => post.id === selectedPostId) ||
    posts.find((post) => post.id === postIdFromUrl) ||
    null;

  // URL 파라미터(postId)가 있으면 해당 게시글 위치로 스크롤
  useEffect(() => {
    if (!postIdFromUrl) return;
    const targetPost = posts.find((post) => post.id === postIdFromUrl);
    if (targetPost) {
      // DOM이 렌더링될 시간을 벌기 위해 약간의 지연 후 스크롤 이동
      setTimeout(() => {
        const element = document.getElementById(`post-${postIdFromUrl}`);
        if (element) {
          // 헤더 높이(72px) 등을 고려하여 화면 중앙쯤에 오도록 부드럽게 스크롤
          const y = element.getBoundingClientRect().top + window.scrollY - 150;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 300); // 300ms 지연
    }
  }, [postIdFromUrl, posts]);

  // Writing 컴포넌트에서 새 게시글이 등록될 때 호출되는 핸들러
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]); // 최신 글이 위로 오도록 맨 앞에 추가
    setIsWritingMode(false);       // 글쓰기 모달 닫기
  };

  // 카테고리 버튼 클릭 시 선택/해제를 토글하는 핸들러
  const handleCategoryClick = (cat) => {
    setActiveCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((item) => item !== cat) // 이미 선택되어 있으면 해제
        : [...prev, cat]                      // 아니면 추가
    );
  };

  // 1. 검색어로 필터링하고 2. 카테고리 + 검색어 연관성 기준으로 정렬
  const filteredAndSortedPosts = [...posts]
    .filter((post) => {
      if (!searchTerm.trim()) return true; // 검색어가 없으면 모두 통과

      const lowerSearchTerm = searchTerm.toLowerCase();
      // 제목이나 내용(또는 카테고리 등)에 검색어가 포함되어 있는지 확인
      const titleMatch = post.title?.toLowerCase().includes(lowerSearchTerm);
      const contentMatch = post.content?.toLowerCase().includes(lowerSearchTerm);
      
      return titleMatch || contentMatch;
    })
    .sort((a, b) => {
      // 카테고리 매칭 점수 계산
      const aCategoryMatchCount = activeCategories.length > 0 
        ? activeCategories.filter(cat => String(a.category).includes(cat)).length 
        : 0;
      const bCategoryMatchCount = activeCategories.length > 0 
        ? activeCategories.filter(cat => String(b.category).includes(cat)).length 
        : 0;

      // 검색어 연관성 추가 (제목에 포함되면 더 높은 가중치 부여)
      let aSearchScore = 0;
      let bSearchScore = 0;
      
      if (searchTerm.trim()) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        if (a.title?.toLowerCase().includes(lowerSearchTerm)) aSearchScore += 2;
        else if (a.content?.toLowerCase().includes(lowerSearchTerm)) aSearchScore += 1;

        if (b.title?.toLowerCase().includes(lowerSearchTerm)) bSearchScore += 2;
        else if (b.content?.toLowerCase().includes(lowerSearchTerm)) bSearchScore += 1;
      }

      const aTotalScore = aCategoryMatchCount + aSearchScore;
      const bTotalScore = bCategoryMatchCount + bSearchScore;

      // 총점이 다르면 총점이 높은 순으로, 같으면 최신 글이 위로 오도록 유지(기본이 최신순이므로 0 반환)
      return bTotalScore - aTotalScore;
    });

  return (
    <div className="matching-container">
      <header className="matching-header">
        <div className="matching-header__logo" onClick={() => navigate('/')}>
          로고
        </div>
        <h1 className="matching-header__title">
          매칭 페이지
        </h1>
        <div className="matching-header__spacer" />
      </header>

      <main className="matching-main">
        <div className="matching-content">
          <div className="search-section" style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="제목이나 내용을 검색해보세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
          </div>

          <div className="category-wrapper">
            <Category
              activeCategories={activeCategories}
              onCategoryClick={handleCategoryClick}
            />
            {/* 글쓰기 버튼 */}
            <button className="btn-main" onClick={() => setIsWritingMode(true)}>
              글쓰기
            </button>
          </div>

          <Board
            posts={filteredAndSortedPosts}
            selectedPost={selectedPost}
            onPostClick={(post) =>
              setSelectedPostId((prevId) => (prevId === post.id ? null : post.id))
            }
            searchTerm={searchTerm}
            activeCategories={activeCategories}
          />
        </div>
      </main>

      {/* 글쓰기 모달 영역 */}
      {isWritingMode && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Writing onSave={addPost} onCancel={() => setIsWritingMode(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Matching;
