var fs = require('fs');

var parseArgs = require('minimist');

// parse args and default
var argv = parseArgs(process.argv.slice(2), {
  
  default: {

    // cells (width)
    w: process.stdout.columns,

    // time (height)
    h: process.stdout.rows,
    
    // rule number
    r: 30,

    // random seed switch
    rand: false

  }

});

// handle exit
process.on('SIGINT', function() {

  process.exit();

});

// expected byte count
var length = Math.ceil(argv.w / 8) * argv.h;

// TODO if (length > SOME_MAX) exit on error

// TODO handle other errors

var simulate = require('./1dsim.js');

// create new simulation
simulate(argv.w, argv.h, argv.r, argv.rand, function (buf) {

  log(buf);

});


function log (buf) {

  var vw = new DataView(buf);

  var s = '';

  for (var bo = 0; bo < Math.ceil(argv.w / 8); bo++) {

    var t = vw.getUint8(bo).toString(2);

    while (t.length < 8) t = '0' + t;

    s += t;

  }

  // truncate string
  s = s.substr(0, argv.w);

  console.log(s);

} 

