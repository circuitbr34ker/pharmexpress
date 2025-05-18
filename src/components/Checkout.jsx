import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: ''
  });
  
  const [expandOrderSummary, setExpandOrderSummary] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // В реальном приложении здесь бы было перенаправление на эквайринг
    
    alert('Ваш заказ успешно обработан!');
    clearCart();
    navigate('/');
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="checkout-container empty-checkout">
        <h2>Корзина сейчас пуста</h2>
        <p>Добавьте товары в корзину для продолжения</p>
        <button 
          className="continue-shopping-btn"
          onClick={() => navigate('/')}
        >
          Вернуться к списку товаров
        </button>
      </div>
    );
  }
  
  return (
    <div className="checkout-container">
      <h1>Оформление заказа</h1>
      
      <div className="mobile-order-summary-toggle" onClick={() => setExpandOrderSummary(!expandOrderSummary)}>
        <div>
          <h3>Содержимое заказа ({cartItems.length} товаров)</h3>
          <span className="mobile-total">{cartTotal.toFixed(2).replace('.', ',')} у.е.</span>
        </div>
        <i className={`fas fa-chevron-${expandOrderSummary ? 'up' : 'down'}`}></i>
      </div>
      
      <div className={`mobile-order-summary-box ${expandOrderSummary ? 'expanded' : ''}`}>
      <div className={`mobile-order-summary ${expandOrderSummary ? 'expanded' : ''}`}>
        <div className="order-items">
          {cartItems.map(item => (
            <div key={item.id} className="order-item">
              <div className="order-item-image">
                <img src={item.image} alt={item.name} />
                <span className="order-item-quantity">{item.quantity} шт.</span>
              </div>
              <div className="order-item-details">
                <div className="order-item-name">{item.name}</div>
                <span className="order-item-price">{(item.price * item.quantity).toFixed(2).replace('.', ',')} у.е.</span>
              </div>
            </div>
          ))}
        </div>
        </div>
        
      </div>
      
      <div className="checkout-grid">
        <div className="checkout-form-container">
          <h2>Информация о доставке</h2>
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Имя</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="lastName">Фамилия</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Адрес</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">Город</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="postalCode">Индекс</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="payment-section">
              <h2>Способ оплаты</h2>
              <p>Это ненастоящая аптека, поэтому тут пока пусто :(</p>
            </div>
            
            <div className="checkout-actions">
              <button 
                type="button" 
                className="back-btn"
                onClick={() => navigate('/')}
              >
                Вернуться к выбору лекарств
              </button>
              <button type="submit" className="place-order-btn">
                Оформить
              </button>
            </div>
          </form>
        </div>
        
        <div className="order-summary desktop-order-summary">
          <h2>Товары</h2>
          <div className="order-items">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <div className="order-item-details">
                  <div className="order-item-name">
                    <span>{item.name}</span>
                  </div>
                  <div className="order-item-price">
                    <span className="order-item-amount">
                      {item.quantity} шт.
                    </span>
                    <span className="order-item-total-price">
                      {(item.price * item.quantity).toFixed(2).replace('.', ',')} у.е.
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-total">
            <span>Итог</span>
            <span>{cartTotal.toFixed(2).replace('.', ',')} у.е.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
