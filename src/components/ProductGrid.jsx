import React from 'react';
import ProductCard from './ProductCard';
import { useProducts } from '../context/ProductContext';

const ProductGrid = () => {
  const { filteredProducts, loading } = useProducts();
  
  if (loading) {
    return <div className="loading">Загружаем</div>;
  }
  
  if (filteredProducts.length === 0) {
    return <div className="no-products">Нет товаров по вашему запросу :(</div>;
  }
  
  return (
    <div className="product-grid">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
