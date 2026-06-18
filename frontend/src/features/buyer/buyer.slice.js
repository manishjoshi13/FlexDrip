import {createSlice} from '@reduxjs/toolkit'

export const buyerSlice=createSlice({
    name:'buyer',
    initialState:{
        allProducts:[],
        singleProduct:null,
        cart:[],
        similarProducts:[],
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
        setSimilarProducts:(state,action)=>{
            state.similarProducts=action.payload;
        },
        setLoading:(state,action)=>{
            state.isLoading=action.payload;
        },
        setError:(state,action)=>{
            state.error=action.payload;
        }
    }
})
export const {setAllProducts,setSingleProduct,setCart,setSimilarProducts,setLoading,setError}=buyerSlice.actions
export default buyerSlice.reducer