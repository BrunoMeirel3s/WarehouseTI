import axios from "axios";
import {
  SUCESSO_OBTER_IMPRESSORA,
  FALHA_OBTER_IMPRESSORA,
  USUARIO_LOGADO,
  SUCESSO_OBTER_TODAS_IMPRESSORAS,
  FALHA_OBTER_TODAS_IMPRESSORAS,
  SUCESSO_INSERIR_IMPRESSORA,
  SUCESSO_ATUALIZAR_IMPRESSORA,
  FALHA_INSERIR_IMPRESSORA,
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

export const inserirImpressora = (
  patrimonio,
  modelo,
  localizacao,
  enderecoIp,
  disponivel,
  atualizarImpressora
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    patrimonio,
    modelo,
    localizacao,
    enderecoIp,
    disponivel,
  });

  try {
    if (atualizarImpressora == true) {
      const res = await axios.put("api/impressora", body, config);
      dispatch({
        type: SUCESSO_ATUALIZAR_IMPRESSORA,
        payload: res.data,
      });

      dispatch(setAlert("Impressora atualizada com sucesso!", "success"));
    } else {
      const res = await axios.post("api/impressora", body, config);
      dispatch({
        type: SUCESSO_INSERIR_IMPRESSORA,
        payload: res.data,
      });
      dispatch(setAlert("Impressora inserida com sucesso!", "success"));

      const resTodasImpressoras = await axios.get("api/impressora");
      dispatch({
        type: SUCESSO_OBTER_TODAS_IMPRESSORAS,
        payload: resTodasImpressoras.data,
      });
    }
  } catch (err) {
    const erros = err.response.data.errors;
    if (erros) {
      erros.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      //dispatch(setAlert(err.response.data, "danger"));
    }

    dispatch({
      type: FALHA_INSERIR_IMPRESSORA,
    });
  }
};

export const obterTodasImpressoras = () => async (dispatch) => {
  try {
    const res = await axios.get("api/impressora");
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
