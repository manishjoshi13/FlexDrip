import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ClipboardList, ArrowRight, Truck, CheckCircle2, Package, Tag, ArrowLeft } from 'lucide-react';

const currencySymbols = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£'
};

const OrdersPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = localStorage.getItem('flexdrip_orders');
        if (storedOrders) {
            try {
                setOrders(JSON.parse(storedOrders));
            } catch (e) {
                console.error("Failed to parse orders", e);
            }
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#fafaf9] flex flex-col font-sans">
            <Navbar />

            <main className="max-w-4xl mx-auto px-6 py-12 w-full flex-grow">
                {/* Header */}
                <div className="mb-8 flex items-center justify-between border-b border-neutral-200/50 pb-6">
                    <div>
                        <button
                            onClick={() => navigate('/')}
                            className="group inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-400 hover:text-black uppercase tracking-wider mb-2 cursor-pointer"
                        >
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                            Back to Store
                        </button>
                        <h1 className="text-2xl font-bold tracking-tight text-neutral-950">My Orders</h1>
                        <p className="text-xs text-neutral-500 font-medium mt-1">Track and review your purchase history.</p>
                    </div>
                    <div className="p-2.5 bg-neutral-100 rounded-xl">
                        <ClipboardList className="w-5 h-5 text-neutral-800" />
                    </div>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-12 text-center max-w-lg mx-auto">
                        <div className="p-4 bg-neutral-50 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                            <Package className="w-6 h-6 text-neutral-400" />
                        </div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900">No Orders Placed</h3>
                        <p className="text-xs text-neutral-400 font-medium mt-1.5 leading-relaxed">
                            You haven't placed any orders yet. Visit the catalog to add items to your bag.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="mt-6 inline-flex items-center gap-1.5 bg-black text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors cursor-pointer"
                        >
                            Shop Collection
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-3xl border border-neutral-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
                                {/* Order Header */}
                                <div className="bg-neutral-50 border-b border-neutral-100 px-6 py-4 flex flex-wrap justify-between items-center gap-3">
                                    <div className="flex gap-6 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                                        <div>
                                            <span>Order Placed</span>
                                            <p className="text-neutral-900 font-semibold mt-0.5">{order.date}</p>
                                        </div>
                                        <div>
                                            <span>Order ID</span>
                                            <p className="text-neutral-900 font-semibold mt-0.5">#{order.id}</p>
                                        </div>
                                        <div>
                                            <span>Status</span>
                                            <p className="text-green-600 font-bold flex items-center gap-1 mt-0.5">
                                                <Truck className="w-3 h-3" />
                                                {order.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block">Total Price</span>
                                        <span className="text-sm font-bold text-neutral-950 block mt-0.5">
                                            {currencySymbols[order.currency] || '₹'}{Number(order.totalAmount).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="divide-y divide-neutral-50 px-6">
                                    {order.items.map((item, idx) => {
                                        const product = item.productId || {};
                                        // Find variant label if variantId is selected
                                        let variantLabel = '';
                                        if (item.variantId && product.variants) {
                                            const match = product.variants.find(v => v._id === item.variantId || v.id === item.variantId);
                                            if (match?.attributes) {
                                                const attrs = match.attributes;
                                                variantLabel = Object.entries(attrs)
                                                    .map(([k, val]) => `${k}: ${val}`)
                                                    .join(' / ');
                                            }
                                        let itemImage = product.images && product.images.length > 0 ? product.images[0].url : '';
                                        if (item.variantId && product.variants) {
                                            const match = product.variants.find(v => v._id === item.variantId || v.id === item.variantId);
                                            if (match && match.images && match.images.length > 0) {
                                                itemImage = match.images[0].url;
                                            }
                                        }

                                        return (
                                            <div key={idx} className="py-4 flex gap-4 items-center">
                                                <div className="w-14 h-18 bg-neutral-50 border border-neutral-100 rounded-lg overflow-hidden shrink-0">
                                                    {itemImage ? (
                                                        <img src={itemImage} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                            <Tag className="w-4 h-4" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-grow min-w-0">
                                                    <h4 className="text-xs font-bold text-neutral-900 truncate uppercase tracking-wider">{product.title || 'Product'}</h4>
                                                    {variantLabel && (
                                                        <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wide block mt-0.5">
                                                            {variantLabel}
                                                        </span>
                                                    )}
                                                    <span className="text-[10px] font-semibold text-neutral-500 block mt-1.5">
                                                        Qty: {item.quantity}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default OrdersPage;
