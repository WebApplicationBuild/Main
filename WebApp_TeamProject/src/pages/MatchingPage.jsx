import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Category from '../components/MatchingPage/Category';
import Writing from '../components/MatchingPage/Writing';
import Board from '../components/MatchingPage/Board';
import '../styles/Matching.css';

function Matching() {
  const navigate = useNavigate();

  
  const [isWritingMode, setIsWritingMode] = useState(false);//현재 화면이 글쓰기 모드인지 여부 (true=글쓰기 화면, false=목록 화면)
  const [selectedPost, setSelectedPost] = useState(null);//현재 상세보기(아코디언)가 열린 게시글 객체 (없으면 null)
  
  // 데이터 상태 관리
  const [posts, setPosts] = useState([]);//등록된 게시글 목록 배열 (초기값은 빈 배열)
  const [activeCategories, setActiveCategories] = useState([]); //현재 필터로 선택된 카테고리 이름 배열

  // Writing 컴포넌트에서 새 게시글이 등록될 때 호출되는 핸들러
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]); // 최신 글이 위로 오도록 맨 앞에 추가
    setIsWritingMode(false);       // 리스트 화면으로 복귀
  };

  // 카테고리 버튼 클릭 시 선택/해제를 토글하는 핸들러
  const handleCategoryClick = (cat) => {
    setActiveCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((item) => item !== cat) // 이미 선택되어 있으면 해제
        : [...prev, cat]                      // 아니면 추가
    );
  };

  // 선택된 카테고리와 일치하는 키워드가 많은 순으로 게시글 정렬
  const sortedPosts = [...posts].sort((a, b) => {
    if (activeCategories.length === 0) return 0; // 선택된 카테고리가 없으면 정렬하지 않음 (원래 순서 유지)
    
    const aMatchCount = activeCategories.filter(cat => String(a.category).includes(cat)).length;
    const bMatchCount = activeCategories.filter(cat => String(b.category).includes(cat)).length;
    
    return bMatchCount - aMatchCount; // 내림차순 정렬
  });

  return (
    <div className="matching-container">
      <header className="matching-header">
        {/* 메인페이지와 동일한 로고 */}
        <div className="matching-header__logo" onClick={() => navigate('/')}>
          로고
        </div>

        <h1 className="matching-header__title">
          {/* 글쓰기 모드이면 '글쓰기 페이지', 아니면 '매칭 페이지'를 표시 */}
          {isWritingMode ? '글쓰기 페이지' : '매칭 페이지'}
        </h1>

        <div className="matching-header__spacer" />
      </header>

      <main className="matching-main">
        <div className="matching-content">
          {/* 글쓰기 모드이면 Writing 컴포넌트를, 아니면 목록 화면을 렌더링 */}
          {isWritingMode ? (
            <Writing onSave={addPost} onCancel={() => setIsWritingMode(false)} />
          ) : (
            <>
              <div className="category-wrapper">
                <Category
                  activeCategories={activeCategories}
                  onCategoryClick={handleCategoryClick}
                />
                 {/* 글쓰기 버튼: 클릭 시 isWritingMode를 true로 변경하여 글쓰기 화면으로 전환 */}
                <button className="btn-main" onClick={() => setIsWritingMode(true)}>
                  글쓰기
                </button>
              </div>
              <Board
                posts={sortedPosts}  // 카테고리 필터 기준으로 정렬된 게시글 배열
                selectedPost={selectedPost} // 현재 상세보기가 열린 게시글 (없으면 null)
                // 열려있는 게시글을 다시 클릭하면 닫히도록(null) 처리
                onPostClick={(post) => setSelectedPost(prev => prev?.id === post.id ? null : post)}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Matching;