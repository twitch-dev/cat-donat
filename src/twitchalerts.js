'use strict';

let Twitchalerts = {};

let ClientOAuth2 = require('client-oauth2'),
  app = require('./app'),
  config = require('../config');

const authUrl = '/auth/twitchalerts',
  callbackUrl = authUrl + '/callback';

let auth = new ClientOAuth2({
  clientId: config.clientId,
  clientSecret: config.clientSecret,
  accessTokenUri: config.accessTokenUri,
  authorizationUri: config.authorizationUri,
  redirectUri: config.baseUrl + callbackUrl,
  scopes: config.scopes
});

app.get('/pirate', (req, res) => {
  return res.send('Ёхохо, и бутылка рома');
});

app.get(authUrl, (req, res) => {
  res.redirect(auth.code.getUri());
});

app.get(callbackUrl, (req, res) => {
  let fullUrl = config.baseUrl + req.url;

  auth.code.getToken(fullUrl)
    .then((user) => {
      console.log(user);

      if (Twitchalerts.authorizationUser !== null) {
        Twitchalerts.authorizationUser(user);
      }

      return res.send(user.accessToken);
    })
    .catch((err) => {
      console.log(err);

      return res.send(err);
    });
});

function notification(user, money, comments, nickSender) {
  user.auth.request({
    method: 'post',
    url: config.donationUri,
    body: {
      name: nickSender,
      identifier: nickSender,
      amount: money,
      currency: "RUB"
    }
  }).then(function (res) {
    console.log(res) //=> { body: { ... }, status: 200, headers: { ... } }
  })
}

Twitchalerts.auth = auth;
Twitchalerts.authUrl = authUrl;
Twitchalerts.callbackUrl = callbackUrl;
Twitchalerts.notification = notification;

module.exports = Twitchalerts;