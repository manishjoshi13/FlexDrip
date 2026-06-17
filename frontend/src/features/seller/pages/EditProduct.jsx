import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import ImageUploadZone from '../components/ImageUploadZone';
import Navbar from '../../buyer/components/Navbar';
import { ArrowLeft, Loader2, AlertCircle, ShoppingBag, Save, Trash2, X } from 'lucide-react';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isLoading, error, myProducts, getProductById, updateProduct } = useProduct();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priceAmount, setPriceAmount] = useState('');
    const [priceCurrency, setPriceCurrency] = useState('INR');
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    
    const [pageLoading, setPageLoading] = useState(true);
    const [localValidationError, setLocalValidationError] = useState('');

    useEffect(() => {
        const loadProduct = async () => {
            // First check if product is available in Redux cache
            const cachedProduct = myProducts?.find(p => p._id === id || p.id === id);
            
            if (cachedProduct) {
                populateForm(cachedProduct);
                setPageLoading(false);
            } else {
                // If not in cache, fetch from API
                const result = await getProductById(id);
                if (result?.success && result.product) {
                    populateForm(result.product);
                } else {
                    setLocalValidationError('Could not load product details.');
                }
                setPageLoading(false);
            }
        };

        loadProduct();
    }, [id, myProducts]);

    const populateForm = (product) => {
        setTitle(product.title || '');
        setDescription(product.description || '');
        setPriceAmount(product.price?.amount || '');
        setPriceCurrency(product.price?.currency || 'INR');
        setExistingImages(product.images || []);
    };

    const handleRemoveExistingImage = (indexToRemove) => {
        setExistingImages(existingImages.filter((_, idx) => idx !== indexToRemove));
    };

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
        
        const totalImagesCount = existingImages.length + newImages.length;
        if (totalImagesCount === 0) {
            setLocalValidationError('Please keep or upload at least one product image.');
            return;
        }
        if (totalImagesCount > 7) {
            setLocalValidationError('You can have a maximum of 7 images in total.');
            return;
        }

        // Prepare FormData
        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('description', description.trim());
        formData.append('priceAmount', priceAmount.toString());
        formData.append('priceCurrency', priceCurrency);
        formData.append('existingImages', JSON.stringify(existingImages));
        
        newImages.forEach((file) => {
            formData.append('images', file);
        });

        // Call API
        const result = await updateProduct(id, formData);
        if (result?.success) {
            navigate('/seller');
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    const remainingImageCapacity = 7 - existingImages.length;

    if (pageLoading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500 gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-black" />
                <span className="text-sm font-semibold">Loading product details...</span>
            </div>
        );
    }

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
                            <h1 className="text-2xl font-bold tracking-tight text-neutral-950">Edit Product</h1>
                            <p className="text-sm text-neutral-555 font-medium">Modify listings, adjust prices, or edit photos.</p>
                        </div>
                    </div>
                </div>

            {/* Error alerts */}
            {(localValidationError || error) && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="text-sm font-bold text-red-800">Error</h4>
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

                    {/* Current Saved Images */}
                    <div className="space-y-3 pt-2 border-t border-gray-50">
                        <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                            <span>Currently Saved Images ({existingImages.length})</span>
                            <span>First image will be the cover</span>
                        </div>
                        {existingImages.length === 0 ? (
                            <p className="text-xs text-gray-400 font-normal italic">No saved images. Please upload new ones below.</p>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                                {existingImages.map((img, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-xl border border-gray-100 overflow-hidden group shadow-sm bg-gray-50">
                                        <img src={img.url} alt={`Saved ${idx + 1}`} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveExistingImage(idx)}
                                                className="p-1.5 bg-white text-gray-900 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors active:scale-90 shadow-sm cursor-pointer"
                                                title="Delete image"
                                            >
                                                <X className="w-3.5 h-3.5 stroke-[2.5]" />
                                            </button>
                                        </div>
                                        {idx === 0 && (
                                            <div className="absolute bottom-1.5 left-1.5 bg-black/85 text-[8px] font-bold tracking-wider uppercase text-white px-1.5 py-0.5 rounded-md">
                                                Cover
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Image Upload Zone for new images */}
                    {remainingImageCapacity > 0 ? (
                        <div className="pt-4 border-t border-gray-50">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">Upload New Images</label>
                            <ImageUploadZone 
                                images={newImages} 
                                onChange={setNewImages}
                                maxImages={remainingImageCapacity}
                            />
                        </div>
                    ) : (
                        <div className="p-3.5 bg-gray-50 border border-gray-100 rounded-2xl text-xs text-gray-400 font-normal italic">
                            You have reached the maximum catalog limit of 7 images. Delete existing images above if you want to upload new ones.
                        </div>
                    )}
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
                                Saving Changes...
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4 stroke-[2]" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>
            </form>
            </main>
        </div>
    );
};

export default EditProduct;
