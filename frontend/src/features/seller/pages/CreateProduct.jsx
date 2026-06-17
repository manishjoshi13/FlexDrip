import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import ImageUploadZone from '../components/ImageUploadZone';
import Navbar from '../../buyer/components/Navbar';
import { ArrowLeft, Loader2, AlertCircle, ShoppingBag, Plus } from 'lucide-react';

const CreateProduct = () => {
    const navigate = useNavigate();
    const { isLoading, error, createProduct } = useProduct();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priceAmount, setPriceAmount] = useState('');
    const [priceCurrency, setPriceCurrency] = useState('INR');
    const [images, setImages] = useState([]);
    
    // Front-end local validations
    const [localValidationError, setLocalValidationError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalValidationError('');

        // Basic Validations
        if (!title.trim()) {
            setLocalValidationError('Product title is required.');
            return;
        }
        if (!description.trim()) {
            setLocalValidationError('Product description is required.');
            return;
        }
        if (!priceAmount || isNaN(priceAmount) || Number(priceAmount) <= 0) {
            setLocalValidationError('Please enter a valid price greater than zero.');
            return;
        }
        if (images.length === 0) {
            setLocalValidationError('Please upload at least one product image.');
            return;
        }

        // Prepare FormData
        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('description', description.trim());
        formData.append('priceAmount', priceAmount.toString());
        formData.append('priceCurrency', priceCurrency);
        
        images.forEach((file) => {
            formData.append('images', file);
        });
       

        // Call API Hook
        const result = await createProduct(formData);
        if (result?.success) {
            // Redirect back to listings
            navigate('/seller');
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-[#fafaf9] flex flex-col font-sans">
            {/* Navbar */}
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-10 w-full flex-grow">
                {/* Back Arrow & Title */}
                <div className="mb-8">
                    <button
                        onClick={handleBackClick}
                        className="group inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-black transition-colors mb-3 cursor-pointer"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                        Back to listings
                    </button>
                    <div className="flex items-center gap-3 border-b border-neutral-200/50 pb-6">
                        <div className="p-2 bg-black text-white rounded-xl">
                            <ShoppingBag className="w-5 h-5 stroke-[2]" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
                                <span>Seller Dashboard</span>
                                <span>/</span>
                                <NavLink to="/" className="hover:text-black transition-colors underline decoration-neutral-350 hover:decoration-black">Go to Home</NavLink>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight text-neutral-950">Add Product</h1>
                            <p className="text-sm text-neutral-555 font-medium">Create a new product listing in your online storefront.</p>
                        </div>
                    </div>
                </div>

            {/* Error alerts */}
            {(localValidationError || error) && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-red-800">Validation Error</h4>
                        <p className="text-xs text-red-600 font-medium mt-0.5">{localValidationError || error}</p>
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 sm:p-8 space-y-6">
                    
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Product Title</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Vintage Denim Jacket"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            maxLength={80}
                            className="w-full bg-gray-50 border border-gray-100 focus:border-gray-200 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all placeholder:text-gray-400 placeholder:font-normal"
                        />
                        <div className="flex justify-end">
                            <span className="text-[10px] text-gray-400 font-medium">{title.length}/80 characters</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Description</label>
                        <textarea
                            required
                            rows={5}
                            placeholder="Describe the materials, style, fit, condition, and other key details..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={1000}
                            className="w-full bg-gray-50 border border-gray-100 focus:border-gray-200 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all resize-none placeholder:text-gray-400 placeholder:font-normal"
                        />
                        <div className="flex justify-end">
                            <span className="text-[10px] text-gray-400 font-medium">{description.length}/1000 characters</span>
                        </div>
                    </div>

                    {/* Price & Currency */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Price Amount</label>
                            <input
                                type="number"
                                required
                                min="1"
                                step="any"
                                placeholder="0.00"
                                value={priceAmount}
                                onChange={(e) => setPriceAmount(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-100 focus:border-gray-200 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium outline-none transition-all placeholder:text-gray-400 placeholder:font-normal"
                            />
                        </div>
                        
                        <div className="col-span-1 space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Currency</label>
                            <select
                                value={priceCurrency}
                                onChange={(e) => setPriceCurrency(e.target.value)}
                                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold outline-none focus:border-gray-300 cursor-pointer"
                            >
                                <option value="INR">INR (₹)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                        </div>
                    </div>

                    {/* Image Upload Zone */}
                    <div className="pt-2 border-t border-gray-50">
                        <ImageUploadZone 
                            images={images} 
                            onChange={setImages} 
                        />
                    </div>
                </div>

                {/* Submit / Cancel Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                        type="button"
                        onClick={handleBackClick}
                        disabled={isLoading}
                        className="px-6 py-3.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                    >
                        Cancel
                    </button>
                    
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center justify-center gap-2 bg-black text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-900 active:scale-[0.98] transition-all disabled:opacity-75 disabled:cursor-not-allowed shadow-md cursor-pointer"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Publishing...
                            </>
                        ) : (
                            <>
                                <Plus className="w-4 h-4 stroke-[2.5]" />
                                Publish Product
                            </>
                        )}
                    </button>
                </div>
            </form>
            </main>
        </div>
    );
};

export default CreateProduct;
