const mongoose = require('mongoose');
var esquema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        unique:true,
    },
    anuncio:{
        type:String,
        required:true,
    }
})

const anuncioDB = mongoose.model('anunciosBD',esquema);
module.exports = anuncioDB;
