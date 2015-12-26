
var request = require('request');
var User = require('../nodebb').User;
var winston = require('../nodebb').winston;
var settings = require('./settings');

function slackInvite(email, callback) {
  var inviteToken = settings.get('slack.token');
  var url = settings.get('slack.url');

  request.post({
    url: 'https://' + url + '/api/users.admin.invite',
    form: {
      email: email,
      token: inviteToken,
      set_active: true
    }
  }, function (err, httpResponse, body) {
    callback(err, JSON.parse(body));
  });
}

exports.slackInvite = slackInvite;