const mongoose = require("mongoose");

const surgerySchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  surgeryDate: Date,
  startTime: Number,
  endTime: Number,
  category: String
});

module.exports = mongoose.model("Surgery", surgerySchema);