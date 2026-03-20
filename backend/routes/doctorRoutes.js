const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");

router.get("/", doctorController.getDoctors);
router.post("/", doctorController.addDoctor);
router.put("/:id", doctorController.updateDoctor);
router.delete("/:id", doctorController.deleteDoctor);
router.get("/full", doctorController.getDoctorsFull);
router.get("/:id", doctorController.getDoctorById);
module.exports = router;