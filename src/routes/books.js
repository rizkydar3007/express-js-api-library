const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.post("/borrow", controller.books.borrowBook);
router.delete("/return", controller.books.returnBook);
router.post("/input/", controller.books.inputBook);
router.get("/check-booking", controller.books.checkBooking);
router.get("/list", controller.books.listAllBook);
router.get("/check", controller.books.checkBook);

module.exports = router;
