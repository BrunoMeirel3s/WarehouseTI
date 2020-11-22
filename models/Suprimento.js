const mongoose = require('mongoose')
const SuprimentoSchema = new mongoose.Schema({
    codigo:{
        type: String,
        required:true,
        unique:true
    },
    modelo:{
       type: String,
       required:true,
    },
    cor:{
        type: String,
        required: true
    },
    disponivel:{
        type: Boolean,
        required: true
    },
    data:{
        type: Date,
        default: Date.now
    }
})

module.exports = Suprimento = mongoose.model('suprimento', SuprimentoSchema)