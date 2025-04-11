import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts().then(res => setProducts(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map(product => (
        <div key={product.id} className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-2">ราคา: <span className="font-bold text-gray-800">{product.price} บาท</span></p>
          <p className="text-gray-600 mb-4">ในสต็อก: {product.stock}</p>
          <button
            className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 ${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            onClick={() => product.stock > 0 && addToCart(product)}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'สินค้าหมด' : 'เพิ่มลงตะกร้า'}
          </button>
        </div>
      ))}
    </div>
  );
}
