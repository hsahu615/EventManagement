package com.eventmanagement.server.utility;

import com.eventmanagement.server.entity.Event;
import com.eventmanagement.server.entity.Seat;

import java.util.ArrayList;
import java.util.List;

public class Util {
    public static List<Seat> creteSeats(Event event) {
        List<Seat> seats = new ArrayList<>();
        String[] seatTypes = {"premium", "lounge", "recliner"};

        for (char row = 'A'; row <= 'F'; row++) {
            for (int num = 1; num <= 5; num++) {
                String seatType = seatTypes[(row - 'A') / 2];
                String seatNumber = row + String.valueOf(num);
                Seat tempSeat = new Seat();
                tempSeat.setSeatNumber(seatNumber);
                tempSeat.setSeatType(seatType);
                tempSeat.setStatus("available");
                tempSeat.setEvent(event);
                seats.add(tempSeat);
            }
        }
        return seats;
    }
}
