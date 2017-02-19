var _ = require('underscore');
var parseArgs = require('minimist');

// parse args and default
var argv = parseArgs(process.argv.slice(2), {
  r: 90
});

// rule fxn needs curry
var rule = require('./rule.js');

// curry in rule value
rule = _.partial(rule, argv.r);

// info-time simulator
var sim = require('./sim.js');

// handle exit
process.on('SIGINT', function() {

  process.exit();

});

// run simulator
sim(0, 1, rule);
