import axios from "axios";
import { SUCESSO_INSERIR_SUPRIMENTO, FALHA_INSERIR_SUPRIMENTO } from "./types";

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
