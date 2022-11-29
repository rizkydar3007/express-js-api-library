const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

app.use(cors());
const swaggerUi = require("swagger-ui-express");
const apiDocumentation = require("./apidocs.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));

const mainRoutes = require("./src/routes/index");

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", mainRoutes);

app.use((req, res, next) => {
  const error = new Error("URL yang dimasukin salah Mohon cek kembali");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
