const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

//connecting DB
mongoose.connect('mongodb://localhost/db_movies')
  .then(db=>console.log('DB connected'))
  .catch(err=>console.log(err));
//importing routes
const indexRoutes= require('./routes/index');
//settings

app.set('port',process.env.PORT || 8081);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//middlewares

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser());

//routes
app.use('/',indexRoutes);
app.use(express.urlencoded({extended:false}));
//starting server
app.listen(app.get('port'), function() {
  console.log(`Server on port ${app.get('port')}`);
});
