var _ = require('underscore');

var ctx = require('axel');

// private fxn
// yi
// cv
// xi
function color (yi, cv, xi) {
  
  // if on a.k.a. 1
  if (cv) {

    // green
    ctx.bg(0, 255, 0);
    
    // draw point block
    ctx.point(xi, yi);

    // reset color
    ctx.cursor.reset();

  }

}

// private fxn
// rn is rule # 1-256 (curried in)
// cv is cell value
// ci is cell index
// aa is whole automaton array
function rule (rn, cv, ci, aa) {

  // cells count
  var hn = aa.length;

  // left cell idx
  var li = (ci - 1 < 0) ? hn - 1 : ci - 1;

  // right cell idx
  var ri = (ci + 1) % hn;

  // interpret neighborhood pattern as decimal
  var d = 4 * aa[li] + 2 * cv + 1 * aa[ri];

  // convert decimal rule # to binary string
  var bs = rn.toString(2);

  // mod 256 for rule # greater than 256
  if (bs.length > 8) bs = bs.substr(bs.length - 8);

  // pad high order bits of binary rule # w/ 0s if neccessary
  while (bs.length < 8) bs = '0' + bs;

  // map neighborhood pattern onto binary rule #
  return parseInt(bs[7 - d], 2);

}


// public fxn
// rn is rule fxn
// rb is random seed(s) boolean
// cn is cell count
// tn is gen count (discrete time)
module.exports = function (rn, cn, tn, rb) {

  // curry rule fxn
  var rf = _.partial(rule, rn);

  // cell-generation array (info-time cross-section)
  var gen = new Array(cn);

  // fill all with 0s
  gen.fill(0);

  if (! rb) {

    // seed center cell
    gen[Math.floor(cn / 2)] = 1;
    
  } else {

    // use random seed(s)
    gen = gen.map(function () {

      // 0 or 1
      return Math.round(_.random(1));
    
    });

  }
  
  // time index 0
  var ti = 0;

  ctx.clear();

  while (ti < tn - 1) {

    // map color over cells
    _.each(gen, _.partial(color, ti + 1));

    // create next gen
    gen = gen.map(rf);

    // inc time
    ti++;

  }

  ctx.goto(0, tn);
  
}
