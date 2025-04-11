import axios from 'axios';

const API_BASE = 'http://localhost:5270/api';

export const fetchProducts = () => axios.get(`${API_BASE}/shop/products`);
export const checkout = (cartItems) => {
    const formattedItems = cartItems.map(item => ({
      Id: item.id,
      Quantity: item.quantity
    }));
  
    return axios.post(`${API_BASE}/shop/products`, formattedItems);
  };
  