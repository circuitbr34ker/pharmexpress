import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItemCount, toggleCart } = useCart();
  
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">💊 ФармЭкспресс</Link>
      </div>
      
      <div className="cart-icon" onClick={toggleCart}>
        <i className="fas fa-shopping-cart"></i>
        {cartItemCount > 0 && (
          <span className="cart-count">{cartItemCount}</span>
        )}
      </div>
    </header>
  );
};

export default Header;
