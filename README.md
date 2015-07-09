# noisify-canvas

Animate an html canvas with noise.

## installation

```
npm install noisify-canvas
```

## usage

### commonjs:
```
var noisify = require('noisify-canvas');
```

### es2015:
```
import noisify from './node_modules/noisify-canvas';
```

This module exports a function which takes an html canvas as a parameter, and returns an object with three fields: `canvas`, the canvas it was passed, `start`, a function which starts the animation, and `stop`, a function which stops the animation.

The function accepts an optional parameter, which should be an object specifying the `mode`:

```
noisify(canvas, {mode: 'rgb'|'grey'});
```

The default mode is `'grey'`, which generates greyscale noise. Setting it to `'rgb'` will generate color noise. In both cases, all pixels will be fully opaque, that is, the alpha channel is always set to `0xff`.

### example
```
<!-- example html-->
<canvas id='noisy'></canvas>
```
```
/* example js */
var noisify = require('noisify-canvas'),
    canvas = document.getElementById('noisy'),
    noisy = noisify(canvas);

noisy.start();
```

See the [demo](http://phoenixstormcrow.github.io/noisify-canvas/) for another example.

## about the code

Untranspiled es6 code is in the `src` directory, and is transpiled using babel into the `lib` directory.
The included `.eslintrc` is copied, probably verbatim, from Eric Elliott's [gist](https://gist.github.com/ericelliott/ce988c1a808ad903a528).

## license

[MIT](LICENSE) license.
