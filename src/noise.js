/* noise.js */

'use strict';

let pixel = require('is-little-endian') ?
      function le (val) {
        return (0xff << 24) | (val << 16) | (val << 8) | val;
      } :
      function be (val) {
        return (val << 24) | (val << 16) | (val << 8) | 0xff;
      };

function generate (ctx) {
  let w = ctx.canvas.width, h = ctx.canvas.height,
    imgData = ctx.createImageData(w, h),
    buf = new ArrayBuffer(imgData.data.length),
    pix = new Uint8ClampedArray(buf),
    data = new Uint32Array(buf);

  for (let i = 0, l = data.length; i < l; ++i) {
    let rand = Math.random() * 0xff & 0xff;
    data[i] = pixel(rand);
  }

  imgData.data.set(pix);
  return imgData;
}

export default generate;
