'use strict';

let express = require('express'),
  multer = require('multer'),
  bodyParser = require('body-parser');

let app = express(),
  upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('x-powered-by', false);

app.listen(80, () => {
  console.log('Server start on 80 port');
});

module.exports = app;