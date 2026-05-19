import React, { useState } from 'react';
import '../../styles/Writing.css';

// 새 게시글 작성 폼 컴포넌트
function Writing({ onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [recruitCount, setRecruitCount] = useState('');

  const categories = ["AI", "Vision", "자율주행", "해커톤", "빅데이터"];

  // 글쓰기 폼 내 카테고리 다중 선택 핸들러
  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((item) => item !== cat)
        : [...prev, cat]
    );
  };

  // 등록 전 유효성 검사 및 데이터 저장
  const handleSubmit = () => {
    if (!title) return alert('제목을 입력해주세요.');
    if (selectedCategories.length === 0) return alert('카테고리를 선택해주세요.');
    if (!recruitCount) return alert('모집 인원을 입력해주세요.');
    if (!content) return alert('내용을 입력해주세요.');

    const newPost = {
      id: Date.now(),
      title,
      content,
      category: selectedCategories.join(', '),
      recruitCount,
      date: new Date().toLocaleDateString(),
    };

    onSave(newPost);
  };

  return (
    <div className="writing-container">
      <h2 className="writing-title">새 게시글 작성</h2>

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
        <div className="checkbox-group">
          {categories.map((cat) => (
            <label key={cat} className="checkbox-item writing-checkbox-item">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group writing-group">
        <label>모집 인원 (명)</label>
        <input
          className="form-input writing-input"
          value={recruitCount}
          onChange={(e) => setRecruitCount(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder="숫자만 입력하세요 (예: 3)"
        />
      </div>

      <div className="form-group writing-group">
        <label>내용</label>
        <textarea
          className="form-textarea writing-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
        />
      </div>

      <div className="button-area">
        <button className="btn-sub" onClick={onCancel}>취소</button>
        <button className="btn-main" onClick={handleSubmit}>등록하기</button>
      </div>
    </div>
  );
}

export default Writing;