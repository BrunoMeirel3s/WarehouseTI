import axios from "axios";
import {
  SUCESSO_REGISTRO_USUARIO,
  FALHA_REGISTRO_USUARIO,
  SUCESSO_OBTER_TODOS_USUARIOS,
  FALHA_OBTER_TODOS_USUARIOS,
} from "./types";
import { setAlert } from "./alert";

export const inserirUsuario = (
  nome,
  matricula,
  senha,
  ativo,
  administrador
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ nome, matricula, senha, ativo, administrador });
  try {
    const res = await axios.post("api/usuario", body, config);
    dispatch({
      type: SUCESSO_REGISTRO_USUARIO,
      payload: res.data,
    });
    dispatch(setAlert("Usuário registrado com sucesso!", "success"));
  } catch (err) {
    const erros = err.response.data.errors;
    if (erros) {
      erros.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      //dispatch(setAlert(err.response.data, "danger"));
    }

    dispatch({
      type: FALHA_REGISTRO_USUARIO,
    });
  }
};

export const obterTodosUsuarios = () => async (dispatch) => {
  try {
    const res = await axios.get("api/usuario");
    dispatch({
      type: SUCESSO_OBTER_TODOS_USUARIOS,
      payload: res.data,
    });
  } catch (err) {
    const erros = err.response.data.errors;
    if (erros) {
      erros.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: FALHA_OBTER_TODOS_USUARIOS,
    });
  }
};
