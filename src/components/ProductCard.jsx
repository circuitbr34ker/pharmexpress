import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <div className="product-card">
      <div className="product-image">
        <img 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
        />
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">{product.price.toFixed(2).replace('.', ',')} у.е.</span>
          <button 
            className="add-to-cart-btn"
            onClick={() => addToCart(product)}
            aria-label={`Добавить ${product.name} в корзину`}
          >
            <i className="fas fa-cart-plus"></i> Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
