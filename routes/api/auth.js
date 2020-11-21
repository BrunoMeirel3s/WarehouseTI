const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth"); //our method to verifie if the user has a valid token
const Usuario = require("../../models/Usuario"); //The model that establish the connection with our database
const config = require("config"); //responsible for call variables for other documents
const { check, validationResult } = require("express-validator/check"); //this require is used for validate the information that the user sent via frontEnd
const jwt = require("jsonwebtoken"); //responsible for regenerate the token that will be verified
const bcrypt = require("bcryptjs"); //responsible for encrypt the user password

// @route  GET api/auth
// @desc   Test Route
// @access Public
/**
 * Pay atention that we're passing auth as a parametrer to our router function, this way
 * it will check if the user has a valid token before he can be able to access the route
 */
router.get("/", auth, async (req, res) => {
  /**
   * The try bellow is used to find in our database the user that was sent as a parameter by the middleware auth
   * in the comand select() we're removing the password, this way we won't show the password in the frontend
   * when the comand res.json() sent the information
   */
  try {
    const usuario = await Usuario.findById(req.user.id).select("-senha");
    res.json(user); //sending the object user as the response for '/' route
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/auth
// @desc   Authenticate user & get Token
// @access Public
router.post(
  "/",
  [
    check("matricula", "Insira sua matrícula").exists(),
    check("senha", "Insira sua senha").exists(),
  ],
  async (req, res) => {
    //const erros receive the results of the validations above
    const erros = validationResult(req);
    //if the const erros is not empty it means that we've erros so we'll send a message for the user
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    //here we're destructuring email and password from req.body that is the value sent from the frontEnd
    const { matricula, senha } = req.body;

    try {
      //See if the user exists
      let usuario = await Usuario.findOne({ matricula }); //search for the email in our database
      if (!usuario) {
        //if the email is not defined in our database
        return res
          .status(400)
          .json({ erros: [{ msg: "Credenciais inválidas" }] });
      }

      if (usuario.ativo !== true) {
        return res.status(400).json({ erros: [{ msg: "Usuário inativo" }] });
      }
      /**
       * isMatch receive the comparison result of 'senha' that is the value
       * detructured from req.body and the value 'usuario.senha' that is the password
       * of the object user that we take from out database
       */
      const isMatch = await bcrypt.compare(senha, usuario.senha);

      //here we're checking if isMatch is false which means that password is incorrect
      if (!isMatch) {
        //if the password doesn't match
        return res
          .status(400)
          .json({ erros: [{ msg: "Credenciais inválidas" }] });
      }

      //Bellow we have the generation token process again, and the user will receive his token after a valid login

      const payload = {
        usuario: {
          id: usuario.id,
        },
      };

      //jwt.sign is the function that create the token
      jwt.sign(
        //payload is the data that will be transformed in token
        payload,
        //here we have the password that will be used for encrypt the data and generate the token
        config.get("jwtSecret"),
        //the token validation time
        { expiresIn: 360000 },

        /**
         * The callback bellow will cope with the error if the token generation process fail
         * or it will send the token as a response if everything is ok
         */
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
