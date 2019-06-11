const express = require("express");
const routes = new express.Router();

routes.get("/", (req, res) => {
  return res.send("ola");
});

module.exports = routes;
