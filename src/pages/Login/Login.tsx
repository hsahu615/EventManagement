import { useState } from "react";
import Navbar from "../../component/Nav/Navbar";
import "./Login.css";
import { login } from "../../service/AuthService";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../states/useAuth";

const Login = () => {
  const { setAuth }: any = useAuth();
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleFormChange = (e: any) => {
    setLoginForm((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    try {
      const res: any = await login(loginForm);
      if (res.status == 200) {
        toast.success(`Logged In`, {
          theme: "dark",
          pauseOnHover: false,
        });
        const roles = res.data.roles.map((role: any) => role.authority);
        const username = res.data.username;
        localStorage.setItem("username", username);
        localStorage.setItem("roles", roles);
        setAuth({ username, roles });
        navigate(from, { replace: true });
      }
    } catch (e: any) {
      if (e.response.status == 401) {
        toast.error(e.response.data, {
          theme: "dark",
          pauseOnHover: false,
        });
      } else {
        toast.error("Something went wrong", {
          theme: "dark",
          pauseOnHover: false,
        });
      }
    }
  };

  return (
    <div>
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="login-container row justify-content-between align-items-center">
        <div className="col-6 row d-flex justify-content-center align-items-center">
          <div className="border col-6 rounded ">
            <form action="#" className="p-4" onSubmit={submitForm}>
              <h2 className="text-center mb-4 fw-bold">Log In</h2>
              <input
                className="form-control ps-1 my-3 form-inputs"
                placeholder="Username"
                name="username"
                value={loginForm.username}
                onChange={handleFormChange}
                type="text"
              />
              <input
                className="form-control ps-1 my-3 form-inputs"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleFormChange}
              />
              <button
                type="submit"
                className="login-button my-3 form-control form-buttons"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
        <div className="col-6 p-0 login-right-bg-container h-100">
          <img
            src={require("../../assets/images/login-bg.jpg")}
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
