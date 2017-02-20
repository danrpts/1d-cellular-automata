var parseArgs = require('minimist');

var ctx = require('axel');

// parse args and default
var argv = parseArgs(process.argv.slice(2), {
  
  default: {
    r: 30,
    w: ctx.cols,
    h: ctx.rows,
    rand: false
  }

});

// handle exit
process.on('SIGINT', function() {

  process.exit();

});

// info-time simulator
var sim = require('./1dsim.js');

// run simulator
sim(argv.r, argv.w, argv.h, argv.rand);
