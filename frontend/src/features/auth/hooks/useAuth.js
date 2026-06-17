import { useDispatch } from "react-redux";
import { loginAPI, registerAPI, logoutAPI, getMeAPI,  } from "../services/api.service";
import { setLoading, setError, setUser } from "../auth.slice";
import { useSelector } from 'react-redux'

export const useAuth = () => {
    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector((state) => state.auth);

    const login = async (data) => {
        dispatch(setError(null));
        dispatch(setLoading(true));
        try {
            const response = await loginAPI(data);
            console.log(response)
            if (response?.success) {
                dispatch(setUser(response.user));
            } else {
                dispatch(setError(response.message));
            }
        } catch (error) {
            const errorMsg = error.response?.data?.errors?.[0]?.message || error.response?.data?.message || error.message;
            dispatch(setError(errorMsg));
        } finally {
            dispatch(setLoading(false));
        }
    }

    const register = async (data) => {
        dispatch(setError(null));
        dispatch(setLoading(true));
        try {
            const response = await registerAPI(data);
            dispatch(setUser(response.user));

        } catch (error) {
            const errorMsg = error.response?.data?.errors?.[0]?.message || error.response?.data?.message || error.message;
            dispatch(setError(errorMsg));
        } finally {
            dispatch(setLoading(false));
        }
    }
    const logout = async () => {
        dispatch(setError(null));
        dispatch(setLoading(true));
        try {
            const response = await logoutAPI();
            if (response?.success) {
                dispatch(setUser(null));
            } else {
                dispatch(setError(response.message));
            }
        } catch (error) {
            const errorMsg = error.response?.data?.errors?.[0]?.message || error.response?.data?.message || error.message;
            dispatch(setError(errorMsg));
        } finally {
            dispatch(setLoading(false));
        }
    }
    const getMe = async () => {
        dispatch(setError(null));
        dispatch(setLoading(true));
        try {
            const response = await getMeAPI();
            if (response?.success) {
                dispatch(setUser(response.user));
            } else {
                dispatch(setError(response.message));
            }
        } catch (error) {
            const errorMsg = error.response?.data?.errors?.[0]?.message || error.response?.data?.message || error.message;

        } finally {
            dispatch(setLoading(false));
        }
    }
   

    return {
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        getMe,
    }


}