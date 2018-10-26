const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const pelicula=new Schema({
  Nombre: String,
  Genero:String,
  Director:String,
  Franquicia:{
    type:String,
    default:"No aplica"
  },
  Pais:String,
  Año_Estreno:Number,
  Duracion:Number,
  Productora:String,
  Actores:Array
});
module.exports=mongoose.model('Peliculas',pelicula);
