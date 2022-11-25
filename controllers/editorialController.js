const Editorial = require("../models/Editorial");
const Libro = require("../models/Libro");

exports.getIndex = (req,res,next) => {

    Editorial.findAll({include:[{model:Libro}]})
    .then((result) => {
      const editorial = result.map((result) => result.dataValues);
      res.render("Editorial/Index",{
        pageTitle: "Editorial",
        module: "Editorial",
        hasEditorial: editorial.length > 0,
        editorial : editorial
    });
    })
    .catch((err) => {
      console.log(err);
    });    
};

exports.createEditorialGet = (req,res,next) => {
    res.render("Editorial/saveEditorial",{
        pageTitle: "Editorial",
        module: "Editorial",       
    });
}

exports.createEditorialPost = (req,res,next)=>{
    const editorialVM = {
        name:req.body.Name,
        phone:req.body.Phone,
        pais:req.body.Pais
    };

    Editorial.create({
        name: editorialVM.name, phone : editorialVM.phone, pais:editorialVM.pais
    }).then((result)=> {
        res.redirect("/editorial");
    })
    .catch((err)=>{
        console.log(err);
    })

    
};

exports.editEditorialGet = (req, res, next) => {
    const edit = req.query.edit;
    const editorialId = req.params.idEditorial;
  
    if (!edit) {
      return res.redirect("/editorial");
    }
  
    Editorial.findOne({ where: { id: editorialId } })
      .then((result) => {
        const editorial = result.dataValues;
  
        if (!editorial) {
          return res.redirect("/editorial");
        }

        res.render("Editorial/saveEditorial", {
            pageTitle: "Editar Editorial",
            module: "Editorial",  
            editMode: true,
            editorial: editorial,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
exports.editEditorialPost = (req, res, next) => {
    const editorialName = req.body.Name;  
    const editorialPhone = req.body.Phone;
    const editorialPais = req.body.Pais;
    const editorialId = req.body.Id;

    Editorial.update(
      { name: editorialName,phone : editorialPhone, pais: editorialPais },
      { where: { id: editorialId } }
    )
      .then((result) => {
        return res.redirect("/editorial");
      })
      .catch((err) => {
        console.log(err);
      });
}

exports.deleteEditorialGet = (req, res, next) => {
    const deleteParams = req.query.delete;
    const editorialId = req.params.idEditorial;
  
    if (!deleteParams) {
      return res.redirect("/editorial");
    }
  
    Editorial.findOne({ where: { id: editorialId } })
      .then((result) => {
        const editorial = result.dataValues;
  
        if (!editorial) {
          return res.redirect("/editorial");
        }

        res.render("Editorial/deleteEditorial", {
            pageTitle: "Eliminar Editorial",
            module: "Editorial",  
            editorial: editorial,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

exports.deleteEditorialPost = (req, res, next) => {
    const editorialId = req.body.Id;
  
    Editorial.destroy({ where: { id: editorialId } })
      .then((result) => {
        return res.redirect("/editorial");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  