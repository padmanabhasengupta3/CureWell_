const express = require("express");
const router = express.Router();
const surgeryController = require("../controllers/surgeryController");

router.get("/", surgeryController.getAllSurgeries);
router.post("/", surgeryController.addSurgery);
router.get("/today", surgeryController.getTodaySurgeries);
router.put("/:id", surgeryController.updateSurgery);

module.exports = router;