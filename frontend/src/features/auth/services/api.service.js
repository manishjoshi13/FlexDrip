import axios from "axios";
let api = axios.create({
    baseURL:"/api",
    withCredentials:true
});

export const loginAPI = async (data) => {
        
        let response=await api.post("/auth/login",data);
        console.log(response.data)
        return response.data;
    
}
export const registerAPI = async (data) => {
   
    let response=await api.post("/auth/register",data);

    return response.data;
}
export const logoutAPI = async () => {
    let response=await api.post("/auth/logout");
    return response.data;
}
export const getMeAPI = async () => {
    let response=await api.get("/auth/get-me");
    return response.data;
}

export const updateProfileAPI = async (data) => {
    let response = await api.put("/auth/update-profile", data);
    return response.data;
}
