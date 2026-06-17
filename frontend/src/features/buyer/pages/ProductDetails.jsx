import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBuyer } from '../hooks/useBuyer';
import Navbar from '../components/Navbar';
import { ArrowLeft, Loader2, AlertCircle, ShoppingBag, Truck, RotateCcw, ShieldCheck, Tag } from 'lucide-react';

const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£'
};

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { viewProduct, singleProduct, isLoading, error } = useBuyer();

    const [selectedSize, setSelectedSize] = useState('M');
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [addedToCart, setAddedToCart] = useState(false);

    useEffect(() => {
        if (id) {
            viewProduct(id);
        }
    }, [id]);

    const handleBackClick = () => {
        navigate('/');
    };

    const handleAddToCart = () => {
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#fafafa] flex flex-col">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-grow flex flex-col justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 animate-pulse">
                        <div className="lg:col-span-4 aspect-[4/5] bg-gray-200 rounded-2xl" />
                        <div className="lg:col-span-8 space-y-6 py-4">
                            <div className="h-4 bg-gray-200 rounded w-1/4" />
                            <div className="h-8 bg-gray-200 rounded w-3/4" />
                            <div className="h-6 bg-gray-200 rounded w-1/3" />
                            <div className="h-20 bg-gray-200 rounded w-full" />
                            <div className="h-10 bg-gray-200 rounded w-1/2" />
                            <div className="h-12 bg-gray-200 rounded w-full" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !singleProduct) {
        return (
            <div className="min-h-screen bg-[#fafafa] flex flex-col">
                <Navbar />
                <div className="max-w-md mx-auto px-4 py-20 text-center flex-grow flex flex-col justify-center">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4 stroke-[1.5]" />
                    <h2 className="text-xl font-bold text-gray-950 mb-2">Product Not Found</h2>
                    <p className="text-sm text-gray-500 font-medium mb-6">
                        {error || "The product you are looking for might have been removed or is temporarily unavailable."}
                    </p>
                    <button
                        onClick={handleBackClick}
                        className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-gray-900 transition-all active:scale-[0.98] cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    const { title, description, price, images } = singleProduct;
    const currencySymbol = currencySymbols[price?.currency] || '₹';
    const priceAmount = price?.amount !== undefined ? price.amount : 0;
    const hasImages = images && images.length > 0;
    const activeImage = hasImages ? images[activeImageIndex]?.url : null;

    return (
        <div className="min-h-screen bg-[#fafafa] flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Main Area */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow">
                {/* Back Link */}
                <button
                    onClick={handleBackClick}
                    className="group inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-black transition-colors mb-8 cursor-pointer"
                >
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                    Back to shop
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left Panel: Images Gallery (Cols 5) */}
                    <div className="lg:col-span-5 max-h-[36rem] flex flex-col md:flex-row gap-4">
                        {/* Thumbnail Bar (side-by-side on desktop, bottom on mobile) */}
                        {hasImages && images.length > 1 && (
                            <div className="flex flex-row md:flex-col gap-2 order-2 md:order-1 overflow-x-auto md:overflow-x-visible">
                                {images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImageIndex(index)}
                                        className={`aspect-square w-16 rounded-lg overflow-hidden border-2 shrink-0 bg-gray-50 transition-all duration-300 cursor-pointer hover:scale-105
                                            ${activeImageIndex === index ? 'border-black scale-[0.98]' : 'border-transparent hover:border-neutral-400'}`}
                                    >
                                        <img src={img.url} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Large Highlight Image */}
                        <div className="w-full aspect-[4/5] md:max-w-md bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm order-1 md:order-2">
                            {activeImage ? (
                                <img 
                                    src={activeImage} 
                                    alt={title} 
                                    className="w-full h-full object-cover transition-all duration-300"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400 p-8">
                                    <Tag className="w-12 h-12 stroke-[1.25] mb-2" />
                                    <span className="text-sm font-semibold uppercase tracking-wider">No Image Available</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Panel: Content & Purchase details (Cols 7) */}
                    <div className="lg:col-span-7 space-y-8 flex flex-col justify-start py-2">
                        {/* Title & Brand */}
                        <div className="space-y-2">
                            <span className="text-xs font-bold tracking-[0.25em] text-gray-400 uppercase">
                                SNITCH ORIGINALS
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
                                {title}
                            </h1>
                            <div className="text-xl sm:text-2xl font-bold text-black pt-1">
                                {currencySymbol}{Number(priceAmount).toLocaleString()}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2.5">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Description</h4>
                            <p className="text-sm text-gray-600 font-medium leading-relaxed">
                                {description}
                            </p>
                        </div>

                        {/* Sizing selection */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
                                <span>Select Size</span>
                                <a href="#" className="underline text-gray-500 hover:text-black transition-colors">Size Guide</a>
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-11 h-11 rounded-xl text-xs font-bold border transition-all duration-200 active:scale-95 cursor-pointer hover:-translate-y-0.5 hover:shadow-sm
                                            ${selectedSize === size 
                                                ? 'bg-black border-black text-white shadow-md' 
                                                : 'bg-white border-neutral-200 text-neutral-800 hover:border-black hover:bg-neutral-50'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity selection */}
                        <div className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Quantity</label>
                            <div className="flex items-center border border-neutral-200 rounded-xl w-32 bg-white overflow-hidden shadow-sm">
                                <button
                                    type="button"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-3.5 py-2.5 text-xs font-bold text-neutral-500 hover:bg-neutral-100 hover:text-black transition-colors active:scale-95 cursor-pointer"
                                >
                                    -
                                </button>
                                <span className="flex-grow text-center text-xs font-bold text-neutral-900">{quantity}</span>
                                <button
                                    type="button"
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-3.5 py-2.5 text-xs font-bold text-neutral-500 hover:bg-neutral-100 hover:text-black transition-colors active:scale-95 cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action CTA Button */}
                        <div className="space-y-3 pt-2">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="group w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-xl text-sm font-semibold uppercase tracking-wider hover:bg-neutral-900 hover:shadow-lg hover:shadow-neutral-950/15 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 cursor-pointer"
                            >
                                <ShoppingBag className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
                                Add To Bag
                            </button>
                            {addedToCart && (
                                <div className="p-3.5 bg-green-50 border border-green-100 rounded-xl text-[10px] text-green-700 font-bold text-center animate-in fade-in duration-200">
                                    Product added to bag successfully
                                </div>
                            )}
                        </div>

                        {/* Assurances Details (Premium Card style) */}
                        <div className="border border-neutral-100 bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.01)] grid grid-cols-1 gap-4.5 text-xs font-medium text-neutral-500">
                            <div className="flex items-start gap-3">
                                <Truck className="w-4.5 h-4.5 text-neutral-800 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-neutral-900 text-[11px] uppercase tracking-wider">Free Express Delivery</p>
                                    <p className="text-[10px] text-neutral-400 mt-0.5 leading-relaxed">Complimentary dispatch on orders above ₹1,999.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3.5 border-t border-neutral-50 pt-4.5">
                                <RotateCcw className="w-4.5 h-4.5 text-neutral-800 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-neutral-900 text-[11px] uppercase tracking-wider">Easy Returns</p>
                                    <p className="text-[10px] text-neutral-400 mt-0.5 leading-relaxed">Hassle-free 7-day swap/return guarantee.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3.5 border-t border-neutral-50 pt-4.5">
                                <ShieldCheck className="w-4.5 h-4.5 text-neutral-800 shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold text-neutral-900 text-[11px] uppercase tracking-wider">Secure Transactions</p>
                                    <p className="text-[10px] text-neutral-400 mt-0.5 leading-relaxed">Fully encrypted payments for worry-free shopping.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-100 py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-400 font-medium">
                    © 2026 SNITCH CLOTHING CO. ALL RIGHTS RESERVED.
                </div>
            </footer>
        </div>
    );
};

export default ProductDetails;
