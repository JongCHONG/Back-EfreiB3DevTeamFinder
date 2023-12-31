import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";


import AnnouncementRoutes from "./routes/Announcement.js";
import UserRoutes from "./routes/User.js";
import TeamRoutes from "./routes/Team.js";
import AuthRoutes from "./routes/Authentification.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
  origin : 'http://localhost:3000',
  credentials : true
}))

app.use("/users", UserRoutes);
app.use("/teams", TeamRoutes);
app.use("/auth", AuthRoutes);
app.use("/announcements", AnnouncementRoutes)

const PORT = process.env.PORT || 5000;




mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
  )
  .catch((error) => console.log(error.message));
