import axios from "axios";
import Cookies from "js-cookie";

export const getAllEvents = async () => {
  const token = Cookies.get("token");
  const res = await axios.get(`http://localhost:8080/event/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getEvent = async (eventId: String) => {
  const token = Cookies.get("token");
  const res = await axios.get(`http://localhost:8080/event/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const createEvent = async (event: any) => {
  const token = Cookies.get("token");
  const res = await axios.post("http://localhost:8080/event/", event, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
