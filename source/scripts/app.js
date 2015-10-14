var app = require('app');
var ipc = require('ipc');
var path = require('path');

var basePath = 'file://' + path.normalize(__dirname + '/..');
var window;

var bind = function() {
  ipc.on('hid', close);
  ipc.on('ready', swap);
};

var close = function() {
  window.close();
  app.quit();
};

var main = function() {
  bind();
  open();
};

var open = function() {
  var BrowserWindow = require('browser-window');
  var screen = require('screen');
  var size = screen.getPrimaryDisplay().workAreaSize;

  window = new BrowserWindow({
    x: (size.width - 200) * 0.5 >> 0,
    y: (size.height - 200 - 113),
    'always-on-top': true,
    frame: false,
    resizable: false,
    transparent: true,
    width: 200,
    height: 200
  });

  window.loadUrl(basePath + '/templates/main.html');
}

var swap = function() {
  window.send('show', 'success');
};

app.on('ready', main);
