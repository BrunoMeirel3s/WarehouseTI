const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Impressora = require("../../models/Impressora");
const { check, validationResult } = require("express-validator/check");

// @route  PUT api/inserirequipamento
// @desc   Update Printer
// @access Private
router.put("/", auth, async (req, res) => {
  const { patrimonio, modelo, localizacao, enderecoIp, disponivel } = req.body;

  const camposEquipamento = {};

  if (modelo) camposEquipamento.modelo = modelo;
  if (localizacao) camposEquipamento.localizacao = localizacao;
  if (enderecoIp) camposEquipamento.enderecoIp = enderecoIp;
  if (disponivel) camposEquipamento.disponivel = disponivel;

  try {
    let impressora = await Impressora.findOne({ patrimonio });
    if (impressora) {
      impressora = await Impressora.findOneAndUpdate(
        { patrimonio: req.body.patrimonio },
        { $set: camposEquipamento },
        { new: true }
      );
      return res.json(impressora);
    } else {
      return res.send("Equipamento não encontrado");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  POST api/inserirequipamento
// @desc   Insert Printer
// @access Private

router.post(
  "/",
  [
    auth,
    [
      check("patrimonio", "Informe o patrimônio do equipamento")
        .not()
        .isEmpty(),
      check("modelo", "Informe o modelo do equipamento").not().isEmpty(),
      check("disponivel", "Informe se o equipamento está disponível")
        .not()
        .isEmpty(),
      check("localizacao", "Informe a localização do equipamento")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }

    const {
      patrimonio,
      modelo,
      localizacao,
      enderecoIp,
      disponivel,
    } = req.body;

    const camposEquipamento = {};
    if (patrimonio) camposEquipamento.patrimonio = patrimonio;
    if (modelo) camposEquipamento.modelo = modelo;
    if (localizacao) camposEquipamento.localizacao = localizacao;
    if (enderecoIp) camposEquipamento.enderecoIp = enderecoIp;
    if (disponivel) camposEquipamento.disponivel = disponivel;

    try {
      let impressora = await Impressora.findOne({ patrimonio });
      if (impressora) {
        return res.status(400).send("Equipamento já cadastrado");
      }

      equipamento = new Impressora(camposEquipamento);
      await equipamento.save();

      return res.json(equipamento);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

router.get("/disponivel", async (req, res) => {
  try {
    let impressoras = await Impressora.find({ disponivel: true });
    if (!impressoras) {
      return res.status(400).json({ msg: "Sem Impressoras Disponíveis" });
    }
    return res.json(impressoras);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/obterimpressora", async (req, res) => {
  const { patrimonio } = req.body;
  try {
    let impressora = await Impressora.findOne({ patrimonio });
    if (!impressora) {
      return res.status(400).json({ msg: "Impressora não encontrada" });
    }
    if (impressora.disponivel !== true) {
      return res.status(400).json({ msg: "Impressora não disponível" });
    }
    return res.json(impressora);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    let impressora = await Impressora.find();
    if (impressora) {
      return res.json(impressora);
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
