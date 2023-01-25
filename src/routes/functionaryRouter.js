const express = require("express");
const router = express.Router();

const functionaryController = require("../controllers/functionaryController");

router.get("/all", functionaryController.all);

router.post("/add", functionaryController.add);


module.exports = router;