import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, cartTotal, cartOpen, toggleCart, clearCart } = useCart();
  const navigate = useNavigate();
  
  if (!cartOpen) return null;
  
  return (
    <div className="cart-overlay">
      <div className="cart-sidebar">
        <div className="cart-header">
          <h2>Корзина</h2>
          <button className="close-cart-btn" onClick={toggleCart}><i className="fas fa-times"></i></button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <i className="fas fa-shopping-cart empty-cart-icon"></i>
            <p> </p>
            <button 
              className="continue-shopping-btn"
              onClick={() => {
                toggleCart();
                navigate('/');
              }}
            >
              Вернуться к покупкам
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="cart-total">
                <span>Итог:</span>
                <span>{cartTotal.toFixed(2).replace('.', ',')} у.е.</span>
              </div>
              
              <div className="cart-actions">
                <button 
                  className="checkout-btn"
                  onClick={() => {
                    toggleCart();
                    navigate('/checkout');
                  }}
                >
                  Продолжить оформление
                </button>
                
                <button 
                  className="clear-cart-btn"
                  onClick={clearCart}
                >
                  Очистить корзину
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
