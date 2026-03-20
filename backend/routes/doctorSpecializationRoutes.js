const express = require("express");
const router = express.Router();
const controller = require("../controllers/doctorSpecializationController");
const doctorSpecController = require("../controllers/doctorSpecializationController");
router.post("/", controller.assignSpecialization);
router.get("/:doctorId", controller.getDoctorSpecs);
router.put("/", doctorSpecController.updateDoctorSpec);
module.exports = router;