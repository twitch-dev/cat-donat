'use strict';

let ClientOAuth2 = require('client-oauth2'),
  config = require('./config'),
  express = require('express');

let app = express();

const authUrl = '/auth/twitchalerts',
  callbackUrl = authUrl + '/callback';

let twitchalertsAuth = new ClientOAuth2({
  clientId: 'MXD4QSuv5eGNTYgbpHdQVk1YeWqMuugwrKyMbIun',
  clientSecret: 'aLhL2ylwLJWw0fUIUiG4bTInHT5Yr0gZRkdIg7dJ',
  accessTokenUri: 'https://www.twitchalerts.com/api/v1.0/token',
  authorizationUri: 'https://www.twitchalerts.com/api/v1.0/authorize',
  redirectUri: config.baseUrl + callbackUrl,
  scopes: ['donations.create']
});

app.get(authUrl, (req, res) => {
  res.redirect(twitchalertsAuth.code.getUri());
});

app.get(callbackUrl, (req, res) => {
  let fullUrl = req.protocol + "://" + req.get('host') + req.url;

  twitchalertsAuth.code.getToken(fullUrl)
  .then((user) => {
    console.log(user);

    return res.send(user.accessToken); // Переправить на страницу настроик
  })
  .catch((err) => {
    console.log(err);

    return res.send(err);
  });  
});

app.get('/', (req, res) => {
  return res.send(`<a href="${authUrl}">${authUrl}</a><br><a href="${callbackUrl}">${callbackUrl}</a>`);
});

app.listen(80, () => {
  console.log('Server start on 80 port');
})