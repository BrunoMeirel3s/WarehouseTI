import{ SUCESSO_OBTER_TROCAS, FALHA_OBTER_TROCAS} from '../actions/types'
const estadosIniciais = {
    relatorio: null,
    sucessoObterRelatorio: null
}

export default function(state = estadosIniciais, action){
    const {type, payload} = action;
    switch(type){
        case SUCESSO_OBTER_TROCAS:
            return{
                ...state,
                relatorio: payload,
                sucessoObterRelatorio: true
            }
        case FALHA_OBTER_TROCAS:
            return{
                ...state,
                relatorio: null,
                sucessoObterRelatorio: false
            }
        default:
            return state
    }
}