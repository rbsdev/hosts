var app = require('app');
var fs = require('fs');
var ipc = require('ipc');
var path = require('path');
var spawn = require('child_process').spawn;

var basePath = path.normalize(__dirname + '/..');
var documents = process.env.HOME + '/Documents';
var environment;
var name;
var options;
var window;

var bind = function() {
  ipc.on('hid', close);
  ipc.on('ready', swap);
};

var close = function() {
  window.close();
  app.quit();
};

var error = function(exception) {
  if (exception) {
    spawn('syslog', ['-s', '-k', 'Level', 'Error', 'Message', exception.toString(), 'Sender', name]);
  }

  window.send('show', 'error');
};

var kick = function() {
  options = require(basePath + '/package.json');
  environment = options.environment || 'undefined';
  name = 'Hosts ' + environment.charAt(0).toUpperCase() + environment.slice(1);
};

var main = function() {
  kick();
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

  window.loadUrl('file://' + basePath + '/templates/main.html');
}

var success = function() {
  window.send('show', 'success');
};

var swap = function() {
  var hosts = {
    common: documents + '/Hosts Common.txt',
    development: documents + '/Hosts Development.txt',
    production: documents + '/Hosts Production.txt',
    staging: documents + '/Hosts Staging.txt'
  };

  var hostsCommon;
  var hostsEnvironment;

  try {
    hostsCommon = fs.readFileSync(hosts.common);
    hostsEnvironment = fs.readFileSync(hosts[environment]);

    hostsSwap = (
      hostsCommon.toString().trim()
      + '\n\n'
      + hostsEnvironment.toString().trim()
    ).trim() + '\n';

    fs.writeFileSync('/private/etc/hosts', hostsSwap);
  } catch (exception) {
    return error(exception);
  }

  success();
};

app.on('ready', main);
