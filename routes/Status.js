const express = require('express');
const router =  express.Router();

const statusController = require("../controllers/statusController");

router.use("/",statusController.notFoundView);

module.exports = router;

