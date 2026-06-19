import axios from 'axios';

const api = axios.create({
    baseURL: "https://flexdrip.onrender.com/api/order",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export const createOrderAPI = async (orderData) => {
    const response = await api.post("/create", orderData);
    return response.data;
};

export const getMyOrdersAPI = async () => {
    const response = await api.get("/myorders");
    return response.data;
};

export const getOrderByIdAPI = async (id) => {
    const response = await api.get(`/details/${id}`);
    return response.data;
};

export const cancelOrderAPI = async (id) => {
    const response = await api.put(`/cancel/${id}`);
    return response.data;
};

// Seller routes
export const getSellerOrdersAPI = async () => {
    const response = await api.get("/seller/orders");
    return response.data;
};

export const updateOrderStatusAPI = async (id, status) => {
    const response = await api.put(`/seller/orders/${id}/status`, { status });
    return response.data;
};
