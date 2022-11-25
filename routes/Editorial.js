const express = require('express');
const router =  express.Router();

const editorialController = require("../controllers/editorialController");

router.get("/editorial",editorialController.getIndex);

router.get("/editorial/crearEditorial",editorialController.createEditorialGet);
router.post("/editorial/crearEditorial",editorialController.createEditorialPost);

router.get("/editorial/editarEditorial/:idEditorial",editorialController.editEditorialGet);
router.post("/editorial/editarEditorial",editorialController.editEditorialPost);

router.get("/editorial/eliminarEditorial/:idEditorial",editorialController.deleteEditorialGet);
router.post("/editorial/eliminarEditorial",editorialController.deleteEditorialPost);


module.exports = router;