'use strict';

let app = require('./app'),
  db = require('./db'),
  Twitchalerts = require('./twitchalerts');

app.post('/id*', (req, res) => {
  let nickname = req.params[0];

  let user = db.getUserByNickname(nickname);

  if (user === null) {
    return res.status(404).send();
  } else {

    console.log(req.body);

    // Twitchalerts.notification(user);
    
    return res.status(200).send();
  }
});