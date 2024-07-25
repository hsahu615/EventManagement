import React, { useContext } from "react";
import AuthContext from "../component/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
