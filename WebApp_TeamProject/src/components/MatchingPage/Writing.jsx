import React, { useState } from 'react';
import '../../styles/Writing.css';

// 새 게시글 작성 폼 컴포넌트
function Writing({ onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [recruitCount, setRecruitCount] = useState('');

  const categories = ["AI", "Vision", "자율주행", "해커톤", "빅데이터"];

  // 카테고리 체크박스 변경 시 선택 목록을 토글하는 핸들러
  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((item) => item !== cat) // 이미 선택된 카테고리면 배열에서 제거(체크 해제)
        : [...prev, cat] // 선택되지 않은 카테고리면 배열에 추가(체크)
    );
  };

  // 등록하기 버튼 클릭 시 유효성 검사 후 게시글 객체를 부모에 전달하는 핸들러
  const handleSubmit = () => {
    if (!title) return alert('제목을 입력해주세요.'); // 제목이 비어 있으면 알림을 띄우고 함수 종료 (이후 코드는 실행되지 않음)
    if (selectedCategories.length === 0) return alert('카테고리를 선택해주세요.');
    if (!recruitCount) return alert('모집 인원을 입력해주세요.');
    if (!content) return alert('내용을 입력해주세요.');

    // 유효성 검사를 모두 통과하면 새 게시글 객체를 생성
    const newPost = {
      id: Date.now(),
      title,
      content,
      category: selectedCategories.join(', '),
      recruitCount,
      date: new Date().toLocaleDateString(),
    };

    // 생성된 게시글 객체를 부모(Matching) 컴포넌트의 onSave 콜백으로 전달
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
          {/* categories 배열을 순회하여 각 카테고리에 대한 체크박스 항목을 렌더링 */}
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
          //"숫자(0~9)가 아닌 모든 문자" 빈 문자열로 교체하여 숫자만 허용
          // [^0-9] : 숫자가 아닌 문자 / ^ = NOT, 0-9 = 숫자, g = 전체 반복 / '' = 삭제
          onChange={(e) => setRecruitCount(e.target.value.replace(/[^0-9]/g, ''))} //
          
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