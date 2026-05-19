import React from 'react';
import '../../styles/Board.css';

// 게시글 목록과 상세보기를 렌더링하는 컴포넌트
function Board({ posts, selectedPost, onPostClick }) {
  
  // 매칭 신청 버튼 핸들러
  const handleMatchClick = (e, post) => {
    // 이벤트 버블링 방지: 제목 클릭 이벤트(상세보기 토글)가 트리거되는 것을 막음
    e.stopPropagation(); 
    alert(`[${post.title}] 게시글에 매칭이 신청되었습니다!`);
  };

  return (
    <table className="board-table">
      <thead>
        <tr>
          <th style={{ width: '10%' }}>번호</th>
          <th style={{ width: '35%' }}>제목</th>
          <th style={{ width: '15%' }}>모집 인원</th>
          <th style={{ width: '15%' }}>카테고리</th>
          <th style={{ width: '15%' }}>작성일</th>
          <th style={{ width: '10%' }}>매칭</th>
        </tr>
      </thead>
      <tbody>
        {posts.length === 0 ? (
          <tr>
            <td colSpan="6" style={{ padding: '50px 0', color: '#999', textAlign: 'center' }}>
              등록된 게시글이 없습니다. 첫 번째 글을 남겨보세요!
            </td>
          </tr>
        ) : (
          posts.map((post, index) => (
            <React.Fragment key={post.id}>
              {/* 리스트 행 */}
              <tr>
                <td>{posts.length - index}</td>
                <td className="title-cell" onClick={() => onPostClick(post)}>
                  {post.title}
                </td>
                <td>{post.recruitCount}명</td>
                <td>{post.category}</td>
                <td>{post.date}</td>
                <td>
                  <button className="btn-matching" onClick={(e) => handleMatchClick(e, post)}>
                    매칭
                  </button>
                </td>
              </tr>
              
              {/* 상세보기 토글 (아코디언 UI) */}
              {selectedPost?.id === post.id && (
                <tr className="detail-row">
                  <td colSpan="6">
                    <div className="detail-container">
                      <div className="detail-body">
                        {post.content}
                      </div>
                      <div className="detail-footer">
                        <button className="btn-sub btn-sm" onClick={() => onPostClick(post)}>
                          닫기
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))
        )}
      </tbody>
    </table>
  );
}

export default Board;