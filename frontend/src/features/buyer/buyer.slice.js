import {createSlice} from '@reduxjs/toolkit'

export const buyerSlice=createSlice({
    name:'buyer',
    initialState:{
        allProducts:[],
        singleProduct:null,
        cart:[],
        isLoading:false,
        error:null,
        
    },  
    reducers:{
        setAllProducts:(state,action)=>{
            state.allProducts=action.payload;
        },
        setSingleProduct:(state,action)=>{
            state.singleProduct=action.payload;
        },
        setCart:(state,action)=>{
            state.cart=action.payload;
        },
        setLoading:(state,action)=>{
            state.isLoading=action.payload;
        },
        setError:(state,action)=>{
            state.error=action.payload;
        }
    }
})
export const {setAllProducts,setSingleProduct,setCart,setLoading,setError}=buyerSlice.actions
export default buyerSlice.reducer