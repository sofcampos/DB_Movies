const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const productora=new Schema({
  Nombre: String,
  Año_Fundacion:Number,
  Pag_Web:String,
});

module.exports=mongoose.model('Productora',productora);
