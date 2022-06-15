import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";

//db and authenticate user
import connectDB from "./db/connect.js";

//routers
import authRoute from "./routes/authRoutes.js";
import jobsRoute from "./routes/jobsRoute.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

app.use(express.json());

//routes
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", jobsRoute);
app.use("/", (req, res) => {
  res.send("Hello World");
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
