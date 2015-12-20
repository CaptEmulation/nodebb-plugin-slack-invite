module.exports = {
	Settings: module.parent.parent.require('./settings'),
	SocketAdmin: module.parent.parent.require('./socket.io/admin'),
	SocketPlugins: module.parent.parent.require('./socket.io/plugins'),
	winston: module.parent.parent.require('winston'),
	plugins: module.parent.parent.require('./plugins'),
	User: module.parent.parent.require('./user')
};