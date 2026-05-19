import React from 'react';
import '../../styles/Category.css';

// ✨ 수정: 부모로부터 activeCategories 배열을 받아옵니다.
function Category({ activeCategories, onCategoryClick }) {
  const categories = ['AI', 'Vision', '자율주행', '해커톤', '빅데이터'];

  return (
    <div className="category-list">
      {categories.map((cat) => (
        <button 
          key={cat} 
          // ✨ 수정: activeCategories 배열에 현재 카테고리가 포함되어 있으면 'active' 클래스 부여
          className={`category-item ${activeCategories.includes(cat) ? 'active' : ''}`}
          onClick={() => onCategoryClick(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default Category;