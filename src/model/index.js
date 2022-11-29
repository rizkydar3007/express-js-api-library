const books = require("./books");
const members = require("./members");
const detailBookings = require("./detailBookings");
const model = {};

model.books = books;
model.members = members;
model.detailBookings = detailBookings;

module.exports = model;
