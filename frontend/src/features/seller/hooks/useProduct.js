import { setLoading, setError, setMyProducts } from "../seller.slice";
import { createProductAPI, getMyProductsAPI, getProductByIdAPI, updateProductAPI, deleteProductAPI } from "../services/api.service";
import { useSelector, useDispatch } from "react-redux";

export const useProduct = () => {
    const dispatch = useDispatch();
    const { isLoading, error, myProducts } = useSelector((state) => state.seller);

    const createProduct = async (data) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const response = await createProductAPI(data);
            const newProduct = response?.product;
            if (newProduct) {
                const currentProducts = Array.isArray(myProducts) ? myProducts : [];
                dispatch(setMyProducts([...currentProducts, newProduct]));
            }
            return { success: true, product: newProduct };
        } catch (err) {
            const errMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.message || err.message || "Failed to create product";
            dispatch(setError(errMsg));
            return { success: false, error: errMsg };
        } finally {
            dispatch(setLoading(false));
        }
    };
    
    const getMyProducts = async () => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const response = await getMyProductsAPI();
            const productsList = response?.products || response?.myProducts || [];
            dispatch(setMyProducts(productsList));
        } catch (err) {
            const errMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.message || err.message || "Failed to fetch products";
            dispatch(setError(errMsg));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const getProductById = async (id) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const response = await getProductByIdAPI(id);
            return { success: true, product: response?.product };
        } catch (err) {
            const errMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.message || err.message || "Failed to fetch product details";
            dispatch(setError(errMsg));
            return { success: false, error: errMsg };
        } finally {
            dispatch(setLoading(false));
        }
    };

    const updateProduct = async (id, data) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            const response = await updateProductAPI(id, data);
            const updatedProduct = response?.product;
            if (updatedProduct) {
                const currentProducts = Array.isArray(myProducts) ? myProducts : [];
                dispatch(setMyProducts(currentProducts.map(p => (p._id === id || p.id === id) ? updatedProduct : p)));
            }
            return { success: true, product: updatedProduct };
        } catch (err) {
            const errMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.message || err.message || "Failed to update product";
            dispatch(setError(errMsg));
            return { success: false, error: errMsg };
        } finally {
            dispatch(setLoading(false));
        }
    };

    const deleteProduct = async (id) => {
        dispatch(setLoading(true));
        dispatch(setError(null));
        try {
            await deleteProductAPI(id);
            const currentProducts = Array.isArray(myProducts) ? myProducts : [];
            dispatch(setMyProducts(currentProducts.filter(p => p._id !== id && p.id !== id)));
            return { success: true };
        } catch (err) {
            const errMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.message || err.message || "Failed to delete product";
            dispatch(setError(errMsg));
            return { success: false, error: errMsg };
        } finally {
            dispatch(setLoading(false));
        }
    };

    return {
        isLoading,
        error,
        myProducts,
        createProduct,
        getMyProducts,
        getProductById,
        updateProduct,
        deleteProduct
    };
};

    