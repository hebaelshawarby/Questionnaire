var express = require('express');
var router = require('./routes');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var cons = require('consolidate');
var cors = require('cors');
var jwt = require('jsonwebtoken');


var app = express();



mongoose.connect('mongodb://localhost:27017/questionnaire2');



// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, '../app'));
app.set('view engine', 'html');
app.set('super-secret', 'heba');

// configure app
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname, '../app')));


app.use(flash()); // use connect-flash for flash messages stored in session



app.use(router);


// start the server
app.listen(3000, function(){
    console.log("server is listening on port 8000");
});

module.exports.app = app;
module.exports.jwt = jwt;