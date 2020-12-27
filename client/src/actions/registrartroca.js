import {
  SUCESSO_REGISTRAR_TROCA,
  FALHA_REGISTRAR_TROCA,
  OBTER_SUPRIMENTO,
} from "./types";
import axios from "axios";
import { setAlert } from "./alert";

export const registrarTroca = (
  patrimonio,
  codigoToner,
  corToner,
  localizacao,
  modeloImpressora,
  enderecoIp,
  totalA3,
  totalA4
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    patrimonio,
    codigoToner,
    corToner,
    localizacao,
    modeloImpressora,
    enderecoIp,
    totalA3,
    totalA4,
  });

  try {
    const res = await axios.post("/api/registrotroca", body, config);
    dispatch({
      type: SUCESSO_REGISTRAR_TROCA,
      payload: res.data,
    });
    dispatch(setAlert("Registro inserido com sucesso!", "success"));

    dispatch({
      type: OBTER_SUPRIMENTO,
      payload: null,
    });
  } catch (err) {
    const erros = err.response.data.errors;
    if (erros) {
      erros.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: FALHA_REGISTRAR_TROCA,
    });
  }
};
