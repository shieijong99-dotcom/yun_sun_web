import React, { useState } from 'react';
import { Product, Category } from '../types';
import { generateProductDescription } from '../services/geminiService';
import { Plus, Wand2, Loader2, Package, LogOut } from 'lucide-react';

interface AdminProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onLogout: () => void;
}

export const Admin: React.FC<AdminProps> = ({ products, onAddProduct, onLogout }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: Category.TOOLS,
    image: 'https://placehold.co/400x400?text=New+Product',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateDescription = async () => {
    if (!formData.name) return;
    setIsGenerating(true);
    const desc = await generateProductDescription(formData.name, formData.category);
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now(),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category as Category,
      image: formData.image,
      description: formData.description,
      rating: 0,
      specs: ['Standard Grade', 'New Arrival']
    };
    onAddProduct(newProduct);
    // Reset form
    setFormData({
        name: '',
        price: '',
        category: Category.TOOLS,
        image: 'https://placehold.co/400x400?text=New+Product',
        description: '',
    });
    alert("Product added successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <div className="p-2 bg-slate-900 rounded-lg text-white"><Package size={24}/></div> 
          Inventory Dashboard
        </h1>
        
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add Product Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-6 border-b border-slate-100 pb-2">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="e.g. Impact Wrench"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Price (RM)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  step="0.01"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white"
                >
                  {Object.values(Category).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
              <div className="relative">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Product details..."
                />
                <button
                  type="button"
                  onClick={handleGenerateDescription}
                  disabled={isGenerating || !formData.name}
                  className="absolute right-2 bottom-2 bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-1 disabled:opacity-50"
                  title="Generate with AI"
                >
                  {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                  AI Generate
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-1">Use AI to generate description based on name and category.</p>
            </div>

            <button 
              type="submit" 
              className="w-full bg-slate-900 text-white font-bold py-3 rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={18} /> Add to Inventory
            </button>
          </form>
        </div>

        {/* Inventory List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[600px]">
          <h2 className="text-xl font-bold mb-4">Current Stock ({products.length})</h2>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {products.slice().reverse().map(product => (
              <div key={product.id} className="flex items-center gap-4 p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors">
                 <img src={product.image} alt={product.name} className="w-12 h-12 rounded bg-slate-100 object-cover" />
                 <div className="flex-1">
                   <h3 className="font-semibold text-slate-800 text-sm">{product.name}</h3>
                   <span className="text-xs text-slate-500">{product.category}</span>
                 </div>
                 <span className="font-bold text-slate-700">RM {product.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};