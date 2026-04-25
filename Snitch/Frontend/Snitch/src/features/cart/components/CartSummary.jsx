import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const CartSummary = ({ total, totalItems, onCheckout }) => {
    const shipping = total > 1000 ? 0 : 99;
    const tax = Math.round(total * 0.18);
    const finalTotal = total + shipping + tax;
     const handlePayment = () => {
    const options = {
      key: "rzp_test_Sho1qGO855U8XQ",
      amount: 50000, // Amount in paise
      currency: "INR",
      name: "Test Company",
      description: "Test Transaction",
      order_id: "order_9A33XWu170gUtm", // Generate order_id on server
      handler: (response) => {
        console.log(response);
        alert("Payment Successful!");
      },
      prefill: {
        name: "Harpreet Singh",
        email: "theharpreetsingh524@gmail.com",
        contact: "7973546328",
      },
      theme: {
        color: "#F37254",
      },
    };

   const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sticky top-24 shadow-2xl shadow-black/50">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <ShoppingBag className="text-indigo-500" size={24} />
                Order Summary
            </h2>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-zinc-400">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="text-white font-medium">₹{total}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-500 font-medium" : "text-white font-medium"}>
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                    <span>Estimated Tax (GST 18%)</span>
                    <span className="text-white font-medium">₹{tax}</span>
                </div>
                
                <div className="h-px bg-zinc-800 my-4" />
                
                <div className="flex justify-between text-xl font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-indigo-500">₹{finalTotal}</span>
                </div>
            </div>

            <button 
                onClick={handlePayment}
                disabled={totalItems === 0}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-indigo-500/20"
            >
                Proceed to Checkout
                <ArrowRight size={20} />
            </button>

            <p className="text-center text-xs text-zinc-500 mt-4">
                Secure SSL Encrypted Checkout
            </p>
        </div>
    );
};

export default CartSummary;
