import React from "react";
import Navbar from "../../component/Nav/Navbar";
import Hero from "../../component/Hero/Hero";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="hero-container">
        <Hero />
      </div>
    </div>
  );
};

export default Home;
