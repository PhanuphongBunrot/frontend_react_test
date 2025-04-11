import React from 'react';
import { useCart } from '../context/CartContext';
import { checkout } from '../services/api';
import Swal from 'sweetalert2';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      await checkout(cart);
      await Swal.fire({
        icon: 'success',
        title: 'ชำระเงินสำเร็จ!',
        confirmButtonText: 'ตกลง'
      });
      clearCart();
      window.location.reload();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถชำระเงินได้',
      });
    }
  };

  const handleIncrease = (id) => {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity < item.stock) {
      updateQuantity(id, item.quantity + 1);
    } else {
      alert('จำนวนสินค้าถึงขีดจำกัดแล้ว');
    }
  };

  const handleDecrease = (id) => {
    const item = cart.find(item => item.id === id);
    if (item && item.quantity > 1) {
      updateQuantity(id, item.quantity - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5 text-gray-800">ตะกร้าสินค้า</h2>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">ไม่มีสินค้าในตะกร้า</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-4 p-4 border-b border-gray-200">
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <div className="flex items-center mt-2">
                  <button
                    className="px-3 py-1 bg-gray-300 text-sm rounded-full hover:bg-gray-400"
                    onClick={() => handleDecrease(item.id)}
                  >
                    -
                  </button>
                  <span className="mx-3 text-gray-700">{item.quantity}</span>
                  <button
                    className="px-3 py-1 bg-gray-300 text-sm rounded-full hover:bg-gray-400"
                    onClick={() => handleIncrease(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="text-red-500 hover:text-red-700 text-sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  ลบ
                </button>
                <p className="text-sm text-gray-600">ราคา: {item.price * item.quantity} บาท</p>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-4">
            <p className="font-semibold text-xl text-gray-800">ยอดรวม: {totalPrice.toLocaleString()} บาท</p>
            <button
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200"
              onClick={handleCheckout}
            >
              ชำระเงิน
            </button>
          </div>
        </>
      )}
    </div>
  );
}
