import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { ArrowLeft, ShoppingCart, Check, ShieldCheck } from 'lucide-react';

interface DetailProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const Detail: React.FC<DetailProps> = ({ products, onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-orange-600 hover:underline">Return to shop</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Image Section */}
        <div className="bg-slate-50 p-8 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full max-w-md object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Info Section */}
        <div className="p-8 md:p-12 flex flex-col">
          <Link to="/shop" className="inline-flex items-center text-sm text-slate-400 hover:text-orange-600 mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Back to Shop
          </Link>

          <div className="mb-2 text-orange-600 font-semibold uppercase tracking-wide text-xs">
            {product.category}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-slate-900">RM {product.price.toFixed(2)}</span>
            <div className="flex items-center gap-1 border-l border-slate-200 pl-4">
               {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-slate-200'}`}>★</span>
                ))}
                <span className="text-sm text-slate-500 ml-1">{product.rating} / 5.0</span>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Specs */}
          {product.specs && (
            <div className="mb-8">
              <h3 className="font-semibold text-slate-900 mb-3">Specifications</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.specs.map((spec, i) => (
                  <li key={i} className="flex items-center text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-lg">
                    <Check size={14} className="text-green-500 mr-2" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto space-y-4">
            <button 
              onClick={() => onAddToCart(product)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-transform transform active:scale-[0.98] shadow-lg shadow-orange-500/20"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={14} />
              <span>Secure transaction • 30-day returns • Lifetime Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};