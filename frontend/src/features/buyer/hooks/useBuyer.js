import { useDispatch, useSelector } from "react-redux"
import { setError, setLoading, setSingleProduct, setAllProducts } from "../buyer.slice"
import { getAllProductsAPI, getSingleProductAPI } from "../services/api.service"
export const useBuyer=()=>{
    const dispatch=useDispatch()
    const { allProducts,singleProduct, error, isLoading,cart } =useSelector((state)=>state.buyer)
    const viewProduct=async(id)=>{
        dispatch(setLoading(true))
        try {
            const response=await getSingleProductAPI(id)
            if(response?.success){
                dispatch(setSingleProduct(response.product))
            }
        } catch (error) {
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }
    const fetchProducts = async () => {
        dispatch(setLoading(true));
        try {
            const response = await getAllProductsAPI();
            if (response?.success) {
                dispatch(setAllProducts(response.products));
            }
        } catch (error) {
            dispatch(setError(error.message));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return { fetchProducts, viewProduct, allProducts, singleProduct, error, isLoading, cart };
}