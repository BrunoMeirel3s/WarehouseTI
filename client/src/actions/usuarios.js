import axios from "axios";
import { SUCESSO_REGISTRO_USUARIO, FALHA_REGISTRO_USUARIO } from "./types";
import { setAlert } from "./alert";

export const inserirUsuario = (nome, matricula, senha, ativo) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ nome, matricula, senha });
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
      dispatch(setAlert(err.response.data, "danger"));
    }

    dispatch({
      type: FALHA_REGISTRO_USUARIO,
    });
  }
};
