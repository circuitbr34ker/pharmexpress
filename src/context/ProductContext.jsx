import { createContext, useState, useEffect, useContext } from 'react';
import { getAllProducts, searchProducts, initializeDatabase } from '../services/indexedDB';
import initialProducts from '../data/initialProducts';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    const initDB = async () => {
      try {
        await initializeDatabase(initialProducts);
        const allProducts = await getAllProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error('Не получилось проинициализировать локальную бд: ', error);
      } finally {
        setLoading(false);
      }
    };
    
    initDB();
  }, []);
  
  useEffect(() => {
    const filterProducts = async () => {
      if (!searchQuery && !selectedCategory) {
        setFilteredProducts(products);
        return;
      }
      
      let filtered = products;
      
      if (searchQuery) {
        const searchResults = await searchProducts(searchQuery);
        filtered = searchResults;
      }
      
      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      
      setFilteredProducts(filtered);
    };
    
    filterProducts();
  }, [searchQuery, selectedCategory, products]);
  
  const categories = Array.from(new Set(products.map(product => product.category)));
  
  return (
    <ProductContext.Provider 
      value={{ 
        products, 
        filteredProducts, 
        loading, 
        searchQuery, 
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        categories
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
