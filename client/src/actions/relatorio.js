import { SUCESSO_OBTER_TROCAS, FALHA_OBTER_TROCAS } from "./types";
import axios from "axios";
import {setAlert} from './alert'

export const obterRelatorio = (dataInicial, dataFinal) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ dataInicial, dataFinal });

  try {
    const res = await axios.post("/api/registrotroca/relatorio", body, config);
    dispatch({
        type: SUCESSO_OBTER_TROCAS,
        payload: res.data
    })
  } catch (err) {
    const erros = err.response.data.errors;
    if (erros) {
      erros.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }else{
      dispatch(setAlert(err.response.data, "danger"))
    }
    dispatch({
        type: FALHA_OBTER_TROCAS
    })
  }
};
