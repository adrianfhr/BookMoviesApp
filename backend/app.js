import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
import cors from "cors";

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
      `mongodb+srv://user:${process.env.MONGODB_PASSWORD}@cluster0.3vhi5xq.mongodb.net/`,
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
