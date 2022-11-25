const Libro = require("../models/Libro");
const Categoria = require("../models/Categoria");
const Autor = require("../models/Autor");
const Editorial = require("../models/Editorial");

exports.getIndex = (req, res, next) => {
    Categoria.findAll()
        .then((result) => {
            const categoria = result.map((result) => result.dataValues);
            Libro.findAll({ include: [{ model: Categoria }, { model: Autor }, { model: Editorial }] })
                .then((result) => {
                    const libro = result.map((result) => result.dataValues);
                    res.render("Home/Index", {
                        pageTitle: "Home",
                        module: "Home",
                        hasLibro: libro.length > 0,
                        libro: libro,
                        categoria: categoria,
                        hasCategoria: categoria.length > 0
                    });
                }).catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}
exports.findIndexPost = (req, res, next) => {

    const libroTitle = req.body.Title;
    const categoriaIdS = req.body.categoryId;    

    Categoria.findAll()
        .then((result) => {
            const categoria = result.map((result) => result.dataValues);

            if ((libroTitle == null || libroTitle == undefined || libroTitle == '') && (categoriaIdS == undefined)) {
                Libro.findAll({ include: [{ model: Categoria }, { model: Autor }, { model: Editorial }] })
                    .then((result) => {
                        const libro = result.map((result) => result.dataValues);
                        res.render("Home/Index", {
                            pageTitle: "Home",
                            module: "Home",
                            hasLibro: libro.length > 0,
                            libro: libro,
                            categoria: categoria,
                            hasCategoria: categoria.length > 0
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
            } else if(!(libroTitle == null || libroTitle == undefined || libroTitle == '') && (categoriaIdS != undefined)){
                Libro.findAll({ include: [{ model: Categoria }, { model: Autor }, { model: Editorial }], where :{title:libroTitle,CategoryId : categoriaIdS} })
                .then((result) => {
                    const libro = result.map((result) => result.dataValues);
                    res.render("Home/Index", {
                        pageTitle: "Home",
                        module: "Home",
                        hasLibro: libro.length > 0,
                        libro: libro,
                        categoria: categoria,
                        hasCategoria: categoria.length > 0
                    });
                }).catch((err) => {
                    console.log(err);
                });
            } else if(!(libroTitle == null || libroTitle == undefined || libroTitle == '')){
                Libro.findAll({ include: [{ model: Categoria }, { model: Autor }, { model: Editorial }], where :{title:libroTitle} })
                .then((result) => {
                    const libro = result.map((result) => result.dataValues);
                    res.render("Home/Index", {
                        pageTitle: "Home",
                        module: "Home",
                        hasLibro: libro.length > 0,
                        libro: libro,
                        categoria: categoria,
                        hasCategoria: categoria.length > 0
                    });
                }).catch((err) => {
                    console.log(err);
                });
            } else if(categoriaIdS != undefined){       
                Libro.findAll({ include: [{ model: Categoria }, { model: Autor }, { model: Editorial }], where :{CategoryId : categoriaIdS} })
                .then((result) => {
                    const libro = result.map((result) => result.dataValues);
                    res.render("Home/Index", {
                        pageTitle: "Home",
                        module: "Home",
                        hasLibro: libro.length > 0,
                        libro: libro,
                        categoria: categoria,
                        hasCategoria: categoria.length > 0
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }            
        }).catch((err) => {
            console.log(err);
        });
};

exports.getDetails = (req, res, next) => {
    const view = req.query.view;
    const libroId = req.params.idLibro;

    if (!view) {
        return res.redirect("/libro");
    }

    Libro.findOne({ where: { id: libroId },include: [{ model: Categoria }, { model: Autor }, { model: Editorial }]  })
      .then((result) => {
        const libro = result.dataValues;
  
        if (!libro) {
          return res.redirect("/libro");
        }

        res.render("Home/details", {
            pageTitle: "Detalle",
            module: "Home",  
            libro: libro,
        });
      })
      .catch((err) => {
        console.log(err);
      });    
};