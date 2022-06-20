const express = require("express");
const router = express.Router();

/* XXXXXXXXXXXXXXXXXXXXXX | GET | XXXXXXXXXXXXXXXXXXXXXX*/

router.get("/", (req, res) => {
    res.send("<h1 style='color:purple'>Welcome Home Page With Express</h1>");
  });

module.exports = router;