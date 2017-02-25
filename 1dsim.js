
var _ = require('underscore');

function seed (n, rand) {

  // bytes size
  var size = Math.ceil(n / 8);

  // generation buffer (only use n bits)
  var buf = new ArrayBuffer(size);

  // generation buffer view
  var vw = new DataView(buf);

  // center w/ respect to n (is this necessary?)
  if (!rand) {

    // center bit index
    var i = Math.floor((n - 1) / 2);

    // index relative to its byte
    var r = i % 8;

    // center byte offset
    var o = Math.floor(i / 8);

    // if even then double seed else single
    var s = (n % 2 === 0) ? 192 : 128;

    // shift in the seed
    vw.setUint8(o, s >>> r);

  // use random seed(s)
  } else {

    // for each byte
    for (var o = 0; o < size; o++) {

      // set random 8-bits
      vw.setUint8(o, _.random(0, 255));

    }

  }
  
  return buf;

}

function next_gen (seed, n, r) {

  // bytes size
  var size = Math.ceil(n / 8);

  // next generation buffer
  var buf = new ArrayBuffer(size);

  // next generation buffer view
  var vw = new DataView(buf);

  // seed buffer view
  var svw = new DataView(seed);

  // next generation byte buffer
  var byte_buf = 0;

  // TODO stream generation to stdout here
  for (var sbi = 0; sbi < n; sbi++) {

    // relative "self bit" index 
    var rsbi = sbi % 8;

    // byte offset
    var sbo = Math.floor(sbi / 8);
    var lbo = sbo; // case: left bit is in this byte
    var rbo = sbo; // case: right bit is in this byte

    // bit index
    var lbi = sbi - 1;
    var rbi = sbi + 1;

    // case: left bit is in very last byte (at some index)
    if (sbi === 0) {
      lbo = size - 1;
      lbi = n - 1;
    }

    // case: left bit is in previous byte (as lsb index 7)
    else if (rsbi === 0) {
      lbo = sbo - 1;
      lbi = 7;
    }

    // case: right bit is in very first byte (at 0 index)
    if (sbi === n - 1) {
      rbo = 0;
      rbi = 0;
    }

    // case: right bit is in the next byte (as msb index 0)
    else if (rsbi === 7) {
      rbo = sbo + 1;
      rbi = 0;
    }

    // left, center, and right bits
    var lb = svw.getUint8(lbo);
    var sb = svw.getUint8(sbo);
    var rb = svw.getUint8(rbo);

    // shift bit to lsb of byte
    lb >>>= 7 - lbi % 8;
    sb >>>= 7 - rsbi;
    rb >>>= 7 - rbi % 8;

    // pull bit out
    lb &= 1;
    sb &= 1;
    rb &= 1;

    // interpret pattern as decimal
    var d = 4 * lb + 2 * sb + 1 * rb;

    // convert decimal rule to binary string
    var bs = r.toString(2);

    // pad high order bits of binary rule # w/ 0s if neccessary
    while (bs.length < 8) bs = '0' + bs;

    // shift on 0 lsb
    byte_buf <<= 1

    // flip lsb to 1
    if (parseInt(bs[7 - d], 2) === 1) byte_buf |= 1;

    // when byte read or end of bits
    if (rsbi === 7 || sbi === n - 1) {

      byte_buf <<= 7 - rsbi;

      vw.setUint8(sbo, byte_buf);

      byte_buf *= 0;

    }

  }

  return buf;

}

module.exports = function (w, h, r, rand, callback) {

  var buf = seed(w, rand);

  var t = 0;

  while (t < h) {

    callback(buf);

    buf = next_gen(buf, w, r);

    t++;

  }
}
