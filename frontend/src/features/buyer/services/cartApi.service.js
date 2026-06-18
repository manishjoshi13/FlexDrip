import axios from 'axios'

let api = axios.create({
    baseURL: "/api/cart",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})

export const getMyCartAPI = async () => {
    const response = await api.get("/")
    return response.data
}

export const addCartItemAPI = async (cartItem) => {
    const response = await api.post("/add", cartItem)
    return response.data
}

export const removeCartItemAPI = async (cartItem) => {
    // Axios delete requires body to be sent inside { data } option block
    const response = await api.delete("/remove", { data: cartItem })
    return response.data
}

export const clearCartAPI = async () => {
    const response = await api.delete("/clear")
    return response.data
}