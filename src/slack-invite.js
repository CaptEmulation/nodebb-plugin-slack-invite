
var request = require('request');
var User = require('../nodebb').User;
var winston = require('../nodebb').winston;
var settings = require('./settings');

function slackInvite(socket) {
  User.getUserFields(socket.uid, ['email'], function (err, userData) {
    var email = userData.email;
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
      winston.info('Slack response ', body);
    });
  });
}

exports.slackInvite = slackInvite;