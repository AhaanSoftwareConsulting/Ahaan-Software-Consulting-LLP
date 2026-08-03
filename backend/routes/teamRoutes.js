const express = require("express");
const {
  createTeam,
  getTeam,
  getSingleTeam,
  updateTeam,
  deleteTeam
} = require("../controllers/teamController");

const router = express.Router();

router.post("/create", createTeam);
router.get("/all", getTeam);
router.get("/:id", getSingleTeam);
router.put("/update/:id", updateTeam);
router.delete("/delete/:id", deleteTeam);

module.exports = router;
 