const express = require("express");
const router = express.Router();

const functionaryController = require("../controllers/functionaryController");

router.get("/all", functionaryController.all);

router.post("/add", functionaryController.add);

router.post("/edit", functionaryController.edit);

router.get("/remove/:id", functionaryController.remove);


module.exports = router;