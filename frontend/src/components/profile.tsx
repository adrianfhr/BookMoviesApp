import React, { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WalletIcon from '@mui/icons-material/Wallet';
import { deleteBooking, getBookingById, getUserDetails, updateUserById } from "../../api/api-helper";
import Ticket from "./ticket";
import { toast } from "react-toastify";
import ConfirmDialog from "./confirmDialog";



const Profile = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    booking: null,
  });
  const showDeleteConfirmation = (booking) => {
    setDeleteConfirmation({
      isOpen: true,
      booking: booking,
    });
  };
  
  
  const idUser = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;
  const [detailUser, setDetailUser] = useState({
    balance: 0,
    email: "",
    name: "",
    password: "",
    bookings: [],
  });
  const [isBalanceUpdated, setIsBalanceUpdated] = useState(false);

  const onResUserReceived = (data) => {
    setDetailUser(data.user);
  };

  useEffect(() => {
    if (idUser) {
      getUserDetails()
        .then(onResUserReceived)
        .catch((err) => console.log(err));
    }
  }, [idUser]);

  const [booking, setBooking] = useState([
    {
      _id: "",
      movie: "",
      seatNumber: [],
      price: 0,
      user: "",
    },
  ]);

  const onResBookingReceived = (data) => {
    const bookingData = data.map((booking) => booking.booking);
    setBooking(bookingData);
  };

  useEffect(() => {
    const bookingPromises = detailUser.bookings.map((bookingId) =>
      getBookingById(bookingId)
    );
    Promise.all(bookingPromises)
      .then(onResBookingReceived)
      .catch((err) => console.log(err));
  }, [detailUser]);

  const deleteBookingHandler = (booking) => {
    showDeleteConfirmation(booking);
  };

  const handleConfirmDelete = () => {
    console.log("deleteConfirmation.booking : ",deleteConfirmation.booking);
    deleteBooking(deleteConfirmation.booking._id)
      .then((res) => {
        toast.success("Booking deleted successfully!");
  
        const updatedBalance = detailUser.balance + deleteConfirmation.booking.price;
        const  { password, ...updatedUser }= { ...detailUser, balance: updatedBalance };

        updateUserById(updatedUser)
          .then((data) => {
            if (data && data.user) {
              setDetailUser(data.user);
              setIsBalanceUpdated(true);
            } else {
              console.log("Invalid response data after user update");
              console.log(data);
            }
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  

  useEffect(() => {
    if (isBalanceUpdated) {
      setIsBalanceUpdated(false);
      window.location.reload();
    }
  }, [isBalanceUpdated]);

  return (
    <div className="bg-background p-10 ">
    <div className="h-20 bg-denary">
            
    </div>
    <div className="profile flex items-center  rounded-lg shadow-lg p-6 bg-primary m-4">
      <div className="profile-logo flex items-center justify-center rounded-full w-16 h-16">
        <AccountCircleIcon className="text-white w-20  h-20" />
      </div>
      <div className="profile-info ml-4">
        <div className="profile-name text-lg font-semibold">{detailUser.name}</div>
        <div className="profile-email text-textColor">{detailUser.email}</div>
        <div className="profile-balance flex items-center text-textColor">
          <WalletIcon className="w-4 h-4 mr-1" />
          {detailUser.balance} IDR
        </div>
      </div>
    </div>
    <div className="profile-title text-2xl font-semibold m-4 text-textColor">My Tickets</div>
    {booking.length === 0 ?  (
      <div className="text-textColor ml-4">You don't have a ticket</div> 
      ) 
     : booking.map((booking) => (
        <div key={booking._id} className="flex-row items-center justify-center bg-primary rounded-lg shadow-lg p-6 m-4">
        <Ticket
        key={booking._id}
          booking={booking}
        />
        <button onClick={() => deleteBookingHandler(booking)} className="bg-background hover:opacity-70 rounded-lg justify-center items-center ml-5">
          <div className="mx-2 text-textColor">Delete</div>
        </button>
        </div>
      )) }
    {deleteConfirmation.isOpen && (
        <ConfirmDialog
          confirmDialog={deleteConfirmation}
          setConfirmDialog={setDeleteConfirmation}
          title="Delete Booking"
          subTittle="Are you sure you want to delete this booking?"
          onConfirm={() => handleConfirmDelete()}
        />
      )}
    </div>
  );
};

export default Profile;