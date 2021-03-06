'use strict';

var test = require('tap').test;
var rewire = require('rewire');

var citgm = rewire('../lib/citgm');
var find = citgm.__get__('find');

test('citgm: omg-i-pass', function (t) {
  var options = {
    script: null,
    hmac: null,
    lookup: null,
    nodedir: null,
    level: null
  };

  var mod = 'omg-i-pass';

  citgm.Tester(mod, options)
  .on('start', function (name) {
    t.equals(name, mod, 'it should be omg-i-pass');
  }).on('fail', function (err) {
    t.error(err);
  }).on('end', function () {
    t.notOk(process.exitCode, 'it should not exit');
    t.end();
  }).run();
});

test('citgm: omg-i-pass from git url', function (t) {
  var options = {
    script: null,
    hmac: null,
    lookup: null,
    nodedir: null,
    level: null
  };

  var mod = 'git+https://github.com/MylesBorins/omg-i-pass';

  citgm.Tester(mod, options)
  .on('start', function (name) {
    t.equals(name, mod, 'it should be omg-i-pass');
  }).on('fail', function (err) {
    t.error(err);
  }).on('end', function () {
    t.notOk(process.exitCode, 'it should not exit');
    t.end();
  }).run();
});

test('citgm: internal function find with error', function (t) {
  var which = citgm.__get__('which');
  citgm.__set__('which', function (app, next) {
    return next('Error');
  });
  find(undefined, undefined, function (err) {
    t.equals(err && err.message, 'undefined not found in path!');
    citgm.__set__('which', which);
    t.end();
  });
});
