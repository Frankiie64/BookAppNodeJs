const Autor = require("../models/Autor");
const Libro = require("../models/Libro");

exports.getIndex = (req,res,next) => {

    Autor.findAll({include :[{model:Libro}]})
    .then((result) => {
      const autor = result.map((result) => result.dataValues);     
      res.render("Autor/Index",{
        pageTitle: "Autor",
        module: "Autor",
        hasAutor: autor.length > 0,
        autor : autor
    });
    })
    .catch((err) => {
      console.log(err);
    });    
};

exports.createAutorGet = (req,res,next) => {
    res.render("Autor/saveAutor",{
        pageTitle: "Autor",
        module: "Autor",       
    });
}

exports.createAutorPost = (req,res,next)=>{
    const autorVM = {
        name:req.body.Name,
        email:req.body.Email,
    };

    Autor.create({
        name: autorVM.name, email: autorVM.email
    }).then((result)=> {
        res.redirect("/autor");
    })
    .catch((err)=>{
        console.log(err);
    })

    
};

exports.editAutorGet = (req, res, next) => {
    const edit = req.query.edit;
    const autorId = req.params.idAutor;
  
    if (!edit) {
      return res.redirect("/autor");
    }
  
    Autor.findOne({ where: { id: autorId } })
      .then((result) => {
        const autor = result.dataValues;   
  
        if (!autor) {
          return res.redirect("/autor");
        }

        res.render("Autor/saveAutor", {
            pageTitle: "Editar Autor",
            module: "Autor",  
            editMode: true,
            autor: autor,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
exports.editAutorPost = (req, res, next) => {
    const autorName = req.body.Name; 
    const autorEmail = req.body.Email; 
    const autorId = req.body.Id;

    Autor.update(
      { name: autorName,email:autorEmail },
      { where: { id: autorId } }
    )
      .then((result) => {
        return res.redirect("/autor");
      })
      .catch((err) => {
        console.log(err);
      });
}

exports.deleteAutorGet = (req, res, next) => {
    const deleteParams = req.query.delete;
    const autorId = req.params.idAutor;
  
    if (!deleteParams) {
      return res.redirect("/autor");
    }
  
    Autor.findOne({ where: { id: autorId } })
      .then((result) => {
        const autor = result.dataValues;
  
        if (!autor) {
          return res.redirect("/autor");
        }

        res.render("Autor/deleteAutor", {
            pageTitle: "Eliminar Autor",
            module: "Autor",  
            autor: autor,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

exports.deleteAutorPost = (req, res, next) => {
    const autorId = req.body.Id;
  
    Autor.destroy({ where: { id: autorId } })
      .then((result) => {
        return res.redirect("/autor");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  