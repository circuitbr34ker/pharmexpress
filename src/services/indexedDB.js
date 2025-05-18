import Dexie from 'dexie';

const db = new Dexie('PharmacyDB');

db.version(1).stores({
  products: 'id, name, category, price',
  cart: 'id, productId, quantity, price'
});


export const initializeDatabase = async (initialProducts) => {
  const productCount = await db.products.count();
  
  if (productCount === 0) {
    console.log('База пустая, заполняем продуктами по-умолчанию');
    await db.products.bulkAdd(initialProducts);
  }
};

export const getAllProducts = () => db.products.toArray();
export const getProductById = (id) => db.products.get(id);
export const searchProducts = (query) => {
  query = query.toLowerCase();
  return db.products
    .filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query)
    )
    .toArray();
};


export const getCartItems = () => db.cart.toArray();

export const addToCart = async (product, quantity = 1) => {
  const existingItem = await db.cart.get({ productId: product.id });
  
  if (existingItem) {
    await db.cart.update(existingItem.id, { 
      quantity: existingItem.quantity + quantity 
    });
  } else {
    await db.cart.add({
      id: Date.now(),
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity
    });
  }
  
  return getCartItems();
};

export const updateCartItemQuantity = async (cartItemId, quantity) => {
  await db.cart.update(cartItemId, { quantity });
  return getCartItems();
};

export const removeFromCart = async (cartItemId) => {
  await db.cart.delete(cartItemId);
  return getCartItems();
};

export const clearCart = async () => {
  await db.cart.clear();
};

export default db;
