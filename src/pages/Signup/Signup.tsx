import { useState } from "react";
import Navbar from "../../component/Nav/Navbar";
import "./Signup.css";
import { signUp } from "../../service/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    confirmPassword: "",
  });
  const [haveError, setHaveError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleFormChange = (e: any) => {
    setHaveError(false);
    setSignupForm((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const res: any = await signUp(signupForm);
      if (res.status == 200) {
        toast.success(`Signed Up`, {
          theme: "dark",
          pauseOnHover: false,
        });
        navigate("/");
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

  const validateForm = () => {
    if (signupForm.confirmPassword !== signupForm.password) {
      setHaveError(true);
      setErrorMessage("Password & Confirm password did not match");
      return false;
    }
    if (
      signupForm.name.trim() === "" ||
      signupForm.password.trim() === "" ||
      signupForm.phone.trim() === "" ||
      signupForm.confirmPassword.trim() === "" ||
      signupForm.name.trim() === ""
    ) {
      setHaveError(true);
      setErrorMessage("Please fill out all the fields");
      return false;
    }
    return true;
  };

  return (
    <div>
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="login-container row justify-content-between align-items-center">
        <div className="col-6 row d-flex justify-content-center align-items-center">
          <div className="border col-8 rounded ">
            <form action="#" className="p-4" onSubmit={submitForm}>
              <h2 className="text-center mb-4 fw-bold">Sign Up</h2>
              <input
                className="form-control ps-1 my-3 form-inputs"
                placeholder="Name"
                name="name"
                onChange={handleFormChange}
                type="text"
              />
              <input
                className="form-control ps-1 my-3 form-inputs"
                placeholder="Email"
                name="email"
                type="email"
                onChange={handleFormChange}
              />
              <input
                className="form-control ps-1 my-3 form-inputs"
                placeholder="Phone"
                name="phone"
                type="text"
                onChange={handleFormChange}
              />
              <input
                className="form-control ps-1 my-3 form-inputs"
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleFormChange}
              />
              <input
                className="form-control ps-1 my-3 form-inputs"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                onChange={handleFormChange}
              />
              {haveError ? (
                <small className="text-danger p-0">{errorMessage}</small>
              ) : (
                ""
              )}
              <button
                type="submit"
                className="login-button my-3 form-control form-buttons"
              >
                Sign Up
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

export default Signup;
