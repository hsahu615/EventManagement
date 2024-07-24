import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const username = localStorage.getItem("username");
  const roles = localStorage.getItem("roles")?.split(",");
  const [auth, setAuth] = useState({ username, roles });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
