/* noisifyCanvas.js */

'use strict';

import generate from './noise';

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
