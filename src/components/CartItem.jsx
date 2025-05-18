import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img 
          src={item.image} 
          alt={item.name} 
        />
      </div>
      
      <div className="cart-item-details">
        <h4>{item.name}</h4>
        <span className="cart-item-price">{item.price.toFixed(2).replace('.', ',')} у.е.</span>
      </div>
      
      <div className="cart-item-actions">
        <div className="quantity-control">
          <button 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="qty-btn"
          >
            -
          </button>
          <span className="item-quantity">{item.quantity}</span>
          <button 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="qty-btn"
          >
            +
          </button>
        </div>
        
        {/* <button 
          className="remove-item-btn"
          onClick={() => removeFromCart(item.id)}
        >
          Убрать
        </button> */}
      </div>
      
      <div className="cart-item-total">
        {(item.price * item.quantity).toFixed(2).replace('.', ',')} у.е.
      </div>
    </div>
  );
};

export default CartItem;
