import React, { useEffect, useState } from 'react';
import { useBuyer } from '../features/buyer/hooks/useBuyer';
import Navbar from '../features/buyer/components/Navbar';
import BuyerProductCard from '../features/buyer/components/BuyerProductCard';
import { 
    AlertCircle, 
    ArrowDown, 
    Shirt, 
    ShieldCheck, 
    Truck, 
    RotateCcw, 
    ArrowRight, 
    Sparkles, 
    Flame, 
    Layers, 
    Crown, 
    Glasses 
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth';

const Home = () => {
    const { fetchProducts, allProducts, isLoading, error } = useBuyer();
    const { user } = useAuth();
    const [selectedTab, setSelectedTab] = useState('ALL');

    useEffect(() => {
        fetchProducts();
    }, []);

    const scrollToCatalog = () => {
        const element = document.getElementById('catalog-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    // Categories data with Lucide vector icons
    const categories = [
        { id: 'ALL', name: 'ALL IN', Icon: Sparkles },
        { id: 'TRENDING', name: 'TRENDING', Icon: Flame },
        { id: 'SHIRTS', name: 'SHIRTS', Icon: Shirt },
        { id: 'DENIM', name: 'DENIM', Icon: Layers },
        { id: 'ESSENTIALS', name: 'ESSENTIALS', Icon: Crown },
        { id: 'ACCESSORIES',name:'ACCESSORIES', Icon: Glasses }
    ];

    // Filter products dynamically based on selected tab
    const filteredProducts = allProducts 
        ? allProducts.filter(product => {
            if (selectedTab === 'ALL') return true;
            if (selectedTab === 'SHIRTS') {
                return product.title?.toLowerCase().includes('shirt') || product.description?.toLowerCase().includes('shirt');
            }
            if (selectedTab === 'DENIM') {
                return product.title?.toLowerCase().includes('denim') || product.description?.toLowerCase().includes('denim');
            }
            if (selectedTab === 'TRENDING') {
                return product.price?.amount < 1500; // Mock trending based on price point
            }
            if (selectedTab === 'ESSENTIALS') {
                return product.price?.amount >= 1500; // Mock essentials based on premium price point
            }
            return true;
        })
        : [];

    return (
        <div className="min-h-screen bg-[#fafaf9] flex flex-col font-sans">
            {/* Navbar */}
            <Navbar />

            {/* Seller Warning Panel */}
            {user?.role === 'seller' && (
                <div className="bg-amber-50 border border-amber-100/60 px-4 py-3 flex items-center justify-between text-xs text-amber-800 font-semibold max-w-7xl mx-auto w-full mt-4 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                    <span className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        You are logged in as a Seller. Switch to your seller panel to manage your stock.
                    </span>
                    <NavLink to="/seller" className="underline hover:text-amber-900 shrink-0">
                        Go to Seller Panel &rarr;
                    </NavLink>
                </div>
            )}

            {/* Hero Section */}
            <header className="relative bg-neutral-900 h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="/fashion_hero_banner.png" 
                        alt="Summer Collection" 
                        className="w-full h-full object-cover opacity-65 filter brightness-[0.7]" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/10" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto text-center px-6 space-y-6">
                    <div className="backdrop-blur-md bg-white/5 border border-white/10 p-8 sm:p-12 rounded-3xl shadow-[0_24px_50px_rgba(0,0,0,0.1)] space-y-4 max-w-lg mx-auto">
                        <span className="text-xs font-bold tracking-[0.25em] uppercase text-white/80 block">
                            Summer / Escape '26
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-widest text-white uppercase leading-none font-sans">
                            THE ART OF MINIMALISM
                        </h1>
                        <p className="text-xs sm:text-sm text-neutral-300 font-medium leading-relaxed max-w-sm mx-auto">
                            Modern silhouettes, heavy cotton fabrics, and neutral tones designed to build a timeless streetwear wardrobe.
                        </p>
                        
                        <div className="pt-2 flex justify-center">
                            <button
                                onClick={scrollToCatalog}
                                className="group flex items-center gap-1.5 bg-white text-black px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-100 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer shadow-md"
                            >
                                Shop Collection
                                <ArrowDown className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-y-0.5 transition-transform duration-200" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Category Highlight Track (Now Section 1 - Above Catalog) */}
            <section className="py-12 bg-white border-b border-neutral-100/50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <span className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase">Shop by Line</span>
                        <h2 className="text-lg font-bold tracking-wider uppercase text-neutral-950 mt-1.5">Discover Categories</h2>
                    </div>
                    
                    <div className="flex items-center justify-start md:justify-center gap-10 overflow-x-auto py-3 scrollbar-none">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    if (cat.id) {
                                        setSelectedTab(cat.id);
                                        
                                    } 
                                }}
                                className="flex flex-col items-center gap-2.5 shrink-0 group cursor-pointer"
                            >
                                <div className="w-12 h-12 rounded-full border border-neutral-200/80 bg-white flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-neutral-950 group-hover:border-neutral-950 transition-all duration-300">
                                    <cat.Icon className="w-4.5 h-4.5  text-neutral-800 group-hover:text-white stroke-[1.25] transition-colors duration-300" />
                                </div>
                                <span className="text-[10px] font-bold tracking-wider uppercase text-gray-800 group-hover:text-black transition-colors">
                                    {cat.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </section>


            {/* Catalog Grid Section (Now Section 1 - Above Categories & Lookbook) */}
            <section id="catalog-section" className="bg-[#f5f5f4]/65 border-b border-neutral-200/30 py-16 w-full flex-grow">
                <main className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Section Header */}
                    

                    

                    {/* Error Banner */}
                    {error && (
                        <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 shadow-sm">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="text-sm font-bold text-red-800">Connection Error</h4>
                                <p className="text-xs text-red-600 font-medium mt-0.5">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Products Grid / Skeletons */}
                    {isLoading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white rounded-2xl border border-neutral-100/30 overflow-hidden shadow-sm p-3 space-y-3 animate-pulse">
                                    <div className="aspect-square bg-neutral-100 rounded-xl w-full" />
                                    <div className="space-y-2">
                                        <div className="h-3 bg-neutral-100 rounded-md w-3/4" />
                                        <div className="h-2.5 bg-neutral-100 rounded-md w-full" />
                                    </div>
                                    <div className="pt-2 border-t border-neutral-50 flex justify-between">
                                        <div className="h-3 bg-neutral-100 rounded-md w-1/4" />
                                        <div className="h-3 bg-neutral-100 rounded-md w-1/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="w-full flex flex-col items-center justify-center py-20 text-center border border-neutral-150/40 rounded-3xl bg-white shadow-[0_4px_20px_rgb(0,0,0,0.015)]">
                            <div className="p-4 bg-neutral-50 rounded-2xl text-neutral-400 mb-4">
                                <Shirt className="w-8 h-8 stroke-[1.25] text-black" />
                            </div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-950">No items available</h3>
                            <p className="text-xs text-neutral-400 font-medium mt-1 max-w-xs leading-relaxed">
                                No products currently match this collection filter.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {filteredProducts.map((product) => (
                                <BuyerProductCard key={product._id || product.id} product={product} />
                            ))}
                        </div>
                    )}
                </main>
            </section>

            

            {/* Premium Lookbook Poster Section (Now Section 3 - Below Categories) */}
            <section className="py-12 bg-white border-b border-neutral-100/50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="relative rounded-3xl overflow-hidden h-[45vh] sm:h-[50vh] bg-black shadow-lg flex items-center p-8 sm:p-16">
                        {/* Background Poster Image */}
                        <div className="absolute inset-0 z-0">
                            <img 
                                src="/fashion_editorial_poster.png" 
                                alt="Editorial Couture" 
                                className="w-full h-full object-cover opacity-80 object-[center_35%] transition-transform duration-700 hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent" />
                        </div>
                        
                        {/* Content Overlay */}
                        <div className="relative z-10 max-w-sm sm:max-w-md text-white">
                            <div className="backdrop-blur-md bg-black/40 border border-white/15 p-8 sm:p-10 rounded-3xl space-y-4 shadow-2xl">
                                <span className="text-xs font-bold tracking-widest uppercase text-white/60 block">Editorial lookbook</span>
                                <h3 className="text-xl sm:text-2xl font-bold tracking-widest uppercase leading-snug">
                                    THE EDITORIAL COUTURE
                                </h3>
                                <p className="text-xs text-neutral-300 leading-relaxed font-medium">
                                    A structured dialogue between tailored shapes and absolute comfort. Build a timeless wardrobe with loose silhouettes and heavy fabrics.
                                </p>
                                <div className="pt-2">
                                    <button 
                                        onClick={scrollToCatalog}
                                        className="group flex items-center gap-1.5 bg-white text-black px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-neutral-100 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98] transition-all cursor-pointer shadow-md"
                                    >
                                        View Lookbook
                                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform duration-200" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand Assurances Bar */}
            <section className="bg-white border-t border-b border-neutral-100/50 py-8">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100 text-center">
                        <div className="flex items-center justify-center gap-2.5 py-2 sm:py-0">
                            <Truck className="w-4 h-4 text-neutral-800 shrink-0" />
                            <span className="text-xs font-bold tracking-[0.15em] uppercase text-neutral-800">Free Shipping Above ₹1,999</span>
                        </div>
                        <div className="flex items-center justify-center gap-2.5 py-2 sm:py-0">
                            <RotateCcw className="w-4 h-4 text-neutral-800 shrink-0" />
                            <span className="text-xs font-bold tracking-[0.15em] uppercase text-neutral-800">Easy 7-Day Exchange</span>
                        </div>
                        <div className="flex items-center justify-center gap-2.5 py-2 sm:py-0">
                            <ShieldCheck className="w-4 h-4 text-neutral-800 shrink-0" />
                            <span className="text-xs font-bold tracking-[0.15em] uppercase text-neutral-800">100% Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Minimal Brand Footer */}
            <footer className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-4">
                    <h3 className="text-lg font-bold tracking-[0.2em] text-black uppercase">SNITCH</h3>
                    <p className="text-xs text-neutral-400 font-medium tracking-wider">© 2026 SNITCH CLOTHING CO. ALL RIGHTS RESERVED.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
