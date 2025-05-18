import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Cart from './components/Cart';
import HomePage from './pages/HomePage';
import CheckoutPage from './pages/CheckoutPage';
import './styles.css';

function App() {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <div className="app">
            <Header />
            <Cart />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </main>
            <footer className="footer">
              <p>&copy; {new Date().getFullYear()} ФармЭкспресс.</p>
            </footer>
          </div>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;
