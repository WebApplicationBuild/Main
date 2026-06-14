import React, { useState } from 'react';
import { useContext } from "react";
import { AuthContext } from "../../store/AuthContext";
import '../../styles/matching/Writing.css';
import CategoryOptions from './CategoryOptions';
import { useProjectManageData } from "../../store/ProjectManageDataProvider";
import { useToast } from "../../contexts/ToastContext";
import { getUserDisplayName } from "../../utils/userDisplayName";


// 새 게시글 작성 폼 컴포넌트
function Writing({ onSave, onCancel }) {
  const showToast = useToast();
  const { user, userInfo } = useContext(AuthContext);
  const { addMyProject, updateProjectManageData } = useProjectManageData();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [requiredMembers, setRequiredMembers] = useState('');
  const [deadline, setDeadline] = useState('');
  
  // 카테고리 체크박스 선택 토글
  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((item) => item !== cat)
        : [...prev, cat]
    );
  };

  // 유효성 검사 후 게시글 객체를 부모로 전달
  const handleSubmit = () => {
    if (!user)                         { showToast('로그인 후 이용해주세요.', 'info');         return; }
    if (!title)                        { showToast('제목을 입력해주세요.', 'warning');       return; }
    if (selectedCategories.length === 0) { showToast('카테고리를 선택해주세요.', 'warning');  return; }
    if (!requiredMembers)              { showToast('모집 인원을 입력해주세요.', 'warning');   return; }
    if (!deadline)                     { showToast('모집 마감일을 선택해주세요.', 'warning'); return; }
    if (!content)                      { showToast('내용을 입력해주세요.', 'warning');        return; }

    const newPostId = Date.now();
    const userDisplayName = getUserDisplayName(user, userInfo);

    // 매칭 목록과 메인 최신 프로젝트에서 함께 사용할 게시글 데이터
    const newPost = {
      id: newPostId,
      title,
      content,
      category: selectedCategories.join(', '),
      requiredMembers,
      deadline,
      createdAt: new Date().toISOString().split('T')[0], // yyyy-mm-dd

      authorId: user.uid,
      author: userDisplayName,

      ownerId: user.uid,
      ownerName: userDisplayName,
      memberIds: [user.uid],
      appliedMembers: 1,
    };

    onSave(newPost);

    // 글 작성자는 곧 팀장이므로 '진행중 프로젝트'에도 함께 추가한다 (Board의 참여 처리와 동일한 형태)
    addMyProject({
      id: newPostId,
      title,
      status: '진행 중',
      members: 1,
      ownerId: user.uid,
      ownerName: userInfo.nickname,
      memberIds: [user.uid],
    });

    updateProjectManageData(newPostId, () => ({
      members: [
        {
          id: user.uid,
          name: userDisplayName,
          role: "★팀장★",
        },
      ],
      schedules: [],
      voteList: [],
    }));

    onCancel();
  };

  return (
    <div className="writing-container">
      <h2 className="writing-title">새 게시글 작성</h2>

      <div className="writing-body">
        <div className="writing-col writing-col--left">

      <div className="form-group writing-group">
        <label>제목</label>
        <input
          className="form-input writing-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
        />
      </div>

      <div className="form-group writing-group">
        <label>카테고리</label>
        <CategoryOptions
          selectedCategories={selectedCategories}
          onToggle={handleCategoryChange}
          variant="checkbox"
        />
      </div>

      <div className="form-group writing-group" style={{ display: 'flex', gap: '20px' }}>
        <div style={{ flex: 1 }}>
          <label>모집 인원 (명)</label>
          <input
            className="form-input writing-input"
            value={requiredMembers}
            // 숫자만 허용 (숫자 외 문자 제거)
            onChange={(e) => setRequiredMembers(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="숫자만 입력하세요 (예: 3)"
          />
        </div>
        <div style={{ flex: 1 }}>
          <label>모집 마감일</label>
          <input
            type="date"
            className="form-input writing-input"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
      </div>

        </div>

        <div className="writing-col writing-col--right">
          <div className="form-group writing-group writing-group--content">
            <label>내용</label>
            <textarea
              className="form-textarea writing-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
            />
          </div>
        </div>
      </div>

      <div className="button-area">
        <button className="btn-sub" onClick={onCancel}>취소</button>
        <button className="btn-main" onClick={handleSubmit}>등록하기</button>
      </div>
    </div>
  );
}

export default Writing;
