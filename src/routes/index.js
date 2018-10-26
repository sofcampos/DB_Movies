const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


/*PRODUCTORA*/
const productora=require('../models/productora');
router.get('/', (req,res)=>{
  res.render('index');
});
router.get('/productoras',async (req,res)=>{
  const productoras=await productora.find();
  res.render('productoras',{
    productoras});
});
router.post('/addproductora', async function(req,res){
  var json={"Nombre": req.body.nombre_productora,
  "Año_Fundacion":Number(req.body.year_productora),
  "Duracion":Number(req.body.duracion_pelicula),
  "Pag_Web":req.body.pag_web_productora};
  const procnew=new productora(json);
  await procnew.save();
  res.redirect('/productoras');
});
router.get('/eliminarproductora/:id',async (req,res)=>{
  const{id}=req.params;
  await productora.remove({_id:id})
  res.redirect('/productoras');
});
router.get('/editarproductora/:id',async (req,res)=>{
  const{id}=req.params;
  const productor_edit=await productora.findById(id);
  res.render('editarproductora',{
    productor_edit
  });
});
router.post('/editarproductora/:id',async (req,res)=>{
  const{id}=req.params;
  var json={"Nombre": req.body.nombre_productora,
  "Año_Fundacion":Number(req.body.year_productora),
  "Duracion":Number(req.body.duracion_pelicula),
  "Pag_Web":req.body.pag_web_productora};
  await productora.update({_id:id},json);
  res.redirect('/productoras');
});

/*PELICULA*/
const pelicula=require('../models/pelicula');
router.get('/', (req,res)=>{
  res.render('index');
});

router.get('/peliculas',async (req,res)=>{
  const peliculas=await pelicula.find();
  res.render('peliculas',{
    peliculas
  });
});

router.post('/addpeli', async function(req,res){
  var str =req.body.actores_pelicula;
  var lista = str.split(",");
  var json={"Nombre": req.body.nombre_pelicula,
  "Genero":req.body.genero_pelicula,
  "Director":req.body.director_pelicula,
  "Franquicia":req.body.franquicia_pelicula,
  "Pais":req.body.pais_pelicula,
  "Año_Estreno":Number(req.body.year_pelicula),
  "Duracion":Number(req.body.duracion_pelicula),
  "Productora":req.body.productora_pelicula,
  Actores:lista};
  const pelinew=new pelicula(json);
  await pelinew.save();
  res.redirect('/peliculas');
});
router.get('/eliminarpeli/:id',async (req,res)=>{
  const{id}=req.params;
  await pelicula.remove({_id:id})
  res.redirect('/peliculas');
});

router.get('/editarpeli/:id',async (req,res)=>{
  const{id}=req.params;
  const peli=await pelicula.findById(id);
  res.render('editarpelicula',{
    peli
  });
});
router.post('/editarpeli/:id',async (req,res)=>{
  const{id}=req.params;
  var str =req.body.actores_pelicula;
  var lista = str.split(",");
  var json={"Nombre": req.body.nombre_pelicula,
  "Genero":req.body.genero_pelicula,
  "Director":req.body.director_pelicula,
  "Franquicia":req.body.franquicia_pelicula,
  "Pais":req.body.pais_pelicula,
  "Año_Estreno":Number(req.body.year_pelicula),
  "Duracion":Number(req.body.duracion_pelicula),
  "Productora":req.body.productora_pelicula,
  Actores:lista};
  await pelicula.update({_id:id},json);
  res.redirect('/peliculas');
});

/*CONSULTAS*/

/*Consulta A*/
router.get('/consultaa',async(req,res)=>{
  const pelis=await pelicula.find();
  const resultado={};
  res.render('consultaa',{
    pelis,resultado
  });
});
router.post('/consultaa',async(req,res)=>{
  const titulo_seleccionado_string=req.body.titulo_seleccionado;
  const pelis=await pelicula.find();
  const resultado=await pelicula.find({Nombre:titulo_seleccionado_string});
  res.render('consultaa',{
    pelis,resultado
  });
});

/*Consulta B*/
router.get('/consultab',async(req,res)=>{
  const pelis=await pelicula.find();
  const resultado={};
  res.render('consultab',{
    pelis,resultado
  });
});
router.post('/consultab',async(req,res)=>{
  const franquicia_seleccionada_string=req.body.franquicia_seleccionada;
  const pelis=await pelicula.find();
  const resultado=await pelicula.find({Franquicia:franquicia_seleccionada_string});
  res.render('consultab',{
    pelis,resultado
  });
});

/*Consulta C*/
router.get('/consultac',async(req,res)=>{
  const resultado={};
  res.render('consultac',{
    resultado
  });
});
router.post('/consultac',async(req,res)=>{
  const fechaIni=req.body.Inicio;
  const fechaFinal=req.body.Final;
  const resultado=await pelicula.find({$and:[{Año_Estreno:{$gte: fechaIni}},{Año_Estreno:{$lte: fechaFinal}}]});
  console.log(resultado);
  res.render('consultac',{
    resultado
  });
});
/*Consulta D*/
router.get('/consultad',async(req,res)=>{
  const companies=await productora.find();
  const resultado={};
  const productora_seleccionada_string={};
  res.render('consultad',{
    companies,resultado,productora_seleccionada_string
  });
});
router.post('/consultad',async(req,res)=>{
  const productora_seleccionada_string={"Empresa":req.body.productora_seleccionada};
  const companies=await productora.find();
  const resultado=await pelicula.find({Productora:productora_seleccionada_string.Empresa});
  res.render('consultad',{
    companies,resultado,productora_seleccionada_string
  });
});
/*Consulta E*/
router.get('/consultae',async(req,res)=>{
  const companies=await productora.find();
  const cant_pelis="";
  var json={
    "Cant_Pelis":cant_pelis,
  };
  res.render('consultae',{
    json,companies
  });
});
router.post('/consultae',async(req,res)=>{
  const productora_seleccionada_string=req.body.productora_seleccionada;
  const companies=await productora.find();
  const resultado=await pelicula.find({Productora:productora_seleccionada_string});
  const cant_pelis=await pelicula.find({Productora:productora_seleccionada_string}).count();
  var valores=[];
  for(var i=0;i<cant_pelis;i++){
    valores.push(resultado[i].Duracion);
  }
  var max=0
  var min=0;
  let sum = 0;
  var avg=0;
  if(cant_pelis>0){
    console.log("yes");
     max=Math.max.apply(null,valores);
     min=Math.min.apply(null,valores);
     sum = valores.reduce((previous, current) => current += previous);
     avg=sum/cant_pelis;
  }else{
    console.log("no");
    var max=0;
    var min=0;
    let avg=0;
  };
  var json={
    "Productora":productora_seleccionada_string,
    "Cant_Pelis":cant_pelis,
    "Max":max,
    "Min":min,
    "Avg":avg
  };
  res.render('consultae',{
    json,companies
  });
});

module.exports=router;
