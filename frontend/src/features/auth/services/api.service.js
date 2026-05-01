import axios from "axios";
let api = axios.create({
    baseURL:"http://localhost:3000/api",
    withCredentials:true
});

export const loginAPI = async (data) => {
        
        let response=await api.post("/auth/login",data);
        console.log(response)
        return response.data;
    
}
export const registerAPI = async (data) => {
   
    let response=await api.post("/auth/register",data);
  console.log(response)
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
