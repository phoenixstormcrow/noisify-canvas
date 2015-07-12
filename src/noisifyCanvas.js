/* noisifyCanvas.js */

'use strict';

function rand () {
  return Math.random() * 0xff & 0xff;
}

let pixel = require('is-little-endian') ?
      function le (r, g, b) {
        return (0xff << 24) | (b << 16) | (g << 8) | r;
      } :
      function be (r, g, b) {
        return (r << 24) | (g << 16) | (b << 8) | 0xff;
      };

function generate (ctx, {mode = 'grey'} = {}) {
  let w = ctx.canvas.width, h = ctx.canvas.height,
    imgData = ctx.createImageData(w, h),
    buf = new ArrayBuffer(imgData.data.length),
    pix = new Uint8ClampedArray(buf),
    data = new Uint32Array(buf);

  for (let i = 0, l = data.length; i < l; ++i) {
    let r, g, b;
    if (mode === 'rgb') {
      [r, g, b] = [rand(), rand(), rand()];
    } else {
      r = g = b = rand();
    }
    data[i] = pixel(r, g, b);
  }

  imgData.data.set(pix);
  return imgData;
}

export default function noisify (canvas, opts) {
  let reqId;

  function step (ctx) {
    ctx.putImageData(generate(ctx, opts), 0, 0);
    reqId = window.requestAnimationFrame(() => step(ctx));
  }

  return {
    canvas,
    start () {
      step(canvas.getContext('2d'));
    },
    stop () {
      window.cancelAnimationFrame(reqId);
    }
  };
}
