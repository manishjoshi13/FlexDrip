import {createBrowserRouter} from "react-router-dom";
import  Register  from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import ProductList from "./features/seller/pages/ProductList";
import CreateProduct from "./features/seller/pages/CreateProduct";
import EditProduct from "./features/seller/pages/EditProduct";
import ProductDetails from "./features/buyer/pages/ProductDetails";

export const router = createBrowserRouter([
    {
        path:"/",
        element: (
                <Home />
            
        )
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/register",
        element:<Register/>
    },
    {
        path: "/product/:id",
        element: <ProductDetails />
    },
    {
        path:"/seller",
        children:[
            {
                path:'',
                element:(
                <ProtectedRoute role="seller">
                    <ProductList/>
                </ProtectedRoute>
            )
        },
    {
        path:"/seller/products/new",
        element:(
            <ProtectedRoute role="seller">
                <CreateProduct/>
            </ProtectedRoute>
        )
    },
    {
        path:'/seller/products/edit/:id',
        element:(
            <ProtectedRoute role="seller">
                <EditProduct/>
            </ProtectedRoute>
        )
    }
    ]
    }
])