/* demo.js */

'use strict';

import noisify from '../../';

[].slice.call(document.querySelectorAll('.noise-canvas'))
  .forEach(function (canvas) {
    let mode;
    if (canvas.width > 300) {
      mode = 'rgb';
    }
    let noisy = noisify(canvas, {mode});
    canvas.addEventListener('click', noisy.stop);
    noisy.start();
  });
