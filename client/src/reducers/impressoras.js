import {
  SUCESSO_OBTER_IMPRESSORA,
  FALHA_OBTER_IMPRESSORA,
  SUCESSO_OBTER_TODAS_IMPRESSORAS,
  FALHA_OBTER_TODAS_IMPRESSORAS,
} from "../actions/types";

const estadosIniciais = {
  impressora: null,
  sucessoImpressora: null,
  todasImpressoras: null,
  sucessoTodasImpressoras: null,
};

export default function (state = estadosIniciais, action) {
  const { type, payload } = action;
  switch (type) {
    case SUCESSO_OBTER_IMPRESSORA:
      return {
        ...state,
        impressora: payload,
        sucessoImpressora: true,
      };
    case FALHA_OBTER_IMPRESSORA:
      return {
        ...state,
        impressora: null,
        sucessoImpressora: false,
      };
    case SUCESSO_OBTER_TODAS_IMPRESSORAS:
      return {
        ...state,
        todasImpressoras: payload,
        sucessoTodasImpressoras: true,
      };
    case FALHA_OBTER_TODAS_IMPRESSORAS:
      return {
        ...state,
        todasImpressoras: null,
        sucessoTodasImpressoras: false,
      };
    default:
      return state;
  }
}
