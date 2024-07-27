package com.eventmanagement.server.utility;

import com.eventmanagement.server.entity.Event;
import com.eventmanagement.server.entity.Seat;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Util {
    public static List<Seat> creteSeats(Event event) {
        List<Seat> seats = new ArrayList<>();
        String[] seatTypes = {"Lounge", "Lounge", "Premium", "Premium", "Premium", "Recliner", "Recliner"};
        int rows = 7;
        int seatsPerRow = 8;
        Integer[] seatPrice = {120, 150, 200};

        for (int row = 0; row < rows; row++) {
            for (int seat = 1; seat <= seatsPerRow; seat++) {
                String seatNumber = (char) ('A' + row) + Integer.toString(seat);
                String seatType = seatTypes[row];
                Seat seat1 = new Seat();
                seat1.setStatus("available");
                seat1.setSeatType(seatType);
                seat1.setSeatNumber(seatNumber);
                seat1.setEvent(event);

                if(seatTypes[row].equals("Lounge")){
                    seat1.setPrice(seatPrice[0]);
                } else if(seatTypes[row].equals("Premium")){
                    seat1.setPrice(seatPrice[1]);
                } else {
                    seat1.setPrice(seatPrice[2]);
                }

                seats.add(seat1);
            }
        }
        return seats;
    }
}
