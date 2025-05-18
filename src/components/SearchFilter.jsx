import React from 'react';
import { useProducts } from '../context/ProductContext';

const SearchFilter = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    categories
  } = useProducts();
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
  };
  
  return (
    <div className="search-filter-container">
      <h2 className="filter-title">Поиск лекарств</h2>
      <div className="search-filter">
        <div className="search-box">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            placeholder="Запрос"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search-btn" 
              onClick={() => setSearchQuery('')}
              aria-label="Очистить поиск"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
          aria-label="Поиск по категориям"
        >
          <option value="">Все категории</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        
        {(searchQuery || selectedCategory) && (
          <button 
            className="clear-filter-btn"
            onClick={clearFilters}
          >
            Очистить фильртры
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
