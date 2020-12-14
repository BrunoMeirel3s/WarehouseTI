import {
  SUCESSO_INSERIR_SUPRIMENTO,
  FALHA_INSERIR_SUPRIMENTO,
  OBTER_TODOS_SUPRIMENTOS,
  FALHA_OBTER_SUPRIMENTO,
  FALHA_OBTER_TODOS_SUPRIMENTOS,
  OBTER_SUPRIMENTO
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
        todosSuprimentos: payload,
        sucessoSuprimento: true
      }
    case OBTER_SUPRIMENTO:
      return{
        ...state,
        suprimento: payload,
        sucessoSuprimento: true
      }  
    case FALHA_OBTER_SUPRIMENTO:
    case FALHA_OBTER_TODOS_SUPRIMENTOS:
      return{
        ...state,
        todosSuprimentos: null,
        suprimento: null,
        sucessoSuprimento: null
      }  
    default:
      return state;
  }
}
