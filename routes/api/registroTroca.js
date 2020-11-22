const express = rquire("express");
const router = express.Router()
const auth = require("../../middleware/auth")
const {check, validationResult} = require("express-validator/check")
const RegistroTroca = require("../../models/RegistroTroca")
const Impressora = require("../../models/Impressora")

// @route  POST api/registrotroca
// @desc   Insert a register of toner change
// @access Private
router.post("/", [auth, [
    check("codigoToner", "Informe o código do toner").not().isEmpty(),
    check("corToner", "Informe a cor do toner").not().isEmpty(),
    check("patrimonio", "Informe o patrimonio do equipamento").not().isEmpty(),
    check("localizacao", "Informe a localização do equipamento").not().isEmpty(),
    check("modeloImpressora", "Informe o modelo do equipamento").not().isEmpty(),
    check("totalA3", "Informe o total de páginas impressas em A3"),
    check("totalA4", "Informe o total de ")
]])