var now = new Date();
var firstDay = new Date("2021-04-17");

var toNow = now.getTime();
var toFirst = firstDay.getTime();
var passedTime = toNow - toFirst;

var passedSecond = Math.round(passedTime/(1000));
var passedMinute = Math.round(passedTime/(1000*60));
var passedHour = Math.round(passedTime/(1000*60*60));
var passedDay = Math.round(passedTime/(1000*60*60*24));
