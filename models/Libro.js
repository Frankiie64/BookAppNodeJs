const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const libro = sequelize.define("book", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  anio: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },  
  ImageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
  },    
});

module.exports = libro;