import {createBrowserRouter} from "react-router-dom";
import  Register  from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

export const router = createBrowserRouter([
    {
        path:"/",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        )
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    }
])