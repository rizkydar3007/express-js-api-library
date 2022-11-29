const books = require("./books");
const members = require("./members");
const controller = {};

controller.books = books;
controller.members = members;

module.exports = controller;
