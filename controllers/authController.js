const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUpUser = async (req, res, next) => {
  const errors = validationResult(req);
  //Mudar esta validação para um captar no app
  //use, em todas as requisições!
  if (!errors.isEmpty()) {
    //Criei um objeto do tipo ERROR e adicionei (com os nomes que escolhi)
    //mais duas propriedades: data e statusCode
    const error = new Error("Falha de validação");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { name, email, password, confirmpassword } = req.body;
  //A senha está sendo salva em formato texto!!!
  //um problema!! Salvar ela criptografada!

  if (password !== confirmpassword) {
    return res.status(422).json({ msg: "As senhas não conferem!" });
  }

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    return res.status(422).json({ msg: "Email já está em uso!" });
  }

  bcrypt.hash(password, 12).then((passHashed) => {
    //Add este post ao DB
    const user = new User({
      email: email,
      name: name,
      password: passHashed,
    });

    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User criado com sucesso!!",
          result: result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Error ao salvar o user...",
          result: error,
        });
      });
  });
};
exports.signInUser = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  //Buscar user na base de dados com o email enviado
  const user = await User.findOne({ email: email })

    .then((user) => {
      //user é o que ele retorna
      //validar que email não existe na base
      if (!user) {
        return Promise.reject("Falha de validação");
        //error.statusCode = 422;
        //throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((passIsEqual) => {
      if (!passIsEqual) {
        return res.json({ message: "Senha inválida..." });
      }

      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: User.id,
        },
        secret
      );

      return res
        .status(200)
        .json({ message: "Usuário logado com sucesso!", token });
    })
    .catch((error) => {
      console.log(error);
    });
};
