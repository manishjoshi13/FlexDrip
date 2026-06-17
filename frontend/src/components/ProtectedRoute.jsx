import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/hooks/useAuth";


const ProtectedRoute = ({ children,role='buyer'}) => {
  const { user, isLoading } = useAuth();


  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-black">
        Loading...
      </div>
    );
  }
  if(role && user.role !==role && role=='seller'){
    return <Navigate to="/" replace />;
  }
  if(role && user.role !==role && role=='buyer'){
    return <Navigate to="/seller" replace />;
  }


  if (!user && !isLoading) return <Navigate to="/login" replace />;

  return children;
};
export default ProtectedRoute;