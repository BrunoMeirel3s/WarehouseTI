const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Impressora = require("../../models/Impressora");
const { check, validationResult } = require("express-validator/check");

// @route  GET api/posts
// @desc   Test Route
// @access Public
router.get("/", (req, res) => {
  res.send("Posts route");
});

// @route  GET api/posts
// @desc   Insert Printer
// @access Public
router.post(
  "/",
  [
    auth,
    [
      check("patrimonio", "Insira o patrimônio do equipamento").not().isEmpty(),
      check("localizacao", "Insira a localizacao do equipamento")
        .not()
        .isEmpty(),
      check("modelo", "Insira o modelo do equipamento").not().isEmpty,
    ],
  ],
  async (req, res) => {
    console.log('chegou até aqui 2')
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }
    

    const { patrimonio, localizacao, modelo, enderecoIp } = req.body;

    const camposImpressora = {};
    if (patrimonio) camposImpressora.patrimonio = patrimonio;
    if (localizacao) camposImpressora.localizacao = localizacao;
    if (modelo) camposImpressora.modelo = modelo;
    if (enderecoIp) camposImpressora.enderecoIp = enderecoIp;

    try {
      let impressora = Impressora.findOne({ patrimonio: req.body.patrimonio });
      if (impressora) {
        impressora = await Impressora.findOneAndUpdate(
          { patrimonio: req.body.patrimonio },
          { $set: camposImpressora },
          { new: true }
        );
        return res.json(impressora);
      }

      impressora = new Impressora(camposImpressora);
      await impressora.save();
      res.json(impressora);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
