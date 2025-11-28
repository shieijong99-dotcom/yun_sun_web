import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Hammer, LayoutDashboard, Home as HomeIcon, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-orange-500 font-bold' : 'text-slate-600 hover:text-orange-600';

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-orange-500 text-white p-1.5 rounded-lg group-hover:bg-orange-600 transition-colors">
            <Hammer size={20} />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">BuildRight</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={`flex items-center gap-1.5 transition-colors ${isActive('/')}`}>
            <HomeIcon size={18} /> Home
          </Link>
          <Link to="/shop" className={`flex items-center gap-1.5 transition-colors ${isActive('/shop')}`}>
            <ShoppingBag size={18} /> Shop
          </Link>
          <Link to="/admin" className={`flex items-center gap-1.5 transition-colors ${isActive('/admin')}`}>
            <LayoutDashboard size={18} /> Admin
          </Link>
        </div>

        <Link to="/cart" className="relative p-2 text-slate-600 hover:text-orange-600 transition-colors">
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};