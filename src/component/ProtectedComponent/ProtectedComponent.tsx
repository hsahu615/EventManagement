import Cookies from "js-cookie";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(Cookies.get("token"));
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
