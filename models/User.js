const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  balance: {
    type: Number,
    default: 500000, 
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
});

export default mongoose.model("User", userSchema);