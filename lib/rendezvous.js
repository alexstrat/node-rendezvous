require('date-utils');
var parseDuration = require('./parse-duration');
var parseTime = require('./parse-time');

/**
 * Parse a date expression amongs these ones supported :
 *   '3/3/12 12:45'
 *   '3/3/12@12:45:05'
 *   'now'
 *   'today@12:45'
 *   'today-3d'
 *   'now-3h40m'
 *   'today-3d@12:45'
 *
 * Warning : if you use relative dates, don't write the absolute
 * dates with - or +.
 * Example : '2012-3-4-4d' makes no sense for us..
 *
 * Return a valid Date instance
 *
 * @param  {String} expression - expression to parse
 * @return {Date | Boolean}   computed value instance or false if fail
 */
module.exports = function(expression) {
  var date = new Date(expression);
  if(!isNaN(date.valueOf()))
    return date;
  
  var time = parseRelativeTime(expression);
  if(time !== false)
    return Date.today().addMilliseconds(time);

  var split = expression.split('@');
  if(split.length === 2) {
    date = parseRelativeDate(split[0]);
    time = parseRelativeTime(split[1]);

    if((date!==false)&&(time!==false))
      return new Date(date+time);
  }

  return false;
};

//try to match '3+3', 'now-4'..
var additive = /^(.*)([\+\-])(.*)$/i;

/**
 * Try to parse the date part of the full date.
 * For instance :
 *   'today-3d'
 *
 * @param  {String} expression - date expression to parse.
 * @return {Number | boolean}   result in UNIX time or false if fail.
 */
var parseRelativeDate = function(expression) {
  var date = Date.parse(expression);
  if(!isNaN(date))
    return date;

  if(expression === 'today')
    return Date.today().valueOf();

  if(expression === 'yesterday')
    return Date.yesterday().valueOf();

  var duration = parseDuration(expression);
  if(duration!==false)
    return duration;

  var res = additive.exec(expression);
  if(res !== null) {
    var left = parseRelativeDate(res[1]);
    var right = parseRelativeDate(res[3]);
    if((left!==false)&&(right!==false))
      return (res[2] === '+')? left+right : left-right;
  }

  return false;
};

/**
 * Return the number of ms since 0:00:00:000 of the given expression.
 * Example :
 * 12:30+1m
 *
 * @param  {String} expression - time expression to parse
 * @return {number | Boolean} result or false if failed
 */
var parseRelativeTime = function(expression) {
  var time = parseTime(expression);
  if(time!==false)
    return time;

  if(expression === 'now')
    return Date.now() - Date.today();
  
  var duration = parseDuration(expression);
  if(duration!==false)
    return duration;

  var res = additive.exec(expression);
  if(res !== null) {
    var left = parseRelativeTime(res[1]);
    var right = parseRelativeTime(res[3]);
    if((left!==false)&&(right!==false))
      return (res[2] === '+')? left+right : left-right;
  }

  return false;
};