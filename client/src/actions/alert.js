import { v4 as uuid } from "uuid"; //uuid is a library used to make ids to our alerts
import { ADD_ALERTA, REMOVER_ALERTA } from "./types"; //states that we're going to use to make the actions happen

export const setAlert = (msg, alertType, timeout = 4000) => (dispatch) => {
  const id = uuid(); //id receive a random id by uuid()
  dispatch({
    type: ADD_ALERTA,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVER_ALERTA, payload: id }), timeout);
};
