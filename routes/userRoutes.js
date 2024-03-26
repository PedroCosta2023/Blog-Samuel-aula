const express = require("express");
const router = express.Router();

const { listarUsers } = require("../controllers/userController");
const { eAdmin } = require("../services/auth");

router.get("/profile", eAdmin, listarUsers);

module.exports = router;
