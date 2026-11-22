import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, Home, ArrowRight, AlertCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify your password.');
      return;
    }

    setLoading(true);
    const result = signup({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });
    setLoading(false);

    if (result.success) {
      // After signup, display the welcome screen which then directs to onboarding!
      navigate('/welcome');
    } else {
      setError(result.error);
    }
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
          <h1 className="text-2xl font-extrabold text-[#252333]">
            Create Your Account
          </h1>
          <p className="text-sm text-[#656377]">
            Find compatible flatmates who match your lifestyle
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#656377] absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                placeholder="Maya Lin"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm text-[#252333] focus:outline-none focus:ring-2 focus:ring-[#7056D8] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#656377] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="maya@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm text-[#252333] focus:outline-none focus:ring-2 focus:ring-[#7056D8] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#656377] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F6] border border-slate-200 rounded-xl text-sm text-[#252333] focus:outline-none focus:ring-2 focus:ring-[#7056D8] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-xs font-bold text-[#252333] uppercase tracking-wider mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#656377] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                placeholder="Repeat password"
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
              icon={UserPlus}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </div>
        </form>

        <p className="mt-8 text-center text-xs text-[#656377]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#7056D8] font-bold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
