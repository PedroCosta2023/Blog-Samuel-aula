const jwt = require("jsonwebtoken");

module.exports = {
  eAdmin: async function (req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(400).json({
        erro: true,
        messagem: "token",
      });

      const [bearer, token] = authHeader.split(" ");
      console.log(token);
    }
  },
};
