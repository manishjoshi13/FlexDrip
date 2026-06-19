import axios from 'axios'

let api=axios.create({
    baseURL:"https://flexdrip.onrender.com/api/buyer",
    withCredentials:true
})

export const getAllProductsAPI=async()=>{
    let response=await api.get('/')
    return response.data
}
export const getSingleProductAPI=async(id)=>{
    let response=await api.get(`/${id}`)
    return response.data
}
export const getTrendingProductsAPI=async()=>{
    let response=await api.get('/trending')
    return response.data
}
export const getSimilarProductAPI=async(id)=>{
    let response=await api.get(`/${id}/similar`)
    return response.data
}

