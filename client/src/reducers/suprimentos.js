import {
  SUCESSO_INSERIR_SUPRIMENTO,
  FALHA_INSERIR_SUPRIMENTO,
  OBTER_TODOS_SUPRIMENTOS,
} from "../actions/types";

const estadosInicias = {
  suprimento: null,
  sucessoSuprimento: false,
  todosSuprimentos: null
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
    case OBTER_TODOS_SUPRIMENTOS:
      return{
        ...state,
        todosSuprimentos: payload
      }
    default:
      return state;
  }
}
