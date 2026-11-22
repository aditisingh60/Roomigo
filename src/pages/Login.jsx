import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Lock, Mail, Home, ArrowRight, AlertCircle, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = login(email, password);
    setLoading(false);

    if (result.success) {
      // Display welcome screen first, as requested
      navigate('/welcome');
    } else {
      setError(result.error);
    }
  };

  // Quick fill helper for testing
  const fillDemoAccount = () => {
    setEmail('demo@roomigo.com');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4 sm:px-6">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-900/5">
        <div className="text-center mb-8 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#7056D8] to-[#FF8BA7] p-0.5 mx-auto shadow-md shadow-[#7056D8]/20">
            <div className="w-full h-full bg-[#7056D8] rounded-[14px] flex items-center justify-center text-white">
              <Home className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-[#252333]">Welcome Back</h1>
          <p className="text-sm text-[#656377]">
            Log in to continue finding your ideal flatmate
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#656377] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm text-[#252333] focus:outline-none focus:ring-2 focus:ring-[#7056D8] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider">
                Password
              </label>
              <span className="text-xs text-[#7056D8] hover:underline cursor-pointer">
                Forgot?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#656377] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm text-[#252333] focus:outline-none focus:ring-2 focus:ring-[#7056D8] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="w-full py-3 text-sm font-semibold shadow-md shadow-[#7056D8]/20"
              icon={LogIn}
            >
              {loading ? 'Signing in...' : 'Sign In to Roomigo'}
            </Button>
          </div>
        </form>

        {/* Demo Account Quick-Fill Card */}
        <div className="mt-6 p-3.5 bg-[#F0ECFF]/60 rounded-2xl border border-[#7056D8]/15 flex items-center justify-between gap-3">
          <div className="text-xs text-[#252333] text-left">
            <p className="font-bold flex items-center gap-1 text-[#7056D8]">
              <Sparkles className="w-3.5 h-3.5" /> Demo Account
            </p>
            <p className="text-[11px] text-[#656377]">demo@roomigo.com / password123</p>
          </div>
          <button
            type="button"
            onClick={fillDemoAccount}
            className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#7056D8] text-white hover:bg-[#5d44c8] transition-colors cursor-pointer"
          >
            Auto Fill
          </button>
        </div>

        <p className="mt-8 text-center text-xs text-[#656377]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#7056D8] font-bold hover:underline">
            Get Started free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
