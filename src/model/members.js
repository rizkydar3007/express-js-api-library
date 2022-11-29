const Sequelize = require("sequelize");
const db = require("../config/mysql");

var members = db.define(
  "members",
  {
    code_member: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    valid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    code_booking: {
      type: Sequelize.STRING,
      defaultValue: "",
    },
    total_booking: {
      type: Sequelize.INTEGER,
    },
    end_penalty: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

members.removeAttribute("id");
module.exports = members;
