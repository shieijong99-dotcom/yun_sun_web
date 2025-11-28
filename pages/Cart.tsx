import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onClear: () => void;
}

export const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQuantity, onClear }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="inline-flex bg-slate-100 p-6 rounded-full mb-6 text-slate-400">
            <ShoppingBag size={48} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your Cart is Empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added any tools yet.</p>
        <Link to="/shop" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items List */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex justify-between items-center mb-2">
           <h1 className="text-2xl font-bold text-slate-800">Shopping Cart <span className="text-slate-400 font-normal text-lg">({items.length} items)</span></h1>
           <button onClick={onClear} className="text-sm text-red-500 hover:underline">Clear Cart</button>
        </div>

        {items.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex gap-4 items-center">
            <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-slate-800">{item.name}</h3>
                <p className="font-bold text-slate-900">RM {(item.price * item.quantity).toFixed(2)}</p>
              </div>
              <p className="text-sm text-slate-500 mb-3">{item.category}</p>
              
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
                  <button 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                    className="p-1 hover:bg-white rounded-md transition-colors text-slate-600"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="p-1 hover:bg-white rounded-md transition-colors text-slate-600"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                
                <button 
                  onClick={() => onRemove(item.id)}
                  className="text-slate-400 hover:text-red-500 p-2 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-24">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Order Summary</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>RM {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated Tax (8%)</span>
              <span>RM {tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping</span>
              <span className="text-green-600 font-semibold">Free</span>
            </div>
            <div className="border-t border-slate-100 pt-3 mt-3 flex justify-between font-bold text-lg text-slate-900">
              <span>Total</span>
              <span>RM {total.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors mb-4">
            Proceed to Checkout <ArrowRight size={18} />
          </button>
          
          <div className="text-center">
             <Link to="/shop" className="text-sm text-slate-500 hover:text-orange-600 underline">Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
};