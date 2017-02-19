
var _ = require('underscore');

var ctx = require('axel');

function color (j, v, i) {
  
  if (v) {

    ctx.bg(0,255,0);
    
    ctx.point(i, j);

    ctx.cursor.restore();

  }

}

// t is initial state
// s is seed state
// r is fxn between gens
module.exports = function sim (t, s, r) {

  var n = ctx.cols;

  var m = ctx.rows;

  var gen = new Array(n);
  
  gen.fill(t);
  
  gen[Math.floor(n / 2)] = s;

  var j = 0;

  // start infinite clock mod m
  setInterval(function () {

    if (j < 1) ctx.clear();
    ctx.bg(255,255,0);
    ctx.fg(0,0,0);
    ctx.text(2,1,"t % " + m + " = " + j);
    ctx.cursor.restore();

    _.each(gen, _.partial(color, j + 1));

    gen = gen.map(r);

    // inc
    j += 1;

    // mod
    j %= m;

  }, 10);

  ctx.cursor.restore();
  
}
