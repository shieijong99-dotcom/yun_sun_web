import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-10"></div>
        <img 
          src="https://picsum.photos/seed/workshop/1200/600" 
          alt="Workshop" 
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative z-20 py-20 px-8 md:px-16 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Build Your Dreams <br/> With The Best Tools.
          </h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            From heavy-duty machinery to precision instruments, we have everything you need to get the job done right. Expert advice included.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/shop" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:-translate-y-1 shadow-lg shadow-orange-500/30 flex items-center gap-2">
              Shop Now <ArrowRight size={20} />
            </Link>
            <Link to="/shop" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold py-3 px-8 rounded-full transition-all">
              View Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="bg-blue-50 p-4 rounded-full text-blue-600 mb-4">
            <Shield size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Lifetime Warranty</h3>
          <p className="text-slate-500">We stand by the quality of our tools. Guaranteed durability for life.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="bg-orange-50 p-4 rounded-full text-orange-600 mb-4">
            <Truck size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
          <p className="text-slate-500">Same-day shipping on orders before 2 PM. Free shipping over RM 150.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
          <div className="bg-green-50 p-4 rounded-full text-green-600 mb-4">
            <Star size={32} />
          </div>
          <h3 className="text-xl font-bold mb-2">Expert Support</h3>
          <p className="text-slate-500">Need help? Our AI assistant and human experts are here 24/7.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-orange-500 rounded-3xl p-10 md:p-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to start your next project?</h2>
        <p className="mb-8 max-w-2xl mx-auto opacity-90">Join thousands of satisfied builders, plumbers, and DIY enthusiasts who trust BuildRight.</p>
        <Link to="/shop" className="inline-block bg-white text-orange-600 font-bold py-3 px-10 rounded-full hover:bg-slate-100 transition-colors shadow-lg">
          Browse Catalog
        </Link>
      </section>
    </div>
  );
};