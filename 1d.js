
var _ = require('underscore');


// get args and set defaults
var parseArgs = require('minimist');
var argv = parseArgs(process.argv.slice(2), {
  r: 90
});

// get the rule fxn
var rule = require('./rule.js');

// information-time grapher
var sim = require('./sim.js');

// handle exit
process.on('SIGINT', function() {
  process.exit();
});

// curry in rule value and simulate
sim(0, 1, _.partial(rule, argv.r));
