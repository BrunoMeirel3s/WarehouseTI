import {
  SUCESSO_REGISTRO_USUARIO,
  FALHA_REGISTRO_USUARIO,
} from "../actions/types";
const estadosIniciais = {
  usuario: null,
  sucessoRegistroUsuario: null,
};

export default function (state = estadosIniciais, action) {
  const { type, payload } = action;

  switch (type) {
    case SUCESSO_REGISTRO_USUARIO:
      return {
        ...state,
        usuario: payload,
        sucessoRegistroUsuario: true,
      };
    case FALHA_REGISTRO_USUARIO:
      return {
        ...state,
        usuario: null,
        sucessoRegistroUsuario: false,
      };
    default:
      return state;
  }
}
