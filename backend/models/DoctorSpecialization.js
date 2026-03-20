const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor"
  },
  specializationCode: String,
  specializationDate: Date
});

module.exports = mongoose.model("DoctorSpecialization", schema);