'use strict'

const path = require('path');

module.exports = () => {
  return path.resolve(__dirname, '..', 'extraResources', 'youtube-dl.exe');
}