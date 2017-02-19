
var _ = require('underscore');

var ctx = require('axel');

// util to color block
function color (j, v, i) {
  
  // if on a.k.a. 1
  if (v) {

    // green
    ctx.bg(0, 255, 0);
    
    // draw point block
    ctx.point(i, j);

    ctx.cursor.restore();

  }

}

// public info-time simulator
// t is initial state
// s is seed state a.k.a. singularity
// r is curried rule fxn
module.exports = function sim (t, s, r) {

  // init info-time cross-section

  var n = ctx.cols;

  var m = ctx.rows;

  var gen = new Array(n);
  
  gen.fill(t);
  
  // left seed
  //gen[0] = s;

  // center seed
  gen[Math.floor(n / 2)] = s;
  
  // right seed
  //gen[n - 1] = s;

  var j = 0;

  // start inf clock mod m
  setInterval(function () {

    if (j < 1) ctx.clear();

    // yellow
    ctx.bg(255,255,0);

    // black
    ctx.fg(0, 0, 0);

    // draw text block
    ctx.text(2,1,"t % " + m + " = " + j);

    ctx.cursor.restore();

    // map color over cells
    _.each(gen, _.partial(color, j + 1));

    // next gen
    gen = gen.map(r);

    // inc
    j += 1;

    // mod
    j %= m;

  }, 100);

  ctx.cursor.restore();
  
}
