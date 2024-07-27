import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { singOut } from "../../service/AuthService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../states/useAuth";
import { ROLE_ADMIN } from "../../constant/Constant";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const { auth, setAuth }: any = useAuth();

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
        Cookies.remove("username");
        Cookies.remove("roles");
        // localStorage.removeItem("username");
        // localStorage.removeItem("roles");
        setAuth({});
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
          {/* <h1 className="bg-dark text-white px-2">EVENTIFY</h1> */}
          <img
            src={require("../../assets/images/logo.jpg")}
            className="logo-img"
          />
        </Link>
      </div>
      <div>
        <ul className="nav-controls d-flex list-decoration-none align-items-center m-0">
          <li className="nav-links">Upcoming Events</li>
          <li className="nav-links">
            <Link
              className="text-decoration-none text-dark"
              to={"/live-events"}
            >
              Live Events
            </Link>
          </li>
          <li className="nav-links">My Bookings</li>
          <li
            className="dropdown-link nav-links"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            More Options
            <FontAwesomeIcon
              icon={faCaretDown}
              className="mx-2"
              style={{ transform: showDropdown ? "rotate(180deg)" : "" }}
            />
            {showDropdown ? (
              <div
                className="nav-dropdown"
                onMouseLeave={() => setShowDropdown(false)}
              >
                <ul className="p-0">
                  {auth?.roles?.includes(ROLE_ADMIN) ? (
                    <Link
                      className="text-decoration-none text-dark"
                      to={"/create-event"}
                    >
                      <li className="w-100 link-inside-dropdown">
                        Create Event
                      </li>
                    </Link>
                  ) : (
                    ""
                  )}
                  <li className="w-100 link-inside-dropdown">Profile</li>
                </ul>
              </div>
            ) : (
              ""
            )}
          </li>
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
              <li className="bg-none">
                <Link to={"/signup"}>
                  <Button type="dark" text="Sign up" />
                </Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
