import { MATCHING_CATEGORIES } from './matchingCategories';

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
