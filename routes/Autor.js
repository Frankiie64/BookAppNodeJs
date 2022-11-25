const express = require('express');
const router =  express.Router();

const autorController = require("../controllers/autorController");

router.get("/autor",autorController.getIndex);

router.get("/autor/crearAutor",autorController.createAutorGet);
router.post("/autor/crearAutor",autorController.createAutorPost);

router.get("/autor/editarAutor/:idAutor",autorController.editAutorGet);
router.post("/autor/editarAutor",autorController.editAutorPost);

router.get("/autor/eliminarAutor/:idAutor",autorController.deleteAutorGet);
router.post("/autor/eliminarAutor",autorController.deleteAutorPost);


module.exports = router;