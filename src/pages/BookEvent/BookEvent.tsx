import Navbar from "../../component/Nav/Navbar";
import Button from "../../component/Button/Button";
import "./BookEvent.css";

const BookEvent = () => {
  return (
    <div>
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="event-list-container p-3">
        <h1 className="text-center mb-4 mt-5 text-decoration-underline">
          Live Events
        </h1>
        <div className="card-grid px-4">
          <div className="card event-card">
            <img
              className="card-img-top img-fluid"
              src={require("../../assets/images/hero-image1.jpg")}
            />
            <div className="card-body">
              <h3>Spider Man</h3>
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
                ex harum maiores quas impedit temporibus, possimus nam soluta
                praesentium, aut voluptate
              </p>
              <Button type="dark" text="Book Now" />
            </div>
          </div>
          <div className="card event-card">
            <img
              className="card-img-top img-fluid"
              src={require("../../assets/images/hero-image1.jpg")}
            />
            <div className="card-body">
              <h3>Spider Man</h3>
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
                ex harum maiores quas impedit temporibus, possimus nam soluta
                praesentium, aut voluptate
              </p>
              <Button type="dark" text="Book Now" />
            </div>
          </div>
          <div className="card event-card">
            <img
              className="card-img-top img-fluid"
              src={require("../../assets/images/hero-image1.jpg")}
            />
            <div className="card-body">
              <h3>Spider Man</h3>
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
                ex harum maiores quas impedit temporibus, possimus nam soluta
                praesentium, aut voluptate
              </p>
              <Button type="dark" text="Book Now" />
            </div>
          </div>
          <div className="card event-card">
            <img
              className="card-img-top img-fluid"
              src={require("../../assets/images/hero-image1.jpg")}
            />
            <div className="card-body">
              <h3>Spider Man</h3>
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
                ex harum maiores quas impedit temporibus, possimus nam soluta
                praesentium, aut voluptate
              </p>
              <Button type="dark" text="Book Now" />
            </div>
          </div>
          <div className="card event-card">
            <img
              className="card-img-top img-fluid"
              src={require("../../assets/images/hero-image1.jpg")}
            />
            <div className="card-body">
              <h3>Spider Man</h3>
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis
                ex harum maiores quas impedit temporibus, possimus nam soluta
                praesentium, aut voluptate
              </p>
              <Button type="dark" text="Book Now" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookEvent;
