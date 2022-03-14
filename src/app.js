const express = require("express");

const userController = require("./controller/users.controller");

const app = express();

app.use(express.json());

app.use("/user", userController);

module.exports = app;
