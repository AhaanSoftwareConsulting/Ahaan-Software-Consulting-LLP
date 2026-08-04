const express = require("express");
const router = express.Router();

const { createTest, getAllTest } = require("../controllers/testController");

router.post("/", createTest);

router.get("/", getAllTest);

module.exports = router;
