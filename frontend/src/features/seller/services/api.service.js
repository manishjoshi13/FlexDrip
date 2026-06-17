import axios from 'axios'

let api=axios.create({
    baseURL:"/api/product",
    withCredentials:true
})

export const createProductAPI = async (data) => {
    let response=await api.post("/create",data);
    return response.data;
}
export const getMyProductsAPI = async () => {
    let response=await api.get("/myproducts");
    return response.data;
}
export const getProductByIdAPI = async (id) => {
    let response=await api.get(`/details/${id}`);
    return response.data;
}
export const updateProductAPI = async (id, data) => {
    let response=await api.put(`/update/${id}`, data);
    return response.data;
}
export const deleteProductAPI = async (id) => {
    let response=await api.delete(`/delete/${id}`);
    return response.data;
}