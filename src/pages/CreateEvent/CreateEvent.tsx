import React, { useState } from "react";
import Navbar from "../../component/Nav/Navbar";
import "./CreateEvent.css";
import Button from "../../component/Button/Button";
import { createEvent } from "../../service/CommonService";
import { toast } from "react-toastify";

const CreateEvent = () => {
  const [eventForm, setEventForm] = useState<any>({
    eventName: "",
    location: "",
    eventDate: "",
    description: "",
  });
  const [todayDate, setTodayDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleChange = (e: any) => {
    setEventForm((curr: any) => ({ ...curr, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      eventForm.eventName === "" ||
      eventForm.eventDate === "" ||
      eventForm.location === "" ||
      eventForm.description === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const res = await createEvent(eventForm);
      if (res.status === 200) {
        toast.success("Event created successfully");
        handleReset();
      }
    } catch (e) {
      toast.error("Something went wrong", {
        position: "bottom-center",
      });
    }
  };

  const handleReset = (e?: any) => {
    setEventForm((curr: any) => {
      for (const key in curr) {
        curr[key] = "";
      }
      return curr;
    });
    setEventForm((curr: any) => ({ ...curr, ["eventName"]: "" }));
  };

  return (
    <div>
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="row justify-content-center align-items-center create-event-form">
        <form
          action="#"
          onSubmit={handleSubmit}
          onReset={handleReset}
          className="col-6"
        >
          <div className="row flex-direction-column form-controls">
            <label>Event Name</label>
            <input
              name="eventName"
              type="text"
              value={eventForm.name}
              onChange={handleChange}
            />
          </div>
          <div className="row flex-direction-column form-controls">
            <label>Location</label>
            <input
              name="location"
              type="text"
              value={eventForm.location}
              onChange={handleChange}
            />
          </div>
          <div className="row flex-direction-column form-controls">
            <label>Event Date</label>
            <input
              name="eventDate"
              type="date"
              value={eventForm.eventDate}
              onChange={handleChange}
              min={todayDate}
            />
          </div>
          <div className="row flex-direction-column form-controls">
            <label>Description</label>
            <textarea
              name="description"
              value={eventForm.description}
              rows={3}
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <button
              type="submit"
              className="col-6 ps-0 bg-transparent border-0 pe-2"
            >
              <Button
                type="dark"
                text="Submit"
                class="rounded w-100"
                submitBtn="true"
              />
            </button>
            <button
              type="reset"
              className="col-6 pe-0 bg-transparent border-0 ps-2"
            >
              <Button type="light" text="Reset" class="rounded w-100" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
