/**
 * Models are used for especify the schema that we're going to use in our database
 * mongoose is used for build the schema, this way we can especify the
 * type of our attributes and if they're required, unique or things like that
 */
const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  ativo: {
    type: Boolean,
    required: true,
  },
  administrador: {
    type: Boolean,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Usuario = mongoose.model("usuario", UsuarioSchema);
