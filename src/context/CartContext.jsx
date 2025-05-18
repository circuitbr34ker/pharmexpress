import { createContext, useState, useEffect, useContext } from 'react';
import { 
  getCartItems, 
  addToCart, 
  updateCartItemQuantity, 
  removeFromCart, 
  clearCart 
} from '../services/indexedDB';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  
  useEffect(() => {
    const fetchCartItems = async () => {
      const items = await getCartItems();
      setCartItems(items);
    };
    
    fetchCartItems();
  }, []);
  
  const handleAddToCart = async (product, quantity = 1) => {
    const updatedCart = await addToCart(product, quantity);
    setCartItems(updatedCart);
  };
  
  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(itemId);
    } else {
      const updatedCart = await updateCartItemQuantity(itemId, quantity);
      setCartItems(updatedCart);
    }
  };
  
  const handleRemoveFromCart = async (itemId) => {
    const updatedCart = await removeFromCart(itemId);
    setCartItems(updatedCart);
  };
  
  const handleClearCart = async () => {
    await clearCart();
    setCartItems([]);
  };
  
  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };
  
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity, 
    0
  );
  
  return (
    <CartContext.Provider 
      value={{ 
        cartItems,
        cartOpen,
        cartTotal,
        cartItemCount,
        toggleCart,
        addToCart: handleAddToCart,
        updateQuantity: handleUpdateQuantity,
        removeFromCart: handleRemoveFromCart,
        clearCart: handleClearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
