!function() {
  'use strict';

  var ipc = require('ipc');
  var message;

  var bind = function() {
    ipc.on('show', show);
  };

  var cache = function() {
    message = document.querySelector('.message');
  };

  var hid = function() {
    ipc.send('hid');
  };

  var hide = function(which) {
    message.classList.add('message--hidden');
    setTimeout(hid, 1250);
  };

  var main = function() {
    cache();
    bind();
    trigger();
  };

  var show = function(which) {
    message.classList.add('message--' + which);
    message.classList.remove('message--hidden');
    setTimeout(hide, 750, which);
  };

  var trigger = function() {
    ipc.send('ready');
  };

  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', main);
  } else {
    main();
  }
}();
