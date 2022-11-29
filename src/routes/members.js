const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.post("/", controller.members.createMember);
router.get("/", controller.members.checkMember);


module.exports = router;
