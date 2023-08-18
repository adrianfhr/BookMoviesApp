const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user-routes.js");
const adminRouter = require("./routes/admin-routes.js");
const movieRouter = require("./routes/movie-routes.js");
const bookingsRouter = require("./routes/booking-routes.js");
const cors = require("cors");
mongoose.set('strictQuery', true);

dotenv.config();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

(async () => {
  try {
    console.log("Starting MongoDB connection...");
    await mongoose.connect(
      `mongodb+srv://user:${process.env.MONGODB_PASSWORD}@cluster0.3vhi5xq.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log("Connected to MongoDB");

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
})();
