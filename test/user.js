var should = require('should'),
  User = require('../src/user');

describe('Test user class', () => {
  var nickname = 'test';

  it('Create user', (done) => {
    var user = new User({
      nickname: nickname
    });

    user.save()
      .then((res) => {
        res.nickname.should.be.eql(nickname);
        done();
      })
      .catch((err) => {
        throw (err);
      });
  });

  it('Remove user', (done) => {
    User.findOne({
        nickname: nickname
      })
      .then((user) => {
        return user.remove();
      })
      .then((result) => {
        result.nickname.should.be.eql(nickname);
        done();
      })
      .catch((err) => {
        throw (err);
      });
  });

  it('Set token auth', (done) => {
    var user = new User();
    var auth = {
      data: {
        access_token: "1234",
        refresh_token: "1234"
      }
    };

    user.setTokens(auth)
    .then((user) => {
      user.access_token.should.be.eql(auth.data.access_token);
      user.refresh_token.should.be.eql(auth.data.refresh_token);
      
      done();
    })
    .catch((err) => {
      throw (err);
    })
  });
});