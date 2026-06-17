import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { LogOut, Menu, X, ShoppingBag } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <nav className="bg-white/75 backdrop-blur-lg border-b border-neutral-100/40 sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    
                    {/* Left: Branding Logo */}
                    <div className="flex items-center">
                        <NavLink to="/" className="text-2xl font-bold tracking-[0.2em] text-black hover:opacity-85 transition-opacity uppercase">
                            SNITCH
                        </NavLink>
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="hidden md:flex space-x-10 items-center h-full">
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `text-xs font-bold uppercase tracking-wider transition-all relative py-6 h-full flex items-center
                                ${isActive ? 'text-black' : 'text-neutral-400 hover:text-black'}
                                ${isActive ? "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black" : "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-full after:h-[2px] after:bg-black after:transition-all after:duration-300"}`
                            }
                        >
                            Shop All
                        </NavLink>
                        <a 
                            href="#" 
                            className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-black transition-all duration-200 py-6 h-full flex items-center relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-full after:h-[2px] after:bg-black after:transition-all after:duration-300"
                        >
                            New Arrivals
                        </a>
                        {user?.role === 'seller' && (
                            <NavLink 
                                to="/seller" 
                                className="text-xs font-bold uppercase tracking-wider text-amber-600 hover:text-amber-700 transition-all duration-200 py-6 h-full flex items-center relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 hover:after:w-full after:h-[2px] after:bg-amber-600 after:transition-all after:duration-300"
                            >
                                Seller Panel
                            </NavLink>
                        )}
                    </div>

                    {/* Right: User Menu & Actions */}
                    <div className="hidden md:flex items-center space-x-8">
                        {user ? (
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 group cursor-pointer">
                                    <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-xs font-bold text-white shadow-sm group-hover:scale-105 group-hover:bg-black transition-all duration-300">
                                        {user.name ? user.name[0].toUpperCase() : 'U'}
                                    </div>
                                    <span className="text-xs font-bold text-neutral-900 group-hover:text-black transition-colors">
                                        Hi, {user.name || 'User'}
                                    </span>
                                </div>
                                
                                <button
                                    onClick={handleLogout}
                                    className="group flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-red-600 transition-colors cursor-pointer"
                                >
                                    <LogOut className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-350" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-6">
                                <NavLink
                                    to="/login"
                                    className="text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-black hover:scale-105 active:scale-95 transition-all"
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className="bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] hover:-translate-y-0.5 active:scale-[0.98] transition-all shadow-sm"
                                >
                                    Sign Up
                                </NavLink>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-xl text-neutral-500 hover:text-black hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-neutral-100/50 bg-white px-6 py-6 space-y-4 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="space-y-2">
                        <NavLink 
                            to="/" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-xs font-bold uppercase tracking-[0.15em] text-neutral-900 py-3.5 border-b border-neutral-50"
                        >
                            Shop All
                        </NavLink>
                        <a href="#" className="block text-xs font-bold uppercase tracking-[0.15em] text-neutral-400 py-3.5 border-b border-neutral-50">
                            New Arrivals
                        </a>
                        {user?.role === 'seller' && (
                            <NavLink 
                                to="/seller" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="block text-xs font-bold uppercase tracking-[0.15em] text-amber-600 py-3.5 border-b border-neutral-50"
                            >
                                Seller Panel
                            </NavLink>
                        )}
                    </div>

                    <div className="pt-4 border-t border-neutral-100 space-y-3">
                        {user ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center text-xs font-bold text-white shadow-sm">
                                        {user.name ? user.name[0].toUpperCase() : 'U'}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-neutral-900">{user.name || 'User'}</p>
                                        <p className="text-[10px] text-neutral-400 font-medium">{user.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full flex items-center justify-center gap-2 py-3 border border-red-100 text-red-500 rounded-xl text-xs font-bold uppercase tracking-[0.15em] hover:bg-red-50/50 transition-colors cursor-pointer"
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <NavLink
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-center py-3 border border-neutral-200 rounded-xl text-xs font-bold uppercase tracking-[0.15em] text-neutral-700 hover:bg-neutral-50 transition-colors"
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-center py-3 bg-black text-white rounded-xl text-xs font-bold uppercase tracking-[0.15em] hover:bg-neutral-900 transition-colors shadow-sm"
                                >
                                    Sign Up
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
