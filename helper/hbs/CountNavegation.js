const Categoria = require("../../models/Categoria");
const Autor = require("../../models/Autor");
const Editorial = require("../../models/Editorial");
const Libro = require("../../models/Libro");
const libro = require("../../models/Libro");


const countRegister = async  (modelo, idPropiedad) =>  {

  let contador;
    if(modelo == 'categoria'){
        Libro.findAll({ include: [{ model: Editorial }, { model: Autor },{model:Categoria }],where : {CategoryId:idPropiedad} })
    .then((result) => {
      const libro = result.map((result) => result.dataValues);
      
        return libro.lenght;
    })
    .catch((err) => {
      console.log(err);
    });
    }

    if(modelo === "autor"){
    contador =  Libro.findAll({ include: [{ model: Editorial }, { model: Autor },{model:Categoria }],where : {authorId:idPropiedad} })
    .then((result) => {
      const libro = result.map((result) => result.dataValues);      
      contador = libro.length;
    })
    .catch((err) => {
      console.log(err);
    });
    }

    if(modelo == 'editorial'){
    contador = Libro.findAll({ include: [{ model: Editorial }, { model: Autor },{model:Categoria }],where : {EditorialId:idPropiedad} })
    .then((result) => {
      const libro = result.map((result) => result.dataValues);      
        return libro.lenght;
    })
    .catch((err) => {
      console.log(err);
    });

    }

    
    return ;
}

exports.CountNavModels = countRegister;