import axios from "axios";
import {
  SUCESSO_OBTER_IMPRESSORA,
  FALHA_OBTER_IMPRESSORA,
  USUARIO_LOGADO,
  SUCESSO_OBTER_TODAS_IMPRESSORAS,
  FALHA_OBTER_TODAS_IMPRESSORAS,
} from "./types";

import { setAlert } from "./alert";

export const obterImpressora = (patrimonio) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ patrimonio });
  try {
    const res = await axios.post(
      "/api/impressora/obterimpressora",
      body,
      config
    );
    dispatch({ type: USUARIO_LOGADO });
    dispatch({
      type: SUCESSO_OBTER_IMPRESSORA,
      payload: res.data,
    });
  } catch (err) {
    const erros = err.response.data.errors;
    if (erros) {
      erros.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      dispatch({
        type: FALHA_OBTER_IMPRESSORA,
      });
    }
  }
};

export const obterImpressorasDisponiveis = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/impressora/disponivel");
    dispatch({ type: USUARIO_LOGADO });
    dispatch({
      type: SUCESSO_OBTER_TODAS_IMPRESSORAS,
      payload: res.data,
    });
  } catch (err) {
    const erros = err.response.data.errors;
    if (erros) {
      erros.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: FALHA_OBTER_TODAS_IMPRESSORAS,
    });
  }
};
