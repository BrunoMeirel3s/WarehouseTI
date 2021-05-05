import {
  SUCESSO_REGISTRO_USUARIO,
  FALHA_REGISTRO_USUARIO,
  SUCESSO_OBTER_TODOS_USUARIOS,
  FALHA_OBTER_TODOS_USUARIOS,
} from "../actions/types";
const estadosIniciais = {
  usuarioRegistrado: null,
  sucessoRegistroUsuario: null,
  todosUsuarios: null,
  sucessoTodosUsuarios: null,
};

export default function (state = estadosIniciais, action) {
  const { type, payload } = action;

  switch (type) {
    case SUCESSO_REGISTRO_USUARIO:
      return {
        ...state,
        usuarioRegistrado: payload,
        sucessoRegistroUsuario: true,
      };
    case FALHA_REGISTRO_USUARIO:
      return {
        ...state,
        usuarioRegistrado: null,
        sucessoRegistroUsuario: false,
      };
    case SUCESSO_OBTER_TODOS_USUARIOS:
      return {
        ...state,
        todosUsuarios: payload,
        sucessoTodosUsuarios: true,
      };
    case FALHA_OBTER_TODOS_USUARIOS:
      return {
        ...state,
        todosUsuarios: null,
        sucessoTodosUsuarios: false,
      };
    default:
      return state;
  }
}
