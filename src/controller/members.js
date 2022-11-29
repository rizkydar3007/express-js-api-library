const model = require("../model/index");
const controller = {};

controller.createMember = async (req, res) => {
  try {
    const member = await model.members.create({
      code: req.body.code,
      name: req.body.name,
    });
    res.json({
      status: 200,
      message: "Berhasil Membuat Member !",
      data: member,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};
controller.checkMember = async (req, res) => {
  try {
    const member = await model.members.findAll({
      attributes: ["code_member", "name", "total_booking", "code_booking"],
    });
    res.json({
      status: 200,
      message: "Berhasil Mendapatkan List Member",
      data: member,
    });
  } catch (error) {
    res.json({
      status: 400,
      message: error.message,
    });
  }
};

module.exports = controller;
