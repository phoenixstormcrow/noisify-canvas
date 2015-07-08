/* noise.js */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var pixel = require('is-little-endian') ? function le(val) {
  return 0xff << 24 | val << 16 | val << 8 | val;
} : function be(val) {
  return val << 24 | val << 16 | val << 8 | 0xff;
};

function generate(ctx) {
  var w = ctx.canvas.width,
      h = ctx.canvas.height,
      imgData = ctx.createImageData(w, h),
      buf = new ArrayBuffer(imgData.data.length),
      pix = new Uint8ClampedArray(buf),
      data = new Uint32Array(buf);

  for (var i = 0, l = data.length; i < l; ++i) {
    var rand = Math.random() * 0xff & 0xff;
    data[i] = pixel(rand);
  }

  imgData.data.set(pix);
  return imgData;
}

exports['default'] = generate;
module.exports = exports['default'];