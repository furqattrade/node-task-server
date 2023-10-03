const express = require("express");
const api = express.Router();

const taskRoute = require("./task.route");
const authRoute = require("./auth.route");


api.use("/auth", authRoute);
api.use("/task", taskRoute);


module.exports = api;
