import React from 'react';

export const MATCHING_CATEGORIES = [
  '기계', '화공', '전자', '건축', '산공',
  '대외활동', '공모전', '창업', '캡스톤', '스터디',
  'AI', 'Vision', '자율주행', '빅데이터', 'IoT',
  '프론트엔드', '백엔드', '기획', '디자인', '설계',
];

function CategoryOptions({
  selectedCategories = [],
  onToggle,
  variant = 'button',
  containerClassName,
}) {
  const containerClass =
    containerClassName || (variant === 'checkbox' ? 'checkbox-group' : 'category-list');

  return (
    <div className={containerClass}>
      {MATCHING_CATEGORIES.map((cat) => {
        const isActive = selectedCategories.includes(cat);

        if (variant === 'checkbox') {
          return (
            <label key={cat} className="checkbox-item writing-checkbox-item">
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => onToggle(cat)}
              />
              {cat}
            </label>
          );
        }

        return (
          <button
            key={cat}
            className={`category-item ${isActive ? 'active' : ''}`}
            onClick={() => onToggle(cat)}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryOptions;
