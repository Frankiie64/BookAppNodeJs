const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const editorial = sequelize.define("editorial", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  }, 
  pais: {
    type: Sequelize.STRING,
    allowNull: false,
  },  
});

module.exports = editorial;