/*
 * Copyright (c) 2021 EdgerOS Team.
 * All rights reserved.
 *
 * Detailed license information can be found in the LICENSE file.
 *
 * File: rest.js.
 *
 * Author: hanhui@acoinfo.com
 *
 */

const Router = require('webapp').Router;
const SigSlot = require('sigslot');
const fs = require('fs')

const sigslot = new SigSlot('download');

/* Create router */
const router = Router.create();

// download task
const task = new Task('./download-task.js', 'download-task', {
  directory: module.directory
})

/* Test call */
router.get('/test', function(req, res) {
  res.send('Hello world!');
});

router.post('/download', function(req, res) {
  sigslot.emit('download', {
    url: req.body.url,
    hash: req.body.hash
  })
  res.json({
    code: 0,
    msg: 'success'
  })
});

router.get('/download-list', function(req, res) {
  res.json({
    code: 0,
    msg: 'ok',
    data: fs.dumpdir('./public/download')
  })
})

/* Export router */
module.exports = router;
