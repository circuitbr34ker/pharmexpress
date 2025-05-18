import React from 'react';
import SearchFilter from '../components/SearchFilter';
import ProductGrid from '../components/ProductGrid';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="hello-section">
        <h1>Добро пожаловать в ФармЭкспресс</h1>
        <p>Это ненастоящая аптека, все совпадения случайны</p>
      </div>
      
      <SearchFilter />
      <ProductGrid />
    </div>
  );
};

export default HomePage;
