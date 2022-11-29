const express = require("express");
const router = express.Router();
const booksRouter = require("./books");
const membersRouter = require("./members");

router.use("/books", booksRouter);
router.use("/members", membersRouter);

module.exports = router;
