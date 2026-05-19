import React from 'react';
import '../../styles/Category.css';

//현재 활성화된 카테고리 배열(activeCategories)과 클릭 핸들러(onCategoryClick)를 props로 받음
function Category({ activeCategories, onCategoryClick }) {
  const categories = ['AI', 'Vision', '자율주행', '해커톤', '빅데이터'];

  return (
    <div className="category-list">
      {/* categories 배열을 순회하며 각 카테고리에 대한 버튼을 렌더링 */}
      {categories.map((cat) => (
        <button 
          key={cat} 
         // activeCategories 배열에 현재 cat이 포함되어 있으면 'active' 클래스를 추가, 아니면 빈 문자열
          className={`category-item ${activeCategories.includes(cat) ? 'active' : ''}`}
           // 버튼 클릭 시 부모로부터 받은 onCategoryClick 핸들러를 현재 카테고리 이름과 함께 호출
          onClick={() => onCategoryClick(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Category;