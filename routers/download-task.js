const WebGet = require('webget');
const SigSlot = require('sigslot');
const fs = require('fs')

const sigslot = new SigSlot('download');
fs.mkdir('./public/download', 0o666, true)

// Subscribe
sigslot.slot('download', (msg) => {
  // const url = 'http://git.sylixos.com/res/git_logo.png';
  const url = msg.url;
  const fileNameArr = url.split('/')
  const fileName = fileNameArr[fileNameArr.length - 1]
  const path = `./public/download/${fileName}`;
  let totalSize = 0

  WebGet.file(url, path, {
    limits: 512,
    lines: 2,
    reload: true
  }, (loader) => {
    loader.on('response', (info) => {
      totalSize = info.requestSize;
      // console.log(`Download begin, original=${info.originalSize}, total=${totalSize}, loaded=${info.loadedSize}`);
    });

    loader.on('data', (chunk, info) => {
      const progress = info.completeSize / totalSize * 100;
      // console.log(`Recv data, size=${chunk.byteLength}, offset=${info.offset}, progress=${progress}%`);
      sigslot.emit('progress', {
        data: Math.round(progress),
        hash: msg.hash,
        name: fileName
      })
    });

    loader.on('end', () => {
      console.log(`Download finish, file: ${path}`);
    });

    loader.on('error', (e) => {
      console.log('Download error:', e.message);
    });
  })
});

require('iosched').forever();
