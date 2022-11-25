const express = require('express');
const router =  express.Router();

const categoriaController = require("../controllers/categoriaController");

router.get("/categoria",categoriaController.getIndex);

router.get("/categoria/crearCategoria",categoriaController.createCategoriaGet);
router.post("/categoria/crearCategoria",categoriaController.createCategoriaPost);

router.get("/categoria/editarCategoria/:idCategoria",categoriaController.editCategoriaGet);
router.post("/categoria/editarCategoria",categoriaController.editCategoriaPost);

router.get("/categoria/eliminarCategoria/:idCategoria",categoriaController.deleteCategoriaGet);
router.post("/categoria/eliminarCategoria",categoriaController.deleteCategoriaPost);


module.exports = router;