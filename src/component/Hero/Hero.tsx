import React from "react";
import "./Hero.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-wrapper d-flex justify-content-center align-items-center">
      <div className="col-5 p-5">
        <h1 className="hero-heading fw-bold">
          Discover Exciting Events and Book Tickets
        </h1>
        <p className="hero-para">
          Welcome to our event booking platform, where you can find and book
          tickets for upcoming events. Whether it's concerts, sports matches, or
          theater shows, we have it all!
        </p>
        <div className="d-flex">
          <div className="pe-3">
            <Link to={"/live-events"}>
              <Button type="dark" text="Book" className="pe-3" />
            </Link>
          </div>
          <div className="pe-3">
            <Button type="light" text="Learn More" />
          </div>
        </div>
      </div>
      <div className="col-5 p-5">
        <img
          src={require("../../assets/images/hero-image1.jpg")}
          alt=""
          className="hero-img rounded"
        />
      </div>
    </div>
  );
};

export default Hero;
