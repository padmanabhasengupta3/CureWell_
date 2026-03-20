const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("API is running ");
});

const doctorRoutes = require("./routes/doctorRoutes");
app.use("/api/doctors", doctorRoutes);

const specializationRoutes = require("./routes/specializationRoutes");
app.use("/api/specializations", specializationRoutes);

const surgeryRoutes = require("./routes/surgeryRoutes");
app.use("/api/surgeries", surgeryRoutes);

const doctorSpecRoutes = require("./routes/doctorSpecializationRoutes");
app.use("/api/doctor-specialization", doctorSpecRoutes);

// connect DB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

