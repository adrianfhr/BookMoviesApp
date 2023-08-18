import React, { useEffect, useState } from "react";
import { getMovieDetails } from "../../api/api-helper";

const Ticket = ({ booking }) => {
    const [movie, setMovie] = useState(
        {
            title: "",
            duration: 0,
            price: 0,
            description: "",
            poster_url: "",
        }
    );
    const onResMovieReceived = (data) => {
        setMovie(data.movie);
        };

    useEffect (() => {
        getMovieDetails(booking.movie).then(onResMovieReceived).catch((err) => console.log(err));
      });
  return (
    <div className="rounded-md  overflow-hidden mb-2">
    <div className="px-6 p-4 flex items-center">
      <img src={movie.poster_url} alt="" className="h-full max-h-32 mr-4" />
      <div>
        <div className="font-bold text-xl mb-2">{movie.title}</div>
        <p className="text-gray-700 text-base">
          Seat: {booking.seatNumber.join(", ")}
        </p>
        <p className="text-gray-700 text-base">
          Total Price: {booking.price}
        </p>
       
      </div>
    </div>
  </div>
  
  );
};

export default Ticket;
