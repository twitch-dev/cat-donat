'use strict';

var mongoose = require('./db');

var userSchema = mongoose.Schema({
  nickname: String,
  access_token: String,
  refresh_token: String
});

userSchema.methods.setTokens = ((auth) => {
  var _self = this;
  
  return new Promise((res, err) => {

    if (auth.data.access_token === null) {
      err(Error('Not found token'));
    }
    else if (auth.data.refresh_token === null) {
      err(Error('Not found refresh token'));
    }

    _self.access_token = auth.data.access_token;
    _self.refresh_token = auth.data.refresh_token;

    res(_self);
  });
});

module.exports = mongoose.model('twUsers', userSchema);