import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product, Category } from '../types';
import { Search, SlidersHorizontal, ShoppingCart } from 'lucide-react';

interface ListingProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const Listing: React.FC<ListingProps> = ({ products, onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceSort, setPriceSort] = useState<'asc' | 'desc' | 'default'>('default');

  const categories = ['All', ...Object.values(Category)];

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceSort === 'asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (priceSort === 'desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, searchTerm, priceSort]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-800">Shop Tools</h1>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
            />
          </div>
          
          <select 
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value as any)}
            className="px-4 py-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
          >
            <option value="default">Sort by</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm sticky top-24">
            <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold">
              <SlidersHorizontal size={20} />
              <h2>Categories</h2>
            </div>
            <div className="space-y-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === cat 
                      ? 'bg-orange-50 text-orange-600 font-semibold' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-200 border-dashed">
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No products found</h3>
              <p className="text-slate-400">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <div key={product.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                     <Link to={`/product/${product.id}`}>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </Link>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-800 shadow-sm">
                      {product.category}
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow flex flex-col">
                    <Link to={`/product/${product.id}`} className="block mb-2">
                      <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-orange-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-slate-200'}`}>★</span>
                      ))}
                      <span className="text-xs text-slate-400 ml-1">({product.rating})</span>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-bold text-slate-900">RM {product.price.toFixed(2)}</span>
                      <button 
                        onClick={() => onAddToCart(product)}
                        className="p-2.5 bg-slate-100 text-slate-900 rounded-full hover:bg-orange-500 hover:text-white transition-all active:scale-95"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};