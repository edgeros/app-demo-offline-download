/*
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 *
 * Detailed license information can be found in the LICENSE file.
 *
 * File: main.js.
 *
 * Author: hanhui@acoinfo.com
 *
 */

/* Import system modules */
const WebApp = require('webapp');
const io = require('socket.io');
const SigSlot = require('sigslot');
const bodyParser = require('middleware').bodyParser;

const sigslot = new SigSlot('download');

/* Import routers */
const myRouter = require('./routers/rest');

/* Create App */
const app = WebApp.createApp();

/* Set static path */
app.use(WebApp.static('./public'));

// body parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded()); // for parsing application/x-www-form-urlencoded

/* Set test rest */
app.use('/api', myRouter);


/* Rend test */
app.get('/temp.html', function (req, res) {
  res.render('temp', { time: Date.now() });
});

/* Start App */
app.start();
console.log('ports:', sys.appinfo().ports)
console.log('ports:', sys.appinfo().appid)
console.log('ports:', sys.appinfo().port)

const socketio = io(app, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000
})

socketio.on('connection', socket => {
  console.log('>> socket connected <<')

  // Subscribe
  sigslot.slot('progress', (msg) => {
    // console.log('>> main download arrived:', msg.data);
    socket.emit('progress', msg)
  });

})

/* Event loop */
require('iosched').forever();
