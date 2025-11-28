import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AiAssistant } from './components/AiAssistant';
import { Home } from './pages/Home';
import { Listing } from './pages/Listing';
import { Detail } from './pages/Detail';
import { Cart } from './pages/Cart';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { CartItem, Product } from './types';
import { PRODUCTS } from './constants';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  // Admin Logic
  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
        
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Listing products={products} onAddToCart={addToCart} />} />
            <Route path="/product/:id" element={<Detail products={products} onAddToCart={addToCart} />} />
            <Route 
              path="/cart" 
              element={
                <Cart 
                  items={cart} 
                  onRemove={removeFromCart} 
                  onUpdateQuantity={updateQuantity} 
                  onClear={clearCart}
                />
              } 
            />
            <Route 
              path="/admin" 
              element={
                isAdminLoggedIn 
                  ? <Admin products={products} onAddProduct={addProduct} onLogout={() => setIsAdminLoggedIn(false)} />
                  : <Login onLogin={() => setIsAdminLoggedIn(true)} />
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="bg-slate-900 text-slate-300 py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="mb-2 font-semibold">BuildRight Hardware</p>
            <p className="text-sm text-slate-500">© 2024 BuildRight Inc. All rights reserved.</p>
          </div>
        </footer>

        <AiAssistant />
      </div>
    </HashRouter>
  );
}