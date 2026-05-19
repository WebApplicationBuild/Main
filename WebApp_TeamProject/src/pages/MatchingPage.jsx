import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Category from '../components/MatchingPage/Category';
import Writing from '../components/MatchingPage/Writing';
import Board from '../components/MatchingPage/Board';
import '../styles/Matching.css';

function Matching() {
  const navigate = useNavigate();

  // UI 상태 관리
  const [isWritingMode, setIsWritingMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  
  // 데이터 상태 관리
  const [posts, setPosts] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);

  // 새 게시글 등록 핸들러
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]); // 최신 글이 위로 오도록 맨 앞에 추가
    setIsWritingMode(false);       // 리스트 화면으로 복귀
  };

  // 카테고리 필터 토글 핸들러
  const handleCategoryClick = (cat) => {
    setActiveCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((item) => item !== cat) // 이미 선택되어 있으면 해제
        : [...prev, cat]                      // 아니면 추가
    );
  };

  // 선택된 카테고리와 일치하는 키워드가 많은 순으로 게시글 정렬
  const sortedPosts = [...posts].sort((a, b) => {
    if (activeCategories.length === 0) return 0;
    
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
          {isWritingMode ? '글쓰기 페이지' : '매칭 페이지'}
        </h1>

        <div className="matching-header__spacer" />
      </header>

      <main className="matching-main">
        <div className="matching-content">
          {isWritingMode ? (
            <Writing onSave={addPost} onCancel={() => setIsWritingMode(false)} />
          ) : (
            <>
              <div className="category-wrapper">
                <Category
                  activeCategories={activeCategories}
                  onCategoryClick={handleCategoryClick}
                />
                <button className="btn-main" onClick={() => setIsWritingMode(true)}>
                  글쓰기
                </button>
              </div>
              
              <Board
                posts={sortedPosts}
                selectedPost={selectedPost}
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