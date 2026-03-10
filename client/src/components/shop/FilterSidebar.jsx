import React from 'react';

const FilterSidebar = ({ activeCategory, onSelectCategory }) => {
  const categories = [
    'All',
    'Bags',
    'Belts',
    'Boxes',
    'Sunglasses',
    'Wallets',
    'Watches',
    'Plated'
  ];

  return (
    <div className="w-full md:w-64 space-y-2">
      <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6 text-slate-400">
        Categories
      </h3>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`w-full text-left py-3 px-4 transition-colors ${
            activeCategory === category
              ? 'bg-[#001F3F] text-white'
              : 'hover:bg-slate-50 text-[#001F3F]'
          }`}
        >
          <span className="text-sm uppercase tracking-wider">{category}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterSidebar;
