var test = require('tap').test;
var rdv = require('../lib');

test('rdv', function (t) {
  t.type(rdv, 'function', 'Type of require(rendezvous) is function');
  t.end(); 
});

test('rdv.duration', function (t) {
  t.type(rdv.duration, 'function', 'Type of require(rendezvous).duration is function');
  t.end(); 
});

test('rdv.time', function (t) {
  t.type(rdv.time, 'function', 'Type of require(rendezvous).time is function');
  t.end(); 
});