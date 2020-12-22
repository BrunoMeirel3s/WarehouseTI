const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); //responsible for encrypt the user password
const jwt = require("jsonwebtoken"); //responsible for regenerate the token that will be verified
const config = require("config"); //responsible for call variables for other documents

//this require is used for validate the information that the user sent via frontEnd
const { check, validationResult } = require("express-validator/check");

//the instance from the model User that can be used for call de database methods such as save()
const Usuario = require("../../models/Usuario");
const auth = require("../../middleware/auth");

router.put("/", auth, async (req, res) => {
  const { nome, matricula, senha, ativo, administrador } = req.body;

  const camposUsuario = {};

  if (nome) camposUsuario.nome = nome;
  if (matricula) camposUsuario.matricula = matricula;
  if (senha) {
    const salt = await bcrypt.genSalt(10);
    camposUsuario.senha = await bcrypt.hash(senha, salt);
  }
  if (ativo) camposUsuario.ativo = ativo;
  if (administrador) camposUsuario.administrador = administrador;

  try {
    let usuario = await Usuario.findOne({ matricula });
    if (usuario) {
      usuario = await Usuario.findOneAndUpdate(
        { matricula: req.body.matricula },
        { $set: camposUsuario },
        { new: true }
      );
      return res.json(usuario);
    } else {
      return res.send("Usuário não encontrado");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
// @route  POST api/users
// @desc   Register user
// @access Public
/**
 * Here we're using the function check that was desctrutured from 'express-validator/check'
 * that is used for validate if the user sent the correct information, inside the function
 * we've the attribute 'name' for example and the message 'Name is required', it will be checked
 * using the functions not plus isEmpty
 */
router.post(
  "/",
  [
    check("ativo", "Informe se o colaborador está ativo").not().isEmpty(),
    check("nome", "Insira o nome do colaborador").not().isEmpty(),
    check("matricula", "Insira a matrícula do colaborador").not().isEmpty(),
    check("senha", "Insira uma senha com mais de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //const erros receive the results of the validations above
    const erros = validationResult(req);
    //if the const erros is not empty it means that we've erros so we'll send a message for the user
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }

    //here we're destructuring name, email and password from req.body
    const { nome, matricula, senha, ativo, administrador } = req.body;

    try {
      //See if the user exists
      let usuario = await Usuario.findOne({ matricula }); //search for the user in our database
      if (usuario) {
        //if the email already exists in our db we're going to send the msg bellow for the user
        return res
          .status(400)
          .json({ erros: [{ msg: "Usuário já cadastrado" }] });
      }

      //create the instance of the model Usuário, having all the attributes we want to send to our db
      usuario = new Usuario({
        nome,
        matricula,
        ativo,
        senha,
        administrador,
      });

      //Encrypt password
      //salt is used to determine the hardness of our encrypt method
      const salt = await bcrypt.genSalt(10);

      //user.password is encrypted using the method hash()
      usuario.senha = await bcrypt.hash(senha, salt);

      //save the instance user in our database using the method save() inherited from mongoose
      await usuario.save();

      //return jsonwebtoken
      /**
       * payload is the data that will be encrypted and transformed
       * in our token, so we're using the user.id as the information
       * of validation
       */

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

router.get("/", async (req, res) => {
  try {
    let usuarios = await Usuario.find();
    if (usuarios) {
      return res.json(usuarios);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
