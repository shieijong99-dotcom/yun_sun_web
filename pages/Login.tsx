import React, { useState } from 'react';
import { Lock, User, KeyRound, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded credentials for demonstration
    if (username === 'admin' && password === '123') {
      onLogin();
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-10 animate-in fade-in zoom-in duration-300">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 text-orange-600 mb-6 shadow-inner">
            <Lock size={36} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Access</h1>
          <p className="text-slate-500 mt-2">Secure dashboard login for store managers.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">Username</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700 ml-1">Password</label>
            <div className="relative group">
              <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
               <ShieldCheck size={16} />
               {error}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-900/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            Sign In to Dashboard <ArrowRight size={18} />
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-medium">
            Demo Access: Username <span className="text-slate-600 font-bold bg-slate-100 px-1 py-0.5 rounded">admin</span> / Password <span className="text-slate-600 font-bold bg-slate-100 px-1 py-0.5 rounded">123</span>
          </p>
        </div>
      </div>
    </div>
  );
};