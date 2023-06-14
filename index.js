import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import teamRoutes from "./routes/Team.js";
import bodyParser from "body-parser";
import AnnouncementRoutes from "./routes/Announcement.js"
import UserRoutes from "./routes/User.js"

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users" , UserRoutes)

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use("/teams/", teamRoutes);
app.use("/announcement", AnnouncementRoutes)

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));

