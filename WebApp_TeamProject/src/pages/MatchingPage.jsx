import React from 'react';
import { useNavigate } from 'react-router-dom';
import Category from '../components/MatchingPage/Category';
import Writing from '../components/MatchingPage/Writing';
import Board from '../components/MatchingPage/Board';
import useMatchingPageData from '../hooks/useMatchingPageData';
import NavDropdown from "../components/NavDropdown";
import '../styles/matching/Matching.css';

// 유저 확인용
import { useContext } from "react";
import { AuthContext } from "../store/AuthContext";

function Matching() {
  const navigate = useNavigate();

  // 유저 확인용
  const { user, userInfo } = useContext(AuthContext);

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
    joinProject,
    deletePost,
  } = useMatchingPageData();

  return (
    <div className="matching-container">
      <header className="matching-header">
        <button
          type="button"
          className="matching-header__logo"
          onClick={() => navigate('/')}
          aria-label="TEAMO 홈으로"
        >
          <img src="/teamo-logo.png" alt="TEAMO" className="header-logo-img" />
        </button>
        <h1 className="matching-header__title">
          매칭 페이지
        </h1>
        <div className="matching-header__spacer"><NavDropdown /></div>
      </header>

      <main className="matching-main">
        <div className="matching-content">
          <div className="search-section">
            <input
              type="text"
              className="matching-search"
              placeholder="제목이나 내용을 검색해보세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
            onJoinProject={joinProject}
            onDeletePost={deletePost}
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
