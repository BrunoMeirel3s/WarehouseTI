import axios from "axios";
import {
  SUCESSO_INSERIR_SUPRIMENTO,
  FALHA_INSERIR_SUPRIMENTO,
  FALHA_OBTER_SUPRIMENTO,
  OBTER_TODOS_SUPRIMENTOS,
  USUARIO_LOGADO,
} from "./types";

import { setAlert } from "./alert";

export const inserirSuprimento = (codigo, modelo, disponivel, cor) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ codigo, modelo, disponivel, cor });

  try {
    const res = await axios.post("/api/suprimento", body, config);

    dispatch({
      type: SUCESSO_INSERIR_SUPRIMENTO,
      payload: res.data,
    });

    const resTodosSuprimentos = await axios.get("/api/suprimento/disponivel")
    dispatch({
      type: OBTER_TODOS_SUPRIMENTOS,
      payload: resTodosSuprimentos.data,
    });
  } catch (err) {
    const erros = err.response.data.errors;
    if (erros) {
      erros.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: FALHA_INSERIR_SUPRIMENTO,
    });
  }
};

export const obterTodosSuprimentos = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/suprimento/disponivel");
    dispatch({type: USUARIO_LOGADO})
    dispatch({
      type: OBTER_TODOS_SUPRIMENTOS,
      payload: res.data,
    });
  } catch (err) {
    const erros = err.response.data.errors;
    if (erros) {
      erros.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: FALHA_OBTER_SUPRIMENTO,
    });
  }
};
