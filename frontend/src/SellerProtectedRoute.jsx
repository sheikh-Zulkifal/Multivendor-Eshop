import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller, seller } = useSelector((state) => state.seller);
  if (isLoading === false) {
    if (!isSeller) {
      return <Navigate to="/" replace />; 
      //{`/shop-login`}
    }
    return children;
  }
};

export default SellerProtectedRoute;