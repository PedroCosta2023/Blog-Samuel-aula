const { check } = require("express-validator");
const User = require("../models/user")

module.exports = {
    validateEmail: check("email")
        .isEmail()
        .withMessage("Digite um email válido!")
      // .custom((value, { req }) => {
      //     if (value === "juca@email.com") {
       //       throw new Error("Email já consta no banco de dados!");
       //    }
       //    return true;
      // })
      ,
    
    validatePassword: check("password")
        .isLength({ min: 8 })
        .withMessage("A senha precisa de pelo menos 8 caracters!"),

    validateName: check("name")
        .isLength({ min: 5 })
        .withMessage("O nome precisa de pelo menos 5 caracters!")
    // .custom((name)=> {
    //     if (name ==="Samuel") {
    //         throw new Error("Usuário já consta no banco de dados!");
    //     }
    //     return true;
    //  })
    ,
    validateTitle: check("title")
        .isLength({ min: 5 })
        .withMessage("O título precisa de pelo menos 5 caracters!"),
    
    validateEmailExists: check("email")
    .isEmail()
    .custom((emailRecebido, {req})=>{
        //Acessar a base e verificar se já existe ou não este email...
       return User.findOne({email: emailRecebido}).then(user => {

        //Rejeita uma solicitação e transforma em um Erro.
        if(user)    {
            return Promise.reject("Email já existe...")
        }

        })
    })
}