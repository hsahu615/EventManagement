import React, { useEffect } from "react";
import Navbar from "../../component/Nav/Navbar";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.state);
  }, []);
  return (
    <div>
      <div className="nav-container">
        <Navbar />
      </div>
      <div>Hello</div>
    </div>
  );
};

export default Checkout;
