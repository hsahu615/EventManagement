import React, { useEffect, useState } from "react";
import Navbar from "../../component/Nav/Navbar";
import "./BookEvent.css";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent } from "../../service/CommonService";

const BookEvent = () => {
  const { eventId }: any = useParams();
  const [event, setEvent] = useState<any>({});
  const [seats, setSeats] = useState<any>({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState<any>([]);

  useEffect(() => {
    const getEventById = async (eventId: any) => {
      const res: any = await getEvent(eventId);
      setSeats(seatSort(res.data.seats));
      console.log(res.data);
      setEvent(res.data);
    };
    getEventById(eventId);
  }, []);

  const seatSort = (seats: any) => {
    seats.sort((a: any, b: any) => {
      const charPartA = a.seatNumber.match(/[A-Za-z]+/)[0];
      const charPartB = b.seatNumber.match(/[A-Za-z]+/)[0];

      if (charPartA < charPartB) {
        return -1;
      }
      if (charPartA > charPartB) {
        return 1;
      }
      const numPartA = parseInt(a.seatNumber.match(/\d+/)[0], 10);
      const numPartB = parseInt(b.seatNumber.match(/\d+/)[0], 10);

      return numPartA - numPartB;
    });

    let groupedSeats: any = {};
    seats.forEach((seat: any) => {
      if (groupedSeats[seat.seatNumber.split("")[0]]) {
        seat.seatSelected = false;
        groupedSeats[seat.seatNumber.split("")[0]].push(seat);
      } else {
        seat.seatSelected = false;
        groupedSeats[seat.seatNumber.split("")[0]] = [seat];
      }
    });
    return groupedSeats;
  };

  const selectSeat = (clickedSeat: any, key: any) => {
    clickedSeat.seatSelected = !clickedSeat.seatSelected;
    setSeats((prevSeats: any) => ({
      ...prevSeats,
      [key]: prevSeats[key].map((seat: any) =>
        seat.seatId === clickedSeat.seatId
          ? { ...seat, seatSelected: clickedSeat.seatSelected }
          : seat
      ),
    }));
    if (clickedSeat.seatSelected) {
      setSelectedSeats([...selectedSeats, clickedSeat]);
      setTotalPrice(totalPrice + clickedSeat.price);
    } else {
      let tempSeats = selectedSeats;
      tempSeats = tempSeats.filter(
        (tempSeat: any) => tempSeat.seatId !== clickedSeat.seatId
      );
      setSelectedSeats(tempSeats);
      setTotalPrice(totalPrice - clickedSeat.price);
    }
  };

  return (
    <div>
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="theatre-container mt-5">
        <div className="row justify-content-between">
          <div className="col-4">
            <div className="mt-4 p-5">
              <div className="ticket-phone border">
                <h3 className="text-end text-white bg-dark px-1">TICKET</h3>
                <div className="row">
                  <div className="col-7 ticket-event-name">
                    <h4 className="m-0 ticket-event-name">{event.eventName}</h4>
                    <br />
                    <p className="m-0">THEATER:1</p>
                    <p className="m-0">
                      SEAT:{" "}
                      {selectedSeats.map((seat: any) => seat.seatNumber + ", ")}
                    </p>
                  </div>
                  <div className="col-5">
                    <div className="row h-100 align-items-bottom flex-direction-column justify-content-between">
                      <p className="text-end">
                        {event?.eventDate?.split("T")[0]}
                      </p>
                      <div>
                        <p className="text-end m-0">Price:</p>
                        <h5 className="m-0 text-end">Rs. {totalPrice}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 d-flex justify-content-between">
                <div className="d-flex flex-column align-items-center">
                  <div className={"theatre-seat seat-available"}></div>
                  <p className="text-center"> Available</p>
                </div>
                <div className="align-items-center">
                  <div className={"theatre-seat seat-booked"}></div>
                  <p className="text-center"> Booked</p>
                </div>
                <div className="align-items-center">
                  <div className={"theatre-seat seat-selected"}></div>
                  <p className="text-center"> Selected</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-7">
            <div className="row justify-content-end">
              <div className="col-12 theatre-screen text-center">Screen</div>
            </div>
            <div className="row justify-content-end">
              {Object.keys(seats).map((key) =>
                key == "C" || key == "F" ? (
                  <div className="col-12 mt-4">
                    {key == "C" ? (
                      <p className="text-center">{`${seats[key][0].seatType} (Rs.${seats[key][0].price})`}</p>
                    ) : (
                      <p className="text-center">{`${seats[key][0].seatType} (Rs.${seats[key][0].price})`}</p>
                    )}
                    <div className="row justify-content-center">
                      <div className="col-3 seat-column">
                        <span
                          className={
                            "theatre-seat " +
                            (seats[key][0].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][0].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][0], key)}
                        >
                          {seats[key][0].seatNumber}
                        </span>
                        <span
                          className={
                            "theatre-seat " +
                            (seats[key][1].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][1].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][1], key)}
                        >
                          {seats[key][1].seatNumber}
                        </span>
                      </div>
                      <div className="col-4 seat-column">
                        <div
                          className={
                            "theatre-seat " +
                            (seats[key][2].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][2].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][2], key)}
                        >
                          {seats[key][2].seatNumber}
                        </div>
                        <div
                          className={
                            "theatre-seat " +
                            (seats[key][3].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][3].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][3], key)}
                        >
                          {seats[key][3].seatNumber}
                        </div>
                        <div
                          className={
                            "theatre-seat " +
                            (seats[key][4].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][4].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][4], key)}
                        >
                          {seats[key][4].seatNumber}
                        </div>
                        <div
                          className={
                            "theatre-seat " +
                            (seats[key][5].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][5].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][5], key)}
                        >
                          {seats[key][5].seatNumber}
                        </div>
                      </div>
                      <div className="col-3 seat-column">
                        <span
                          className={
                            "theatre-seat " +
                            (seats[key][6].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][6].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][6], key)}
                        >
                          {seats[key][6].seatNumber}
                        </span>
                        <span
                          className={
                            "theatre-seat " +
                            (seats[key][7].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][7].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][7], key)}
                        >
                          {seats[key][7].seatNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="col-12">
                    {key == "A" ? (
                      <p className="text-center">{`${seats[key][0].seatType} (Rs.${seats[key][0].price})`}</p>
                    ) : (
                      ""
                    )}
                    <div className="row justify-content-center">
                      <div className="col-3 seat-column">
                        <span
                          className={
                            "theatre-seat " +
                            (seats[key][0].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][0].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][0], key)}
                        >
                          {seats[key][0].seatNumber}
                        </span>
                        <span
                          className={
                            "theatre-seat " +
                            (seats[key][1].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][1].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][1], key)}
                        >
                          {seats[key][1].seatNumber}
                        </span>
                      </div>
                      <div className="col-4 seat-column">
                        <div
                          className={
                            "theatre-seat " +
                            (seats[key][2].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][2].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][2], key)}
                        >
                          {seats[key][2].seatNumber}
                        </div>
                        <div
                          className={
                            "theatre-seat " +
                            (seats[key][3].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][3].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][3], key)}
                        >
                          {seats[key][3].seatNumber}
                        </div>
                        <div
                          className={
                            "theatre-seat " +
                            (seats[key][4].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][4].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][4], key)}
                        >
                          {seats[key][4].seatNumber}
                        </div>
                        <div
                          className={
                            "theatre-seat " +
                            (seats[key][5].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][5].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][5], key)}
                        >
                          {seats[key][5].seatNumber}
                        </div>
                      </div>
                      <div className="col-3 seat-column">
                        <span
                          className={
                            "theatre-seat " +
                            (seats[key][6].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][6].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][6], key)}
                        >
                          {seats[key][6].seatNumber}
                        </span>
                        <span
                          className={
                            "theatre-seat " +
                            (seats[key][7].status == "booked"
                              ? "seat-booked "
                              : "seat-available ") +
                            (seats[key][7].seatSelected ? "seat-selected " : "")
                          }
                          onClick={() => selectSeat(seats[key][7], key)}
                        >
                          {seats[key][7].seatNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookEvent;
