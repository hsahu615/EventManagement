import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-wrapper d-flex justify-content-between align-items-center">
      <div className="logo-box">
        <h1>Eventify</h1>
      </div>
      <div>
        <ul className="nav-controls d-flex list-decoration-none align-items-center m-0">
          <li>Upcoming Events</li>
          <li>Book Event</li>
          <li>My Bookings</li>
          <li>More Options</li>
          <li>
            <Link to={"/login"}>
              <Button type="light" text="Log In" />
            </Link>
          </li>
          <li>
            <Button type="dark" text="Sign up" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
