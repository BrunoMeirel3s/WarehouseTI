import{
    SUCESSO_TROCA_TONER,
    FALHA_TROCA_TONER
} from '../actions/types'

const estadosIniciais = {
    registro: null
}

export default function(state= estadosIniciais, action){
    const {type, payload} = action;
    switch(type){
        case SUCESSO_TROCA_TONER:
            return{
                ...state,
                registro: payload 
            }
    }
}