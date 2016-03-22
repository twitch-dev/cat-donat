'use strict';

let Twitchalerts = require('./src/twitchalerts');
let Listener = require('./src/listener');

let app = require('./src/app');

app.get('/', (req, res) => {
  return res.send(`
    <a href="${Twitchalerts.authUrl}">${Twitchalerts.authUrl}</a>
    <br>
    <a href="${Twitchalerts.callbackUrl}">${Twitchalerts.callbackUrl}</a>
    `);
});