import { useState } from 'react';
import type { User, UserRole } from '../App.tsx';
import { Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

// Mock users for demonstration
const mockUsers = [
  { id: '1', username: 'customer', password: 'customer', role: 'customer' as UserRole, name: 'Budi Santoso' },
  { id: '2', username: 'kasir', password: 'kasir', role: 'kasir' as UserRole, name: 'Siti Aminah' },
  { id: '3', username: 'chef', password: 'chef', role: 'chef' as UserRole, name: 'Agus Wijaya' },
  { id: '4', username: 'operator', password: 'operator', role: 'operator' as UserRole, name: 'Rini Kusuma' },
];

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        onLogin(user);
      } else {
        setError('Username atau password salah');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-purple-900 flex items-center justify-center px-6 pt-12">
      <div className="w-full max-w-full">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto bg-white rounded-[28px] flex items-center justify-center shadow-2xl mb-4 animate-pulse">
            <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
            </svg>
          </div>
          <h1 className="text-white text-3xl mb-1">TursMovie</h1>
          <p className="text-red-200 text-sm">Your Premium Cinema</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[32px] shadow-2xl p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                placeholder="Enter username"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent pr-12 text-sm"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-xs">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3.5 rounded-2xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Loading...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-5 pt-5 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3 text-center">Quick Login</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setUsername('customer'); setPassword('customer'); }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 rounded-xl text-xs hover:shadow-lg transition-all"
              >
                <div className="font-semibold">👤 Customer</div>
                <div className="text-blue-100 text-[10px] mt-0.5">customer</div>
              </button>
              <button
                onClick={() => { setUsername('kasir'); setPassword('kasir'); }}
                className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-3 rounded-xl text-xs hover:shadow-lg transition-all"
              >
                <div className="font-semibold">💳 Kasir</div>
                <div className="text-purple-100 text-[10px] mt-0.5">kasir</div>
              </button>
              <button
                onClick={() => { setUsername('chef'); setPassword('chef'); }}
                className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-3 rounded-xl text-xs hover:shadow-lg transition-all"
              >
                <div className="font-semibold">👨‍🍳 Chef</div>
                <div className="text-orange-100 text-[10px] mt-0.5">chef</div>
              </button>
              <button
                onClick={() => { setUsername('operator'); setPassword('operator'); }}
                className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-3 rounded-xl text-xs hover:shadow-lg transition-all"
              >
                <div className="font-semibold">🎬 Operator</div>
                <div className="text-pink-100 text-[10px] mt-0.5">operator</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}