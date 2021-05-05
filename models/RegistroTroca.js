const mongoose = require("mongoose");
const RegistroTrocaSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  codigoToner: {
    type: String,
    required: true,
  },
  corToner: {
    type: String,
    required: true,
  },
  patrimonio: {
    type: String,
    required: true,
  },
  localizacao: {
    type: String,
    required: true,
  },
  modeloImpressora: {
    type: String,
    required: true,
  },
  enderecoIp: {
    type: String,
  },
  totalA3: {
    type: String,
    required: true,
  },
  totalA4: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = RegistroTroca = mongoose.model(
  "registroTroca",
  RegistroTrocaSchema
);
