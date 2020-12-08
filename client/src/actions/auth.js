import axios from "axios";
import {
  SUCESSO_REGISTRO_USUARIO,
  FALHA_REGISTRO_USUARIO,
  USUARIO_LOGADO,
  ERRO_AUTENTICACAO,
  SUCESSO_LOGIN,
  FALHA_LOGIN,
  LOGOUT,
} from "./types";

import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

export const carregarUsuario = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USUARIO_LOGADO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ERRO_AUTENTICACAO,
    });
  }
};

export const login = (matricula, senha) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ matricula, senha });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: SUCESSO_LOGIN,
      payload: res.data,
    });

    dispatch(carregarUsuario());
  } catch (err) {
    const erros = err.response.data.errors;

    if (erros) {
      erros.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: FALHA_LOGIN,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
