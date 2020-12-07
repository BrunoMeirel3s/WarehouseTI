import { SUCESSO_TROCA, FALHA_TROCA } from '../actions/types';
const initialState = {
    trocaRealizada: null
};

export default function (state = initialState, action){
     const {type, payload} = action;

     switch(type){
         case SUCESSO_TROCA:
            return{
                ...state,
                trocaRealizada: true
            }
         case FALHA_TROCA:
             return{
                 ...state,
                 trocaRealizada: false
             }   
         default:
             return state
     }
}