const Surgery = require("../models/Surgery");

//  Get all surgeries
exports.getAllSurgeries = async (req, res) => {
  try {
    const data = await Surgery.find().populate("doctorId");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Add surgery
exports.addSurgery = async (req, res) => {
  try {
    const { doctorId, surgeryDate, startTime, endTime, category } = req.body;

    //  REQUIRED FIELD VALIDATION
    if (!doctorId || !surgeryDate || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //  TIME VALIDATION
    if (startTime == null || endTime == null) {
      return res.status(400).json({ message: "Start and end time required" });
    }

    if (startTime >= endTime) {
      return res.status(400).json({
        message: "Start time must be less than end time"
      });
    }

    const surgery = new Surgery({
      doctorId,
      surgeryDate,
      startTime,
      endTime,
      category
    });

    await surgery.save();

    res.json({ message: "Surgery added" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Get today's surgeries
exports.getTodaySurgeries = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const data = await Surgery.find({
      surgeryDate: { $gte: today, $lt: tomorrow }
    }).populate("doctorId");

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Update surgery
exports.updateSurgery = async (req, res) => {
  try {
    const { startTime, endTime } = req.body;

    //  TIME VALIDATION
    if (
      startTime != null &&
      endTime != null &&
      startTime >= endTime
    ) {
      return res.status(400).json({ message: "Invalid time" });
    }

    //  CHECK IF EXISTS
    const surgery = await Surgery.findById(req.params.id);
    if (!surgery) {
      return res.status(404).json({ message: "Surgery not found" });
    }

    const updated = await Surgery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};