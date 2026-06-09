import React from 'react';
import Category from '../components/MatchingPage/Category';
import Writing from '../components/MatchingPage/Writing';
import Board from '../components/MatchingPage/Board';
import useMatchingPageData from '../hooks/useMatchingPageData';
import '../styles/matching/Matching.css';

function Matching() {
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
      <main className="matching-main">
        <div className="matching-content">
          {/* 검색어는 훅의 전역 매칭 상태에 저장되어 목록 필터링에 바로 반영된다. */}
          <div className="search-section">
            <input
              type="text"
              className="matching-search"
              placeholder="제목이나 내용을 검색해보세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 카테고리 선택과 글쓰기 진입 버튼을 게시판 상단 컨트롤로 묶는다. */}
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

      {/* 글쓰기 모드는 페이지 이동 없이 모달로 열어 작성 흐름을 유지한다. */}
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
