
// public rule fxn
// n is rule # 1-256 (curried in)
// c is cell value
// i is cell index
// a is whole automaton
module.exports = function (n, c, i, a) {

  // cells count
  var h = a.length;

  // left cell idx
  var li = (i - 1 < 0) ? h - 1 : i - 1;

  // right cell idx
  var ri = (i + 1) % h;

  // interpret neighborhood pattern as decimal
  var d = 4 * a[li] + 2 * c + 1 * a[ri];

  // convert decimal rule # to binary string
  var b = n.toString(2);

  // mod 256 for rule # greater than 256
  if (b.length > 8) b = b.substr(b.length - 8);

  // pad high order bits of binary rule # w/ 0s if neccessary
  while (b.length < 8) b = '0' + b;

  // map neighborhood pattern onto binary rule #
  return parseInt(b[7 - d], 2);

}
