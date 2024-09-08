import { Navigate, Outlet } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  console.log("🚀 ~ PrivateRoute ~ isAuthenticated:", isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
