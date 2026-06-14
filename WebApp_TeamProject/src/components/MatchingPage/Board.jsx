import React, { useEffect, useState } from 'react';
import '../../styles/matching/Board.css';
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import { useProjectManageData } from '../../store/ProjectManageDataProvider';
import { useToast, useConfirm } from '../../contexts/ToastContext';
import { getDDayInfo } from '../../utils/dday';
import { getUserDisplayName } from '../../utils/userDisplayName';

// 게시글 목록과 상세보기를 렌더링하는 컴포넌트
function Board({ posts, selectedPost, onPostClick, searchTerm, activeCategories, onJoinProject, onDeletePost}) {
  const showToast = useToast();
  const showConfirm = useConfirm();
  const { addMyProject, updateProjectManageData } = useProjectManageData();
  const { user, userInfo } = useContext(AuthContext);
  const [favoritePosts, setFavoritePosts] = useState([]);

  // localStorage용 사용자별 즐겨찾기
  const favoriteStorageKey = user
    ? `favoritePosts_${user.uid}`
    : "favoritePosts_guest";

  // localStorage에서 즐겨찾기 불러오기
  useEffect(() => {
    if (!user) {
      setFavoritePosts([]);
      return;
    }

    const savedFavorites =
      JSON.parse(localStorage.getItem(favoriteStorageKey)) || [];

    setFavoritePosts(savedFavorites);
  }, [user, favoriteStorageKey]);

  // '매칭' 버튼 클릭 시 실행될 핸들러 함수
  const handleMatchClick = (e, post) => {
    e.stopPropagation();

    if (!user) {
      showToast("로그인 후 이용해주세요.", "info");
      return;
    }

    const currentMemberIds = post.memberIds || [];

    if (currentMemberIds.includes(user.uid)) {
      showToast("이미 참여한 프로젝트입니다.", "warning");
      return;
    }

    const updatedMemberIds = [...currentMemberIds, user.uid];
    const userDisplayName = getUserDisplayName(user, userInfo);

    // 매칭 게시글의 참여 인원 상태를 먼저 갱신한다.
    onJoinProject(post.id, user.uid);

    const newProject = {
      id: post.id,
      title: post.title,
      status: '진행 중',
      members: updatedMemberIds.length,
      ownerId: post.ownerId,
      ownerName: post.ownerName,
      memberIds: updatedMemberIds,
    };

    addMyProject(newProject);

    // 프로젝트 관리 화면에서 바로 팀원 명단을 볼 수 있도록 상세 데이터도 함께 만든다.
    updateProjectManageData(post.id, (currentData) => ({
      ...currentData,
      members: [
        ...(currentData.members || []),
        {
          id: user.uid,
          name: userDisplayName,
          role: "팀원",
        },
      ],
    }));

    showToast(`[${post.title}] 프로젝트가 생성되었습니다!`, "success");
  };
  // 팀장만 사용하는 게시글 삭제 함수
  const handleDeleteClick = async (e, post) => {
    e.stopPropagation();

    if (!user) {
      showToast("로그인 후 이용해주세요.", "info");
      return;
    }

    if (post.ownerId !== user.uid) {
      showToast("팀장만 삭제할 수 있습니다.", "warning");
      return;
    }

    const confirmed = await showConfirm(`[${post.title}] 글을 삭제하시겠습니까?`);
    if (!confirmed) return;

    onDeletePost(post.id);
    showToast("게시글이 삭제되었습니다.", "success");
  };

  // 즐겨찾기 토글 함수 추가
  const handleFavoriteClick = (e, postId) => {
    e.stopPropagation();

    let updatedFavorites;

    if (favoritePosts.includes(postId)) {
      updatedFavorites = favoritePosts.filter((id) => id !== postId);
    } else {
      updatedFavorites = [...favoritePosts, postId];
    }

    setFavoritePosts(updatedFavorites);

    localStorage.setItem(
      favoriteStorageKey,
      JSON.stringify(updatedFavorites)
    );
  };

  // 모집 현황을 판별하여 텍스트와 색상 클래스를 반환하는 함수
  const getRecruitStatus = (post, isClosedByDate) => {
    const applied = post.appliedMembers || 0;
    const required = post.requiredMembers || 0;
    
    // 기한이 지났으면 가장 우선적으로 '기한마감' 처리
    if (isClosedByDate) return { text: '기한마감', className: 'status-closed' };
    // 목표 인원이 다 찼으면 '인원마감' 처리
    if (required > 0 && applied >= required) return { text: '인원마감', className: 'status-full' };
    // 나머지는 정상적으로 '모집중'
    return { text: '모집중', className: 'status-open' };
  };

  // 검색어 및 활성 카테고리와 일치하는 텍스트를 강조하는 함수
  const highlightText = (text) => {
    if (!text) return text;
    
    // 검색어와 선택된 카테고리들을 하나의 키워드 배열로 병합 (빈 값 제거)
    const keywords = [searchTerm, ...(activeCategories || [])].filter(k => k && String(k).trim() !== '');
    
    if (keywords.length === 0) return text;

    // 정규표현식에서 오류가 나지 않도록 특수문자를 이스케이프 처리
    const escapedKeywords = keywords.map(k => String(k).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    // 여러 키워드 중 하나라도 일치하면 매칭 (대소문자 구분 없음: gi)
    const regex = new RegExp(`(${escapedKeywords.join('|')})`, 'gi');
    
    // 텍스트를 매칭된 부분과 매칭되지 않은 부분으로 분리
    const parts = String(text).split(regex);
    
    return parts.map((part, index) => {
      // 현재 조각이 키워드 목록 중 하나와 일치하면 강조 span 반환
      if (keywords.some(k => String(k).toLowerCase() === part.toLowerCase())) {
        return <span key={index} className="highlight">{part}</span>;
      }
      return part;
    });
  };

  return (
    <table className="board-table">
      <thead>
        <tr>
          <th style={{ width: '5%' }}>⭐</th>
          <th style={{ width: '6%' }}>번호</th>
          <th style={{ width: '48%' }}>제목</th>
          <th style={{ width: '12%' }}>모집 현황</th>
          <th style={{ width: '16%' }}>카테고리</th>
          <th style={{ width: '10%' }}>마감 기한</th>
          <th style={{ width: '8%' }}>매칭</th>
        </tr>
      </thead>
      <tbody>
        {/* posts 배열이 비어 있으면 안내 문구를 표시하고, 아니면 게시글 목록을 렌더링 */}
        {posts.length === 0 ? (
          <tr>
            <td colSpan="7" style={{ padding: '50px 0', color: '#999', textAlign: 'center' }}>
              등록된 게시글이 없습니다. 첫 번째 글을 남겨보세요!
            </td>
          </tr>
        ) : (
          posts.map((post, index) => {
            const { text: ddayText, color: ddayColor, isClosed } = getDDayInfo(post.deadline);
            const statusInfo = getRecruitStatus(post, isClosed);
            const isFullyClosed = isClosed || statusInfo.text === '인원마감';
            
            return (
              <React.Fragment key={post.id}>
                {/* 리스트 행 */}
                <tr id={`post-${post.id}`}>
                  <td>
                    <button
                      onClick={(e) => handleFavoriteClick(e, post.id)}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      {favoritePosts.includes(post.id) ? "⭐" : "☆"}
                    </button>
                  </td>

                  <td>{index + 1}</td>

                  <td className="title-cell" onClick={() => onPostClick(post)}>
                    <span className={`status-tag ${statusInfo.className}`}>
                      {statusInfo.text}
                    </span>
                    {/* 제목에 하이라이트 적용 */}
                    <span className={isFullyClosed ? 'text-closed' : ''}>
                      {highlightText(post.title)}
                    </span>
                  </td>
                  <td>{post.appliedMembers || 0} / {post.requiredMembers || 0}명</td>
                  <td>
                    {/* 카테고리에 하이라이트 적용 */}
                    {highlightText(Array.isArray(post.category) ? post.category.join(', ') : post.category)}
                  </td>
                  <td style={{ color: ddayColor, fontWeight: 'bold' }}>
                    {ddayText}
                  </td>
                  <td>
                    <button
                      className="btn-matching"
                      onClick={(e) => handleMatchClick(e, post)}
                      disabled={isFullyClosed}
                      style={{
                        opacity: isFullyClosed ? 0.5 : 1,
                        cursor: isFullyClosed ? 'not-allowed' : 'pointer',
                        whiteSpace: "nowrap",
                      }}
                    >
                      {isFullyClosed ? '마감' : '매칭'}
                    </button>
                  </td>
                </tr>
                
                {/* 상세보기 토글 (아코디언 UI) */}
                {selectedPost?.id === post.id && (
                  <tr className="detail-row">
                    <td colSpan="7">
                      <div className="detail-container">
                        {/* 세부 요약 정보 영역 추가 */}
                        <div className="detail-header-info">
                          <span className="detail-info-item">
                            <strong>상태:</strong> 
                            <span className={`status-tag ${statusInfo.className}`} style={{ marginLeft: '4px' }}>
                              {statusInfo.text}
                            </span>
                          </span>
                          <span className="detail-info-item">
                            <strong>카테고리:</strong> 
                            {highlightText(Array.isArray(post.category) ? post.category.join(', ') : post.category)}
                          </span>
                          <span className="detail-info-item">
                            <strong>모집 현황:</strong> {post.appliedMembers || 0}명 지원 / {post.requiredMembers || 0}명 모집
                          </span>
                          <span className="detail-info-item">
                            <strong>작성자:</strong> {post.author}
                          </span>
                          <span className="detail-info-item">
                            <strong>마감 기한:</strong> {post.deadline} <span style={{ color: ddayColor, fontWeight: 'bold' }}>({ddayText})</span>
                          </span>
                        </div>
                        
                        <div className="detail-body">
                          {/* 상세 내용에 하이라이트 적용 */}
                          {highlightText(post.content)}
                        </div>
                        <div className="detail-footer">
                          {post.ownerId === user?.uid && (
                            <button
                              className="btn-sub btn-sm"
                              onClick={(e) => handleDeleteClick(e, post)}
                            >
                              삭제
                            </button>
                          )}

                          <button className="btn-sub btn-sm" onClick={() => onPostClick(post)}>
                            닫기
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default Board;
