import React from 'react';
import { Tag, ArrowUpRight } from 'lucide-react';

const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£'
};

const BuyerProductCard = ({ product }) => {
    const { _id, id, title, price, images } = product;
    const productId = _id || id;
    
    const currencySymbol = currencySymbols[price?.currency] || '₹';
    const priceAmount = price?.amount !== undefined ? price.amount : 0;
    
    const firstImageUrl = images && images.length > 0 ? images[0].url : null;

    const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

    return (
        <a 
            href={`/product/${productId}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex flex-col h-full bg-white border border-neutral-200/50 p-2 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.07)] hover:-translate-y-1 hover:border-neutral-400 transition-all duration-300 text-inherit no-underline"
        >
            {/* Image Container (1:1 Aspect Ratio) */}
            <div className="relative aspect-square w-full bg-neutral-50 overflow-hidden shrink-0 rounded-xl transition-all duration-300">
                {firstImageUrl ? (
                    <img 
                        src={firstImageUrl} 
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 text-neutral-400 p-6">
                        <Tag className="w-7 h-7 stroke-[1.25] mb-1.5" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-550">No Image</span>
                    </div>
                )}

                {/* Quick View Button (Top-Right Floating) */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-150 flex items-center justify-center shadow-md text-black hover:bg-black hover:text-white hover:scale-105 active:scale-95 transition-all duration-200">
                        <ArrowUpRight className="w-4 h-4 stroke-[2]" />
                    </div>
                </div>

                {/* Size Capsule Slide-Up Drawer */}
                <div 
                    className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-white/95 backdrop-blur-sm py-3 px-2 border-t border-neutral-100 flex flex-col items-center gap-1.5 z-10"
                    onClick={(e) => e.preventDefault()} // Prevent navigations when clicking drawer background
                >
                    <span className="text-[8px] font-bold tracking-[0.2em] text-neutral-450 uppercase">Select Size</span>
                    <div className="flex items-center gap-1.5 justify-center">
                        {sizes.map((size) => (
                            <button
                                key={size}
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    window.open(`/product/${productId}?size=${size}`, '_blank');
                                }}
                                className="w-6 h-6 rounded-full border border-neutral-200 bg-white flex items-center justify-center text-[8px] font-bold text-neutral-700 hover:border-black hover:bg-black hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content Details */}
            <div className="pt-2.5 pb-1 px-1 flex flex-col flex-grow justify-between">
                <h3 className="text-sm font-bold text-neutral-900 line-clamp-1 group-hover:text-black transition-colors">
                    {title}
                </h3>
                <span className="text-xs font-bold text-neutral-550 mt-1.5 tracking-wide">
                    {currencySymbol}{Number(priceAmount).toLocaleString()}
                </span>
            </div>
        </a>
    );
};

export default BuyerProductCard;
