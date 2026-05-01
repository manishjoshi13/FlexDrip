import React, { useState, useEffect } from 'react';
import { Mail, Lock, ArrowRight, Store, UserRound, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';

const Login = () => {
    const [role, setRole] = useState('buyer');
    const [showPassword, setShowPassword] = useState(false);
    const { user, login, isLoading, error } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const loginHandle = async (e) => {
        e.preventDefault();
        await login({ ...formData, role });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-[#fafafa]">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 sm:p-10 border border-gray-100">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">SNITCH</h1>
                    <p className="text-sm text-gray-500 font-medium">Welcome back, please enter your details.</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600 font-medium">{error}</p>
                    </div>
                )}

                {/* Role Selector */}
                <div className="relative flex p-1 mb-8 bg-gray-100 rounded-xl">
                    {/* Sliding Black Background */}
                    <div
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-black rounded-lg transition-transform duration-300 ease-out ${role === 'seller' ? 'translate-x-full' : 'translate-x-0'
                            }`}
                    ></div>

                    <button
                        type="button"
                        onClick={() => setRole('buyer')}
                        className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-colors duration-300 z-10 ${role === 'buyer' ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        <UserRound className="w-4 h-4" />
                        Buyer
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole('seller')}
                        className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-colors duration-300 z-10 ${role === 'seller' ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        <Store className="w-4 h-4" />
                        Seller
                    </button>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={loginHandle}>
                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700 block">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all placeholder:text-gray-400"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700 block">Password</label>
                            <a href="#" className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors">
                                Forgot password?
                            </a>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                className="w-full pl-11 pr-11 py-3 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all placeholder:text-gray-400"
                                required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-2 flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl text-sm font-medium hover:bg-gray-900 transition-colors active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Signing In...
                            </>
                        ) : (
                            <>
                                Sign In
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-8 text-center text-sm text-gray-500">
                    Don't have an account?{' '}
                    <NavLink to="/register" className="font-semibold text-gray-900 hover:underline underline-offset-4">
                        Sign up
                    </NavLink>
                </p>
            </div>
        </div>
    );
};

export default Login;
