const mongoose = require('mongoose')

const ImpressoraSchema = new mongoose.Schema({
    patrimonio:{
        type: String,
        required:true,
        unique: true 
    },
    localizacao:{
       type: String,
       required:true
    },
    modelo:{
        type: String,
        required: true
    },
    enderecoIp:{
        type: String
    },
    disponivel:{
        type: Boolean,
        require: true
    },
    data:{
        type: Date,
        default: Date.now
    }
})

module.exports = Impressora = mongoose.model('impressora', ImpressoraSchema)