import React, { useEffect, useState } from 'react';
import { getBookingById, getUserDetails, newBooking, updateUserById } from '../../api/api-helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Brightness1RoundedIcon from '@mui/icons-material/Brightness1Rounded';
import ConfirmDialog from '../components/confirmDialog';

interface BookingData {
  movie: string;
  seatNumber: number[];
  price: number;
  user: string | null;
}

const FilmDetail = ({ film }) => {
  const [userBalance, setUserBalance] = useState(0);
  const idUser = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [detailUser, setDetailUser] = useState({
    balance: 0,
    email: '',
    name: '',
    password: '',
  });

  const [unvailableSeats, setUnavailableSeats] = useState<number[]>([]);
  const [isUnavailable, setIsUnavailable] = useState<boolean>(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    bookingData: null,
  });

  useEffect(() => {
    if (idUser) {
      setIsLoggedIn(true);
      getUserDetails().then(onResUserReceived).catch((err) => console.log(err));
    }
  }, [film]);

  const onResUserReceived = (data) => {
    console.log('data : ', data);
    setDetailUser(data.user);
    setUserBalance(data.user.balance);
  };

  useEffect(() => {
    const bookingPromises = film.bookings.map((bookingId) => getBookingById(bookingId));
    console.log('bookingPromises : ', bookingPromises);
    console.log('film.bookings : ', film.bookings);
    Promise.all(bookingPromises)
      .then(onResBookingReceived)
      .catch((err) => console.log(err));
  }, [film]);

  const onResBookingReceived = (data) => {
    const seatNumbers = data.map((booking) => booking.booking.seatNumber);
    setUnavailableSeats(seatNumbers);
    console.log('seatNumbers : ', seatNumbers);
  };

  const [bookingData, setBookingData] = useState<BookingData>({
    movie: film._id,
    seatNumber: [],
    price: 0,
    user: isLoggedIn ? idUser : null,
  });

  const ticketPrice = film.ticket_price ? film.ticket_price.toLocaleString() : 'N/A';

  const handleSeatSelection = (seat: number) => {
    const seatNumber = [...bookingData.seatNumber];

    if (seatNumber.includes(seat) && !isUnavailable) {
      // Jika kursi telah dipilih sebelumnya dan tidak berwarna merah, batalkan pilihan
      const updatedSeats = seatNumber.filter((selectedSeat) => selectedSeat !== seat);
      const newPrice = film.ticket_price * updatedSeats.length;

      setBookingData((prevData) => ({
        ...prevData,
        seatNumber: updatedSeats,
        price: newPrice,
      }));

      setDetailUser((prevData) => ({
        ...prevData,
        balance: prevData.balance + film.ticket_price,
      }));
    } else if (seatNumber.length < 6 && !isUnavailable && !unvailableSeats.some((arr) => arr.includes(seat))) {
      // Jika kursi belum dipilih, masih ada slot tersedia, tidak berwarna merah, dan kursi yang dipilih belum dipilih sebelumnya, tambahkan pilihan
      const updatedSeats = [...seatNumber, seat];
      const newPrice = film.ticket_price * updatedSeats.length;

      setBookingData((prevData) => ({
        ...prevData,
        seatNumber: updatedSeats,
        price: newPrice,
      }));

      setDetailUser((prevData) => ({
        ...prevData,
        balance: prevData.balance - film.ticket_price,
      }));
    } else {
      console.log('Maximum seat selection reached');
    }

    setIsUnavailable(false); // Set isUnavailable kembali ke false setelah pemilihan kursi
  };

  const handleBuyTicket = () => {
    if (bookingData.seatNumber.length > 0) {
      // Periksa apakah balance mencukupi
      if (bookingData.price > userBalance) {
        toast.error('Insufficient balance. Please top up your account.');
      } else {
        setConfirmDialog({
          isOpen: true,
          bookingData: bookingData,
        });
      }
    } else {
      console.log('Please select seat(s) and date');
    }
  };

  const handleConfirmBuyTicket = () => {
    newBooking({ ...bookingData, date: '2022-04-21' })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    const { password, ...updatedUser } = detailUser;
    updateUserById(updatedUser)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    toast.success('Ticket(s) successfully booked!');
    window.location.reload();
  };

  return (
    <div className="bg-background overflow-hidden p-10">
      <div className="h-20"></div>

      <div className="p-2 bg-primary p-4 rounded-lg">
        <div className="flex items-center ">
          <img
            src={film.poster_url}
            alt={film.title}
            className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 object-cover rounded-lg shadow-md"
          />
          <div className="ml-4">
            <h1 className="sm:text-xl lg:text-2xl font-semibold">{film.title}</h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-background">{film.release_date}</p>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-background mt-2 text-justify">
              {film.description}
            </p>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <p className="text-textColor">Age Rating: {film.age_rating}+</p>
          <p className="ml-4">Ticket Price: Rp {ticketPrice}</p>
        </div>
      </div>

      {isLoggedIn && (
        <div>
          <div className="my-4 text-textColor">
            <h2>Select Seat:</h2>
            <div className="flex justify-center my-10">
              <Brightness1RoundedIcon className="bg-accent text-accent rounded-full" />
              <span className="mx-1">Seat</span>
              <Brightness1RoundedIcon className="bg-primary text-primary ml-4 rounded-full" />
              <span className="mx-1">Selected Seat</span>
              <Brightness1RoundedIcon className="bg-accent text-accent opacity-50 ml-4 rounded-full" />
              <span className="mx-1">Unavailable Seat</span>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-8 gap-2">
                {Array.from(Array(64).keys()).map((seat) => {
                  const isUnavailableSeat = unvailableSeats.some((arr) => arr.includes(seat));
                  const isSelectedSeat = bookingData.seatNumber.includes(seat);
                  let seatClass = 'bg-accent ';

                  if (isUnavailableSeat) {
                    seatClass = 'bg-accent opacity-50';
                  } else if (isSelectedSeat) {
                    seatClass = 'bg-primary text-white';
                  }

                  return (
                    <button
                      key={seat}
                      className={`p-1 lg:py-2 lg:px-4 rounded ${seatClass}`}
                      onClick={() => {
                        if (isUnavailableSeat) {
                          setIsUnavailable(true);
                        }
                        handleSeatSelection(seat);
                      }}
                    >
                      <span className="text-sm text-textColor">{seat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-center bg-primary w-[245px] mx-auto lg:w-[435px] ">
            <div className="text-textColor">Screen</div>
          </div>

          <div className='text-textColor'>Total Price: Rp {bookingData.price.toLocaleString()}</div>
          <button
            className="bg-primary hover:bg-primary hover:opacity-70 text-white font-semibold py-2 px-4 rounded mt-4"
            onClick={handleBuyTicket}
          >
            Buy Ticket
          </button>
        </div>
      )}

      <ToastContainer />

      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        title="Confirm Booking"
        subTittle="Are you sure you want to buy this ticket?"
        onConfirm={handleConfirmBuyTicket}
      />
    </div>
  );
};

export default FilmDetail;
