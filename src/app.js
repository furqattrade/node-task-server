const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const api = require("./routes/api");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/error.controller");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
// app.use(helmet());


app.use("/api/v1", api);
app.all("*", (req, res, next) => {
  next(new AppError("Cant find this path", 404));
});


app.use(globalErrorHandler);
module.exports = app;
