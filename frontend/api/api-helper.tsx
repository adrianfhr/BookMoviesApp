import axios from 'axios';
import axiosInstance from './axios';

export const getAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/movie");
    return response.data.movies; // Mengembalikan array movies
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const sendUserAuthRequest = async (data, signup) => {
  console.log("data pada api: ",data);
  const res = await axiosInstance
    .post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => {
      console.log(err);
    });

  const resData = await res.data;
   return resData;
  
};

export const sendAdminAuthRequest = async (data) => {
  const res = await axiosInstance
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async (id) => {
  const res = await axiosInstance
    .get(`/movie/${id}`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const newBooking = async (data) => {
  console.log("DAAATAAA", data);
  const res = await axiosInstance
    .post("/booking/", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
      price : data.price,
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log( "Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axiosInstance
    .get(`/user/bookings/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axiosInstance
    .delete(`/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getBookingById = async (id) => {
  const res = await axiosInstance
    .get(`/booking/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
}

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axiosInstance.get(`/user/${id}`).catch((err) => console.log(err));
  
  const resData = await res.data;
  return resData;
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        fetaured: data.fetaured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`/admin/${adminId}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const updateUserById = async (data) => {
  const res = await axiosInstance
    .put(`/user/${localStorage.getItem("userId")}`, {
      name: data.name,
      email: data.email,
      password: data.password,
      balance: data.balance,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
}
