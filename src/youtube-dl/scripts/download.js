var downloader = require('../lib/downloader');
const path = require('path');

const downloadPath = path.join(__dirname, '..', '..', '..', 'extraResources');
downloader(downloadPath, function error (err, done) {
  if (err) return console.log(err.stack)
  console.log(done)
});