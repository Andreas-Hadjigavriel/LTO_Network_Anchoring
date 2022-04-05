"use strict";

var express = require('express');

var mongoose = require('mongoose');

var path = require('path');

var bodyParser = require('body-parser');

var app = express();
mongoose.connect('mongodb://localhost/anchorFiles').then(function () {
  return console.log("MongoDB Connected");
})["catch"](function (err) {
  return console.log(err);
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./routes/anchor')(app);

var PORT = 8080;
app.listen(PORT, function () {
  console.log("Server is running on PORT ".concat(PORT));
});