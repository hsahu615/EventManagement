import axios from "axios";
import Cookies from "js-cookie";

export const login = async (loginForm: any) => {
  const res = await axios.post(
    `http://localhost:8080/auth/login`,
    {
      email: loginForm.username,
      password: loginForm.password,
    },
    {
      withCredentials: true,
    }
  );
  return res;
};

export const signUp = async (signUpForm: any) => {
  const res = await axios.post(`http://localhost:8080/auth/create`, {
    email: signUpForm.email,
    password: signUpForm.password,
    name: signUpForm.username,
    phone: signUpForm.phone,
    roles: [{ name: "USER" }],
  });
  return res;
};

export const singOut = async () => {
  const token = Cookies.get("token");
  const res = await axios.post(`http://localhost:8080/auth/logout`, undefined, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};
