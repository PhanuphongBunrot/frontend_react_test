import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// 👇 เพิ่ม import CartProvider
import { CartProvider } from './context/CartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CartProvider> {/* ✅ ครอบ App ด้วย Provider */}
      <App />
    </CartProvider>
  </React.StrictMode>
);

reportWebVitals();
