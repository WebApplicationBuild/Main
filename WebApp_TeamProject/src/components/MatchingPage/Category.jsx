import React from 'react';
import '../../styles/Category.css';
import CategoryOptions from './CategoryOptions';

//현재 활성화된 카테고리 배열(activeCategories)과 클릭 핸들러(onCategoryClick)를 props로 받음
function Category({ activeCategories, onCategoryClick }) {
  return (
    <CategoryOptions
      selectedCategories={activeCategories}
      onToggle={onCategoryClick}
      variant="button"
    />
  );
}

export default Category;
