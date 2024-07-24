import React from "react";
import useAuth from "./useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }: any) => {
  const { auth }: any = useAuth();
  const location = useLocation();

  return auth?.roles?.find((role: any) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : auth?.username ? (
    <Navigate to={"/"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
