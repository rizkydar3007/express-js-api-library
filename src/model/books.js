const Sequelize = require("sequelize");
const db = require("../config/mysql");

var books = db.define(
  "books",
  {
    code_book: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

books.removeAttribute("id");
module.exports = books;
