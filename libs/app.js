const WebApp = require('webapp');
const io = require('socket.io');
/* Create App */
const app = WebApp.createApp();

const socketio = io(app, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000
})

module.export.app = app
module.export.socketio = socketio
