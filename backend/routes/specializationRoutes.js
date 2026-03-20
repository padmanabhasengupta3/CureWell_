const express = require("express");
const router = express.Router();
const specController = require("../controllers/specializationController");

router.get("/", specController.getSpecializations);
router.post("/", specController.addSpecialization); // optional
router.get("/full", specController.getSpecializationsFull);
module.exports = router;