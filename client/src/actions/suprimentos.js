import axios from "axios";
import {
  SUCESSO_INSERIR_SUPRIMENTO,
  FALHA_INSERIR_SUPRIMENTO,
  FALHA_OBTER_SUPRIMENTO,
  FALHA_OBTER_TODOS_SUPRIMENTOS,
  OBTER_TODOS_SUPRIMENTOS,
  OBTER_TODOS_SUPRIMENTOS_BANCO,
  USUARIO_LOGADO,
  OBTER_SUPRIMENTO,
  SUCESSO_ATUALIZAR_SUPRIMENTO,
} from "./types";

import { setAlert } from "./alert";

export const inserirSuprimento = (
  codigo,
  modelo,
  disponivel,
  cor,
  atualizarSuprimento
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ codigo, modelo, disponivel, cor });

  try {
    if (atualizarSuprimento == true) {
      const res = await axios.put("/api/suprimento", body, config);
      dispatch({
        type: SUCESSO_ATUALIZAR_SUPRIMENTO,
        payload: res.data,
      });
    } else {
      const res = await axios.post("/api/suprimento", body, config);

      dispatch({
        type: SUCESSO_INSERIR_SUPRIMENTO,
        payload: res.data,
      });
      dispatch(setAlert("Suprimento inserido com sucesso!", "success"));

      const resTodosSuprimentos = await axios.get("/api/suprimento/disponivel");
      dispatch({
        type: OBTER_TODOS_SUPRIMENTOS,
        payload: resTodosSuprimentos.data,
      });
    }
  } catch (err) {
    const erros = err.response.data.errors;
    if (erros) {
      erros.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else {
      dispatch(setAlert(err.response.data, "danger"));
    }

    dispatch({
      type: FALHA_INSERIR_SUPRIMENTO,
    });
  }
};

export const obterTodosSuprimentos = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/suprimento/disponivel");
    dispatch({ type: USUARIO_LOGADO });
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
      type: FALHA_OBTER_TODOS_SUPRIMENTOS,
    });
  }
};

export const obterSuprimento = (codigo) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ codigo });
  try {
    const res = await axios.post(
      "/api/suprimento/obtersuprimento",
      body,
      config
    );
    dispatch({
      type: OBTER_SUPRIMENTO,
      payload: res.data,
    });
  } catch (err) {
    const erros = err.response.data.errors;
    if (erros) {
      erros.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      dispatch({
        type: FALHA_OBTER_SUPRIMENTO,
      });
    } else {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }
  }
};

export const todosSuprimentosBanco = () => async (dispatch) => {
  try {
    const res = await axios.get("api/suprimento");
    dispatch({
      type: OBTER_TODOS_SUPRIMENTOS_BANCO,
      payload: res.data,
    });
  } catch (err) {
    const erros = err.response.data.errors;
    if (erros) {
      erros.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      dispatch({
        type: FALHA_OBTER_SUPRIMENTO,
      });
    } else {
      dispatch(setAlert(err.response.data.msg, "danger"));
    }
  }
};
