const Sequelize = require("sequelize");
const db = require("../config/mysql");

var detailBookings = db.define(
  "detail_bookings",
  {
    code_detail_bookings: {
      type: Sequelize.STRING,
    },
    code_booking: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
    },
    code_book: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    book_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    code_member: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    qty: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    end_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

detailBookings.removeAttribute("id");
module.exports = detailBookings;
