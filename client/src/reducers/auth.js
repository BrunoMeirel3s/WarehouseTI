import {
  SUCESSO_REGISTRO_USUARIO,
  FALHA_REGISTRO_USUARIO,
  USUARIO_LOGADO,
  ERRO_AUTENTICACAO,
  SUCESSO_LOGIN,
  FALHA_LOGIN,
  LOGOUT,
} from "../actions/types";

const estadosIniciais = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  usuario: null,
};

export default function (state = estadosIniciais, action) {
  const { type, payload } = action;

  switch (type) {
    case USUARIO_LOGADO:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        usuario: payload,
      };
    case SUCESSO_LOGIN:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
      };
    case FALHA_LOGIN:
    case ERRO_AUTENTICACAO:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default:
      return state;
  }
}
