const express = require('express');
const router =  express.Router();

const homeController = require("../Controllers/homeController");

router.get("/",homeController.getIndex);
router.post("/",homeController.findIndexPost);
router.get("/details/:idLibro",homeController.getDetails);

module.exports = router;