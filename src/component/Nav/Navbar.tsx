import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { singOut } from "../../service/AuthService";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let token = Cookies.get("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const signOut = async () => {
    try {
      const res = await singOut();
      if (res.status == 200) {
        Cookies.remove("token");
        toast.success("Logged out!");
        navigate("/login");
      }
    } catch (e: any) {
      if (e.response.status == 401) {
        toast.error("Issue in Logout");
      }
    }
  };

  return (
    <div className="navbar-wrapper d-flex justify-content-between align-items-center">
      <div className="logo-box">
        <Link to={"/"} className="text-decoration-none text-dark">
          <h1>Eventify</h1>
        </Link>
      </div>
      <div>
        <ul className="nav-controls d-flex list-decoration-none align-items-center m-0">
          <li>Upcoming Events</li>
          <li>
            <Link className="text-decoration-none text-dark" to={"/book-event"}>
              Book Event
            </Link>
          </li>
          <li>My Bookings</li>
          <li>More Options</li>
          {isLoggedIn ? (
            <li onClick={signOut}>
              <Button type="light" text="Sign Out" />
            </li>
          ) : (
            <div className="d-flex nav-controls">
              <li>
                <Link to={"/login"}>
                  <Button type="light" text="Log In" />
                </Link>
              </li>
              <li>
                <Button type="dark" text="Sign up" />
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
