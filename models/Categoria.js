const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const categoria = sequelize.define("Category", {
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
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },   
});

module.exports = categoria;