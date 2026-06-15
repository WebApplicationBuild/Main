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
