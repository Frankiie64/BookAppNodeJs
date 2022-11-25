const Categoria = require("../models/Categoria");
const Libro = require("../models/Libro");

exports.getIndex = (req,res,next) => {

    Categoria.findAll({include:[{model:Libro}]})
    .then((result) => {
      const categoria = result.map((result) => result.dataValues);
      res.render("Categoria/Index",{
        pageTitle: "Categoria",
        module: "Categoria",
        hasCategoria: categoria.length > 0,
        categoria : categoria
    });
    })
    .catch((err) => {
      console.log(err);
    });    
};

exports.createCategoriaGet = (req,res,next) => {
    res.render("Categoria/saveCategoria",{
        pageTitle: "Categoria",
        module: "Categoria",       
    });
}

exports.createCategoriaPost = (req,res,next)=>{
    const categoriaVM = {
        name:req.body.Name,
        description:req.body.Description
    };

    Categoria.create({
        name: categoriaVM.name, description: categoriaVM.description
    }).then((result)=> {
        res.redirect("/categoria");
    })
    .catch((err)=>{
        console.log(err);
    })

    
};

exports.editCategoriaGet = (req, res, next) => {
    const edit = req.query.edit;    
    const categoriaId = req.params.idCategoria;
  
    if (!edit) {
      return res.redirect("/categoria");
    }
  
    Categoria.findOne({ where: { id: categoriaId } })
      .then((result) => {
        const categoria = result.dataValues;
  
        if (!categoria) {
          return res.redirect("/categoria");
        }

        res.render("Categoria/saveCategoria", {
            pageTitle: "Editar Categoria",
            module: "Categoria",  
            editMode: true,
            categoria: categoria,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
exports.editCategoriaPost = (req, res, next) => {
    const categoriaName = req.body.Name;  
    const categoriaDesc = req.body.Description;  
    const categoriaId = req.body.Id;

    Categoria.update(
      { name: categoriaName, description:categoriaDesc },
      { where: { id: categoriaId } }
    )
      .then((result) => {
        return res.redirect("/categoria");
      })
      .catch((err) => {
        console.log(err);
      });
}

exports.deleteCategoriaGet = (req, res, next) => {
    const deleteParams = req.query.delete;
    const categoriaId = req.params.idCategoria;
  
    if (!deleteParams) {
      return res.redirect("/categoria");
    }
  
    Categoria.findOne({ where: { id: categoriaId } })
      .then((result) => {
        const categoria = result.dataValues;
  
        if (!categoria) {
          return res.redirect("/categoria");
        }

        res.render("Categoria/deleteCategoria", {
            pageTitle: "Eliminar Categoria",
            module: "Categoria",  
            categoria: categoria,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

exports.deleteCategoriaPost = (req, res, next) => {
    const categoriaId = req.body.Id;
  
    Categoria.destroy({ where: { id: categoriaId } })
      .then((result) => {
        return res.redirect("/categoria");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  