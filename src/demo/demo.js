/* demo.js */

'use strict';

import noisify from '../../';

[].slice.call(document.querySelectorAll('.noise-canvas'))
  .forEach(function (canvas) {
    let noisy = noisify(canvas);
    canvas.addEventListener('click', noisy.stop);
    noisy.start();
  });
