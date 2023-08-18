const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  idFilm:{
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  poster_url: {
    type: String,
    required: true,
  },
  age_rating: {
    type: Number,
    required: true,
  },
  ticket_price: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: true,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

export default mongoose.model("Movie", movieSchema);
