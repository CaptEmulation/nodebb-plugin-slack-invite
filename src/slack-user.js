
var request = require('request');
var User = require('../nodebb').User;
var winston = require('../nodebb').winston;
var settings = require('./settings');

function list(callback) {
  var inviteToken = settings.get('slack.token');
  var url = settings.get('slack.url');

  request.post({
    url: 'https://' + url + '/api/users.list',
    form: {
      prescence: false,
      token: inviteToken
    }
  }, function (err, httpResponse, body) {
    callback(err, JSON.parse(body));
  });
}

function isEmail(email) {
  var dsl = {
    inList: function isEmailInList(callback) {
      list(function (err, response) {
        if (err) {
          callback(err);
          return;
        }
        var foundMember;
        response.members.some(function (member) {
          if (member &&
            member.profile &&
            member.profile.email &&
            member.profile.email.toLowerCase() === email.toLowerCase()) {
              foundMember = member;
              return true;
          }
        });
        callback(null, foundMember);
      });
      return dsl;
    }
  };
  return dsl;
}

exports.list = list;
exports.isEmail = isEmail;
