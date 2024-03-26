const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.listarUsers = async (req, res, next) => {
      return res
        .status(200)
        .json({ message: "Usuário logado com sucesso!"});
};
