const Doctor = require("../models/Doctor");
const DoctorSpec = require("../models/DoctorSpecialization");
const Specialization = require("../models/Specialization");
const Surgery = require("../models/Surgery");


// GET all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD doctor
exports.addDoctor = async (req, res) => {
  try {
    const { name } = req.body;

    //  Validation
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Doctor name is required" });
    }

    const doctor = new Doctor({ name });
    await doctor.save();

    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE doctor
exports.updateDoctor = async (req, res) => {
  try {
    const { name } = req.body;

    //  Validation
    if (name && name.trim() === "") {
      return res.status(400).json({ message: "Name cannot be empty" });
    }

    await Doctor.findByIdAndUpdate(req.params.id, req.body);

    res.json({ message: "Doctor updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE doctor
exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDoctorsFull = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    const result = await Promise.all(
      doctors.map(async (doc) => {

        // get specialization
        const spec = await DoctorSpec.findOne({
          doctorId: doc._id
        });

        let specializationName = "N/A";

        if (spec) {
          const specData = await Specialization.findOne({
            code: spec.specializationCode
          });

          if (specData) {
            specializationName = specData.name;
          }
        }

        // check surgery
        const surgery = await Surgery.findOne({
          doctorId: doc._id
        });

        return {
          _id: doc._id,
          name: doc.name,
          specialization: specializationName,
          hasSurgery: !!surgery
        };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};