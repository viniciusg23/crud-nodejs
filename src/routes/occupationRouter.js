const express = require("express");
const router = express.Router();

const occupationController = require("../controllers/occupationController");

router.get("/all", occupationController.all);

router.post("/add", occupationController.add);

router.get("/remove/:id", occupationController.remove);


module.exports = router;