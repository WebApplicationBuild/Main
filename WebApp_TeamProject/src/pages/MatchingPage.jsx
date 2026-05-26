import React from 'react';
import { useNavigate } from 'react-router-dom';
import Category from '../components/MatchingPage/Category';
import Writing from '../components/MatchingPage/Writing';
import Board from '../components/MatchingPage/Board';
import useMatchingPageData from '../hooks/useMatchingPageData';
import NavDropdown from "../components/NavDropdown";
import '../styles/Matching.css';

function Matching() {
  const navigate = useNavigate();
  // 데이터/상태/핸들러는 훅에서 받고, 페이지는 화면 조합만 담당
  const {
    isWritingMode,
    setIsWritingMode,
    selectedPost,
    activeCategories,
    searchTerm,
    setSearchTerm,
    addPost,
    handleCategoryClick,
    filteredAndSortedPosts,
    togglePostSelection,
  } = useMatchingPageData();

  return (
    <div className="matching-container">
      <header className="matching-header">
        <div className="matching-header__logo" onClick={() => navigate('/')}>
          로고
        </div>
        <h1 className="matching-header__title">
          매칭 페이지
        </h1>
        <div className="matching-header__spacer"><NavDropdown /></div>
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
            onPostClick={togglePostSelection}
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
