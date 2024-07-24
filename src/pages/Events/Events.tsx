import Navbar from "../../component/Nav/Navbar";
import Button from "../../component/Button/Button";
import "./Events.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCalendar } from "@fortawesome/fontawesome-free-regular";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getAllEvents } from "../../service/CommonService";
import { formatDate } from "../../constant/Util";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState<any[]>([]);
  useEffect(() => {
    const getEvents = async () => {
      try {
        const allEvents: any = await getAllEvents();
        setEvents(allEvents.data);
        console.log(allEvents.data);
      } catch (e) {
        console.log(e);
      }
    };
    getEvents();
  }, []);
  return (
    <div>
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="event-list-container p-3">
        <h1 className="text-center mb-4 mt-5 bg-dark text-white">
          LIVE EVENTS
        </h1>
        <div className="card-grid px-4">
          {events.map((event) => (
            <div className="card event-card">
              <img
                className="card-img-top img-fluid"
                src={require("../../assets/images/hero-image1.jpg")}
              />
              <div className="card-body">
                <h4 title={event.eventName} className="event-name">
                  {event.eventName}
                </h4>
                <p className="text-end my-2">
                  <FontAwesomeIcon
                    icon={faCalendar as IconProp}
                    className="mx-2"
                  />
                  {formatDate(event.eventDate)}
                </p>
                <p className="card-text event-description">
                  {event.description}
                </p>
              </div>
              <div className="card-footer bg-transparent border-0 d-flex align-items-center justify-content-between">
                <Link to={"/book-event/" + event.eventId}>
                  <Button type="dark" text="Book Now" />
                </Link>
                <p className="m-0">
                  <FontAwesomeIcon
                    icon={faLocationDot as IconProp}
                    className="mx-2"
                  />
                  {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Events;
