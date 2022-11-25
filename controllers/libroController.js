const Libro = require("../models/Libro");
const Autor = require("../models/Autor");
const Editorial = require("../models/Editorial");
const Categoria = require("../models/Categoria");
const libro = require("../models/Libro");
const transporter = require("../services/EmailService");


exports.getIndex = (req, res, next) => {
  Libro.findAll({ include: [{ model: Editorial }, { model: Autor },{model:Categoria }] })
    .then((result) => {
      const Libro = result.map((result) => result.dataValues);
      console.log(Libro)

      res.render("Libro/Index", {
        pageTitle: "Libro",
        module: "Libro",
        hasLibro: Libro.length > 0,
        libro: Libro,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createLibroGet = (req, res, next) => {
  Editorial.findAll()
    .then((result) => {
      const editorial = result.map((result) => result.dataValues);
      Autor.findAll()
        .then((result) => {
          const autor = result.map((result) => result.dataValues);
          Categoria.findAll()
          .then((result) => {
            const categoria = result.map((result) => result.dataValues);
            
            res.render("Libro/saveLibro", {
              pageTitle: "Crear libro",
              module: "Libro",
              editorial: editorial,
              autor: autor,
              categoria:categoria,
              hasEditorial: editorial.length > 0,
              hasAutors: autor.length > 0,
              hasCategoria:categoria.length > 0
              });
            })
            .catch((err) => {
              console.log(err);
            });
            })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.createLibroPost = (req, res, next) => {
  const LibroVM = {
    title: req.body.Title,
    anio:req.body.Anio,
    ImageUrl: req.file,
    editorialId: req.body.EditorialId,
    autorId: req.body.AutorId,
    categoriaId : req.body.CategoriaId
  };

  if(!LibroVM.ImageUrl){
    res.redirect("/libro");
  }
  Libro.create({
    title: LibroVM.title,
    anio: LibroVM.anio,
    ImageUrl:`/${LibroVM.ImageUrl.path}`,
    editorialId: LibroVM.editorialId,
    authorId: LibroVM.autorId,
    CategoryId: LibroVM.categoriaId
  })
    .then((result) => {
      res.redirect("/libro");
      Autor.findOne({ where: { id: LibroVM.autorId } })
      .then((result) => {
        const autor = result.dataValues;
        return transporter.sendMail(
          {
            from: "BookApp Notificacion ",
            to: autor.email,
            subject: `Nuevo libro registrado`,
            html: `Saludos Sr. ${autor.name},<br>
            Esperemos se encuentre bien, el motivo del siguiente mensaje es paa notificarle, que sea registrado su libro ${LibroVM.title},
            en nuestra apliacion BookApp.Si desea ver nuestra aplicacion, dele clic al siguiente enlace :<br>
            <a href="http://localhost:3000/">Ver app</a>`,
          },
          (err) => {
            console.log(err);
          }
        );    
      })
      .catch((err) => {
        console.log(err);
      });     
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editLibroGet = (req, res, next) => {
  const edit = req.query.edit;
  const LibroId = req.params.idLibro;

  if (!edit) {
    return res.redirect("/libro");
  }

  Editorial.findAll()
    .then((result) => {
      const editorial = result.map((result) => result.dataValues);
      Autor.findAll()
        .then((result) => {
          const autor = result.map((result) => result.dataValues);
          Categoria.findAll()
            .then((result)=>{
              const categoria = result.map((result) => result.dataValues);
              Libro.findOne({ where: { id: LibroId } })
              .then((result) => {
                const Libro = result.dataValues;
  
                if (!Libro) {
                  return res.redirect("/libro");
                }
  
                res.render("Libro/saveLibro", {
                  pageTitle: "Editar tipo de libro",
                  module: "Libro",
                  editMode: true,
                  libro: Libro,
                  editorial: editorial,
                  autor: autor,
                  categoria:categoria,
                  hasEditorial: editorial.length > 0,
                  hasAutors: autor.length > 0,
                  hasCategoria:categoria.length > 0
                });
              })
              .catch((err) => {
                console.log(err);
              });
            })
            .catch((err)=>{
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editLibroPost = (req, res, next) => {
  const LibroVM = {
    id: req.body.Id,
    title: req.body.Title,
    anio:req.body.Anio,
    ImageUrl: req.file,
    editorialId: req.body.EditorialId,
    autorId: req.body.AutorId,
    categoriaId : req.body.CategoriaId
  };

  Libro.findOne({where:{id:LibroVM.id}})
  .then((result)=>{

    const libroFinded = result.dataValues;

    if(!libroFinded){
      return res.redirect("/libro");
    }
    const imagePath = LibroVM.ImageUrl ? `/${LibroVM.ImageUrl.path}` : libroFinded.ImageUrl; // operador ternario
    Libro.update(
      {
        title: LibroVM.title,
      anio: LibroVM.anio,
      ImageUrl: imagePath,
      editorialId: LibroVM.editorialId,
      authorId: LibroVM.autorId,
      CategoryId: LibroVM.categoriaId
      },
      { where: { id: LibroVM.id } }
    )
      .then((result) => {
        return res.redirect("/libro");
      })
      .catch((err) => {
        console.log(err);
      });

  }).catch((err) => {
    console.log(err);
  });
};

exports.deleteLibroGet = (req, res, next) => {
  const deleteParams = req.query.delete;
  const LibroId = req.params.idLibro;

  if (!deleteParams) {
    return res.redirect("/libro");
  }

  Libro.findOne({ where: { id: LibroId } })
    .then((result) => {
      const Libro = result.dataValues;

      if (!Libro) {
        return res.redirect("/libro");
      }

      res.render("Libro/deleteLibro", {
        pageTitle: "Eliminar  libro",
        module: "Libro",
        libro: Libro,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteLibroPost = (req, res, next) => {
  const LibroId = req.body.Id;

  Libro.destroy({ where: { id: LibroId } })
    .then((result) => {
      return res.redirect("/libro");
    })
    .catch((err) => {
      console.log(err);
    });
};
