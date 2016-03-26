'use strict';

var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect(config.mongoUrl);

let db = mongoose;

module.exports = db;