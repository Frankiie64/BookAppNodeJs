const Sequelize = require("sequelize");

const sequelize = new Sequelize("bookapp02", "root", "123456", {
  dialect: "mysql",
  host: "localhost",
  port: 3306,
});

module.exports = sequelize;
