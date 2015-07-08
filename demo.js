(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"is-little-endian":3}],2:[function(require,module,exports){
/* noisifyCanvas.js */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = noisify;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _noise = require('./noise');

var _noise2 = _interopRequireDefault(_noise);

function noisify(canvas) {
  var reqId = undefined;

  function step(ctx) {
    ctx.putImageData((0, _noise2['default'])(ctx), 0, 0);
    reqId = window.requestAnimationFrame(function () {
      return step(ctx);
    });
  }

  return {
    canvas: canvas,
    start: function start() {
      step(canvas.getContext('2d'));
    },
    stop: function stop() {
      window.cancelAnimationFrame(reqId);
    }
  };
}

module.exports = exports['default'];

},{"./noise":1}],3:[function(require,module,exports){
module.exports = ((new Uint32Array((new Uint8Array([1,2,3,4])).buffer))[0] === 0x04030201)

},{}],4:[function(require,module,exports){
/* demo.js */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ = require('../../');

var _2 = _interopRequireDefault(_);

[].slice.call(document.querySelectorAll('.noise-canvas')).forEach(function (canvas) {
  var noisy = (0, _2['default'])(canvas);
  canvas.addEventListener('click', noisy.stop);
  noisy.start();
});

},{"../../":2}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9waG9lbml4L3dlYi9jYW52YXMtbm9pc2UvbGliL25vaXNlLmpzIiwiL2hvbWUvcGhvZW5peC93ZWIvY2FudmFzLW5vaXNlL2xpYi9ub2lzaWZ5Q2FudmFzLmpzIiwibm9kZV9tb2R1bGVzL2lzLWxpdHRsZS1lbmRpYW4vaW5kZXguanMiLCIvaG9tZS9waG9lbml4L3dlYi9jYW52YXMtbm9pc2Uvc3JjL2RlbW8vZGVtby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDRUEsWUFBWSxDQUFDOztBQUViLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRTtBQUMzQyxPQUFLLEVBQUUsSUFBSTtDQUNaLENBQUMsQ0FBQztBQUNILElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRTtBQUN6RCxTQUFPLElBQUksSUFBSSxFQUFFLEdBQUcsR0FBRyxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztDQUNoRCxHQUFHLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRTtBQUNuQixTQUFPLEdBQUcsSUFBSSxFQUFFLEdBQUcsR0FBRyxJQUFJLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztDQUNoRCxDQUFDOztBQUVGLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRTtBQUNyQixNQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUs7TUFDcEIsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTTtNQUNyQixPQUFPLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO01BQ25DLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENB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bnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBub2lzZS5qcyAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIHBpeGVsID0gcmVxdWlyZSgnaXMtbGl0dGxlLWVuZGlhbicpID8gZnVuY3Rpb24gbGUodmFsKSB7XG4gIHJldHVybiAweGZmIDw8IDI0IHwgdmFsIDw8IDE2IHwgdmFsIDw8IDggfCB2YWw7XG59IDogZnVuY3Rpb24gYmUodmFsKSB7XG4gIHJldHVybiB2YWwgPDwgMjQgfCB2YWwgPDwgMTYgfCB2YWwgPDwgOCB8IDB4ZmY7XG59O1xuXG5mdW5jdGlvbiBnZW5lcmF0ZShjdHgpIHtcbiAgdmFyIHcgPSBjdHguY2FudmFzLndpZHRoLFxuICAgICAgaCA9IGN0eC5jYW52YXMuaGVpZ2h0LFxuICAgICAgaW1nRGF0YSA9IGN0eC5jcmVhdGVJbWFnZURhdGEodywgaCksXG4gICAgICBidWYgPSBuZXcgQXJyYXlCdWZmZXIoaW1nRGF0YS5kYXRhLmxlbmd0aCksXG4gICAgICBwaXggPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoYnVmKSxcbiAgICAgIGRhdGEgPSBuZXcgVWludDMyQXJyYXkoYnVmKTtcblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGRhdGEubGVuZ3RoOyBpIDwgbDsgKytpKSB7XG4gICAgdmFyIHJhbmQgPSBNYXRoLnJhbmRvbSgpICogMHhmZiAmIDB4ZmY7XG4gICAgZGF0YVtpXSA9IHBpeGVsKHJhbmQpO1xuICB9XG5cbiAgaW1nRGF0YS5kYXRhLnNldChwaXgpO1xuICByZXR1cm4gaW1nRGF0YTtcbn1cblxuZXhwb3J0c1snZGVmYXVsdCddID0gZ2VuZXJhdGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCIvKiBub2lzaWZ5Q2FudmFzLmpzICovXG5cbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzWydkZWZhdWx0J10gPSBub2lzaWZ5O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfbm9pc2UgPSByZXF1aXJlKCcuL25vaXNlJyk7XG5cbnZhciBfbm9pc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfbm9pc2UpO1xuXG5mdW5jdGlvbiBub2lzaWZ5KGNhbnZhcykge1xuICB2YXIgcmVxSWQgPSB1bmRlZmluZWQ7XG5cbiAgZnVuY3Rpb24gc3RlcChjdHgpIHtcbiAgICBjdHgucHV0SW1hZ2VEYXRhKCgwLCBfbm9pc2UyWydkZWZhdWx0J10pKGN0eCksIDAsIDApO1xuICAgIHJlcUlkID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gc3RlcChjdHgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjYW52YXM6IGNhbnZhcyxcbiAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICBzdGVwKGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpKTtcbiAgICB9LFxuICAgIHN0b3A6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUocmVxSWQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwibW9kdWxlLmV4cG9ydHMgPSAoKG5ldyBVaW50MzJBcnJheSgobmV3IFVpbnQ4QXJyYXkoWzEsMiwzLDRdKSkuYnVmZmVyKSlbMF0gPT09IDB4MDQwMzAyMDEpXG4iLCIvKiBkZW1vLmpzICovXG5cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IG5vaXNpZnkgZnJvbSAnLi4vLi4vJztcblxuW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubm9pc2UtY2FudmFzJykpXG4gIC5mb3JFYWNoKGZ1bmN0aW9uIChjYW52YXMpIHtcbiAgICBsZXQgbm9pc3kgPSBub2lzaWZ5KGNhbnZhcyk7XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbm9pc3kuc3RvcCk7XG4gICAgbm9pc3kuc3RhcnQoKTtcbiAgfSk7XG4iXX0=
