const express = require('express');
const router =  express.Router();

const libroController = require("../controllers/libroController");

router.get("/libro",libroController.getIndex);

router.get("/libro/crearLibro",libroController.createLibroGet);
router.post("/libro/crearLibro",libroController.createLibroPost);

router.get("/libro/editarLibro/:idLibro",libroController.editLibroGet);
router.post("/libro/editarLibro",libroController.editLibroPost);

router.get("/libro/eliminarLibro/:idLibro",libroController.deleteLibroGet);
router.post("/libro/eliminarLibro",libroController.deleteLibroPost);


module.exports = router;