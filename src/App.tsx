import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';


export default function App() {
  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <h1 className="text-2xl font-bold mb-4">รายการสินค้า</h1>
        <ProductList />
      </div>
      <div>
        <Cart />
      </div>
    </div>
  );
}