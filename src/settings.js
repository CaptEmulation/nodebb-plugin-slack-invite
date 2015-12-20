var version = require('../package.json').version;
var Settings = require('../nodebb').Settings;

var defaultSettings = {
	slack: {
		url: 'your-slack-team-name.slack.com',
		token: 'YOUR-ACCESS-TOKEN'
	},
	strings: {
		header: 'Click to invite to slack team',
		signup: 'Get invite to Slack chat',
	},
	feature: {
		inviteOnJoin: false
	}
};


var settings = module.exports = new Settings('slack', version, defaultSettings, function() {
	// Create settings page socket.io callbacks
	var SocketAdmin = require('../nodebb').SocketAdmin;
	SocketAdmin.settings.syncSlack = function() {
			settings.sync();
	};

	SocketAdmin.settings.getSlackDefaults = function (socket, data, callback) {
			callback(null, settings.createDefaultWrapper());
	};
});

