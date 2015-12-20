/*
 * Generated using:
 * slush-nodebb-plugin
 * https://github.com/jongarrison/slush-nodebb-plugin
 */
(function() {
  'use strict';
//var SocketPlugins = require.main.require('./src/socket.io/plugins');

  var winston = require('./nodebb').winston,
      SocketPlugins = require('./nodebb').SocketPlugins,
      plugins = require('./nodebb').plugins,
      slackInvite = require('./src/slack-invite').slackInvite,
      User = require('./nodebb').User,
      _ = require('lodash'),
      settings,
      fs = require('fs'),
      path = require('path'),
      util = require('util'),
      app;

  var Plugin = {
    staticAppLoad: function(params, callback) {
      winston.verbose("nodebb-plugin-slack - staticAppLoad called");

      app = params.app;
      var router = params.router;

      settings = require('./src/settings');

      var renderCustomAdminPage = function (req, res) {
        res.render('plugin-templates/slack-admin-page', {someInjectedData: "Some NodeBB slack integration"});
      }
      router.get('/admin/plugins/slack', params.middleware.admin.buildHeader, renderCustomAdminPage);
      router.get('/api/admin/plugins/slack', renderCustomAdminPage);
      // router.post('/slack/invite', function (req, res) {
      //   var slackSettings = settings.get('slack');
      //   slackSettings.url = req.param.url
      //   slackSettings.token = req.param.token;
      //   settings.set('slack', slackSettings);
      //   settings.persist();
      // });

      var renderCustomPage = function (req, res) {
        var uid = req.user ? parseInt(req.user.uid, 10) : 0;
        User.getUserFields(uid, ['email'], function (err, userData) {
          res.render('plugin-templates/slack-page.tpl',
            _.assign({}, settings.get('invite'), userData));
        });
      }
      router.get('/slack', params.middleware.buildHeader, renderCustomPage);

      SocketPlugins.slack.invite = function (socket, params, callback) {
        winston.info('slack invite request received');
        slackInvite(socket);
      };

      if (typeof callback === 'function') {
        callback();
      }
    }, //staticAppLoad

    adminRoute: function (header, callback) {
      header.plugins.push({
        route: '/plugins/slack',
        icon: 'fa-tint',
        name: 'Slack'
      });
      callback(null, header);
    },

    defineWidgets: function(widgets, callback) {
      loadWidgetTemplate('./widgets/slack.tpl', function(templateData) {
        widgets = widgets.concat([
          {
            widget: "slack-invite",
            name: "slack-invite",
            description: "",
            content: templateData
          }
        ]);
        callback(null, widgets);
      });
    }, //defineWidgets

    renderSlackInvite: function(widget, callback) {
      app.render("widgets/widget.tpl", {dataExample: "Some Test Data", "adminSettingForWidget" : widget.adminSettingForWidget }, callback);
    }, //renderWidgetId

/*
    { "hook": "filter:register.build", "method": "addSlackInvite", "priority": 10 },
    { "hook": "filter:register.check", "method": "newUserInvite", "priority": 10 }
*/

    addSlackInvite: function (data, callback) {
      if (settings.feature.inviteOnJoin) {
        var slackInvite = {
            label: settings.strings.signup,
            html: ''
              + '<input id="slackInvite" type="checkbox"></input>'
        };
        if (data.templateData.regFormEntry && Array.isArray(data.templateData.regFormEntry)) {
            data.templateData.regFormEntry.push(slackInvite);
        } else {
            data.templateData.captcha = slackInvite;
        }
      }
      callback(null, data);
    },

    newUserInvite: function () {

    }
  };
  module.exports = Plugin;

  function loadWidgetTemplate(template, next) {
    var __dirname = "./node_modules/nodebb-plugin-slack";
    fs.readFile(path.resolve(__dirname, template), function (err, data) {
      if (err) {
        console.log(err.message);
        return next(null, err);
      }
      next(data.toString());
    });
  }

})();
