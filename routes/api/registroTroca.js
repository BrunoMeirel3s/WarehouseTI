const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const RegistroTroca = require("../../models/RegistroTroca");
const Usuario = require("../../models/Usuario");

// @route  POST api/registrotroca
// @desc   Insert a register of toner change
// @access Private
router.post(
  "/",
  [
    auth,
    [
      check("codigoToner", "Informe o código do toner").not().isEmpty(),
      check("corToner", "Informe a cor do toner").not().isEmpty(),
      check("patrimonio", "Informe o patrimonio do equipamento")
        .not()
        .isEmpty(),
      check("localizacao", "Informe a localização do equipamento")
        .not()
        .isEmpty(),
      check("modeloImpressora", "Informe o modelo do equipamento")
        .not()
        .isEmpty(),
      check("totalA3", "Informe o total de páginas impressas em A3")
        .not()
        .isEmpty(),
      check("totalA4", "Informe o total de páginas impressas em A4")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    /**
     * const erros receive the validationResult response and if any error
     * be detected the if bellow will sent a error status, listening the values
     * that wasn't informed
     */
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }

    const {
      codigoToner,
      corToner,
      patrimonio,
      localizacao,
      modeloImpressora,
      totalA3,
      totalA4,
    } = req.body;

    const camposRegistro = {};
    let usuario;
    try {
      usuario = await Usuario.findById(req.usuario.id, { nome: 1 });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
    camposRegistro.usuario = usuario.nome;

    if (codigoToner) camposRegistro.codigoToner = codigoToner;
    if (corToner) camposRegistro.corToner = corToner;
    if (patrimonio) camposRegistro.patrimonio = patrimonio;
    if (localizacao) camposRegistro.localizacao = localizacao;
    if (modeloImpressora) camposRegistro.modeloImpressora = modeloImpressora;
    if (totalA3) camposRegistro.totalA3 = totalA3;
    if (totalA4) camposRegistro.totalA4 = totalA4;

    try {
      registroTroca = new RegistroTroca(camposRegistro);
      await registroTroca.save();

      return res.json(registroTroca);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route  POST api/registrotroca/relatorio
// @desc   Insert a register of toner change
// @access Private
router.post(
  "/relatorio",
  [
    check("dataInicial", "Insira a data inicial").not().isEmpty(),
    check("dataFinal", "Insira a data final").not().isEmpty(),
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erros: erros.array() });
    }
    const { dataInicial, dataFinal } = req.body;
    try {
      let relatorio = await RegistroTroca.find({
        date: {
          $gte: new Date(new Date(dataInicial).setHours(00, 00, 00)),
          $lte: new Date(new Date(dataFinal).setHours(23, 59, 59)),
        },
      });

      if (relatorio.length < 1) {
        return res.status(400).json({
          msg: "Não foram encontradas trocas durante o período informado!",
        });
      }

      if (relatorio) {
        return res.json(relatorio);
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
