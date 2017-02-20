var parseArgs = require('minimist');

// parse args and default
var argv = parseArgs(process.argv.slice(2), {
  
  r: 90,

  t: 0,

  rand: false

});

// handle exit
process.on('SIGINT', function() {

  process.exit();

});

// info-time simulator
var sim = require('./1dsim.js');

// run simulator
sim(argv.r, argv.t, argv.rand);
