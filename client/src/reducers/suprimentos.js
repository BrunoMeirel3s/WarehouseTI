import {
  SUCESSO_INSERIR_SUPRIMENTO,
  FALHA_INSERIR_SUPRIMENTO,
} from "../actions/types";

const estadosInicias = {
  suprimento: null,
  sucessoSuprimento: false,
};

export default function (state = estadosInicias, action) {
  const { type, payload } = action;
  switch (type) {
    case SUCESSO_INSERIR_SUPRIMENTO:
      return {
        ...state,
        suprimento: payload,
        sucessoSuprimento: true,
      };
    case FALHA_INSERIR_SUPRIMENTO:
      return {
        ...state,
        sucessoSuprimento: false,
      };
    default:
      return state;
  }
}
