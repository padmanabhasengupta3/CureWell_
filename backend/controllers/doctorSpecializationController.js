const DoctorSpec = require("../models/DoctorSpecialization");

//  assign specialization
exports.assignSpecialization = async (req, res) => {
  try {
    const { doctorId, specializationCode, specializationDate } = req.body;

    //  VALIDATION
    if (!doctorId || !specializationCode) {
      return res.status(400).json({
        message: "doctorId and specializationCode are required"
      });
    }

    //  PREVENT DUPLICATE ASSIGNMENT
    const existing = await DoctorSpec.findOne({
      doctorId,
      specializationCode
    });

    if (existing) {
      return res.status(400).json({
        message: "Specialization already assigned to this doctor"
      });
    }

    const data = new DoctorSpec({
      doctorId,
      specializationCode,
      specializationDate
    });

    await data.save();

    res.json({ message: "Assigned successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  get specializations of a doctor
exports.getDoctorSpecs = async (req, res) => {
  try {
    const { doctorId } = req.params;

    //  VALIDATION
    if (!doctorId) {
      return res.status(400).json({ message: "doctorId is required" });
    }

    const data = await DoctorSpec.find({ doctorId });

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDoctorSpec = async (req, res) => {
  try {
    const { doctorId, specializationCode } = req.body;

    await DoctorSpec.findOneAndUpdate(
      { doctorId },
      { specializationCode },
      { new: true }
    );

    res.json({ message: "Updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};