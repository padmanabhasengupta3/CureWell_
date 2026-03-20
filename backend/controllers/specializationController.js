const Specialization = require("../models/Specialization");
const DoctorSpec = require("../models/DoctorSpecialization");
const Doctor = require("../models/Doctor");

//  GET all specializations
exports.getSpecializations = async (req, res) => {
  try {
    const data = await Specialization.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  ADD specialization
exports.addSpecialization = async (req, res) => {
  try {
    const { code, name } = req.body;

    if (!code || !name) {
      return res.status(400).json({ message: "Code and Name are required" });
    }

    if (code.trim() === "" || name.trim() === "") {
      return res.status(400).json({ message: "Fields cannot be empty" });
    }

    const existing = await Specialization.findOne({ code });

    if (existing) {
      return res.status(400).json({
        message: "Specialization code already exists"
      });
    }

    const newSpec = new Specialization({ code, name });

    await newSpec.save();

    res.json({ message: "Specialization added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get Specialization
exports.getSpecializationsFull = async (req, res) => {
  try {
    const specs = await Specialization.find();

    const result = await Promise.all(
      specs.map(async (spec) => {
        const mappings = await DoctorSpec.find({
          specializationCode: spec.code
        });

        const doctors = await Promise.all(
          mappings.map(async (m) => {
            const doc = await Doctor.findById(m.doctorId);
            return doc ? doc.name : null;
          })
        );

        return {
          code: spec.code,
          name: spec.name,
          doctors: doctors.filter(Boolean)
        };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};