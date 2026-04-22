import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const CartSummary = ({ total, totalItems, onCheckout }) => {
    const shipping = total > 1000 ? 0 : 99;
    const tax = Math.round(total * 0.18); // 18% GST example
    const finalTotal = total + shipping + tax;

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
                onClick={onCheckout}
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
