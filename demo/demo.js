(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = ((new Uint32Array((new Uint8Array([1,2,3,4])).buffer))[0] === 0x04030201)

},{}],2:[function(require,module,exports){
/* demo.js */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _noisifyCanvas = require('../noisifyCanvas');

var _noisifyCanvas2 = _interopRequireDefault(_noisifyCanvas);

[].slice.call(document.querySelectorAll('.noise-canvas')).forEach(function (canvas) {
  var mode = undefined;
  if (canvas.width > 300) {
    mode = 'rgb';
  }
  var noisy = (0, _noisifyCanvas2['default'])(canvas, { mode: mode });
  canvas.addEventListener('click', noisy.stop);
  noisy.start();
});

},{"../noisifyCanvas":3}],3:[function(require,module,exports){
/* noisifyCanvas.js */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = noisify;
function rand() {
  return Math.random() * 0xff & 0xff;
}

var pixel = require('is-little-endian') ? function le(r, g, b) {
  return 0xff << 24 | b << 16 | g << 8 | r;
} : function be(r, g, b) {
  return r << 24 | g << 16 | b << 8 | 0xff;
};

function generate(ctx) {
  var _ref = arguments[1] === undefined ? {} : arguments[1];

  var _ref$mode = _ref.mode;
  var mode = _ref$mode === undefined ? 'grey' : _ref$mode;

  var w = ctx.canvas.width,
      h = ctx.canvas.height,
      imgData = ctx.createImageData(w, h),
      buf = new ArrayBuffer(imgData.data.length),
      pix = new Uint8ClampedArray(buf),
      data = new Uint32Array(buf);

  for (var i = 0, l = data.length; i < l; ++i) {
    var r = undefined,
        g = undefined,
        b = undefined;
    if (mode === 'rgb') {
      r = rand();
      g = rand();
      b = rand();
    } else {
      r = g = b = rand();
    }
    data[i] = pixel(r, g, b);
  }

  imgData.data.set(pix);
  return imgData;
}

function noisify(canvas, opts) {
  var reqId = undefined;

  function step(ctx) {
    ctx.putImageData(generate(ctx, opts), 0, 0);
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

},{"is-little-endian":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvaXMtbGl0dGxlLWVuZGlhbi9pbmRleC5qcyIsIi9ob21lL3Bob2VuaXgvd2ViL2NhbnZhcy1ub2lzZS9zcmMvZGVtby9kZW1vLmpzIiwiL2hvbWUvcGhvZW5peC93ZWIvY2FudmFzLW5vaXNlL3NyYy9ub2lzaWZ5Q2FudmFzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTs7OztBQ0NBLFlBQVksQ0FBQzs7Ozs2QkFFTyxrQkFBa0I7Ozs7QUFFdEMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQ3RELE9BQU8sQ0FBQyxVQUFVLE1BQU0sRUFBRTtBQUN6QixNQUFJLElBQUksWUFBQSxDQUFDO0FBQ1QsTUFBSSxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRTtBQUN0QixRQUFJLEdBQUcsS0FBSyxDQUFDO0dBQ2Q7QUFDRCxNQUFJLEtBQUssR0FBRyxnQ0FBUSxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUosSUFBSSxFQUFDLENBQUMsQ0FBQztBQUNwQyxRQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QyxPQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Q0FDZixDQUFDLENBQUM7Ozs7O0FDYkwsWUFBWSxDQUFDOzs7OztxQkFtQ1csT0FBTztBQWpDL0IsU0FBUyxJQUFJLEdBQUk7QUFDZixTQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQ3BDOztBQUVELElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUNqQyxTQUFTLEVBQUUsQ0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNwQixTQUFPLElBQUssSUFBSSxFQUFFLEdBQUssQ0FBQyxJQUFJLEVBQUUsR0FBSyxDQUFDLElBQUksQ0FBQyxHQUFJLENBQUMsQ0FBQztDQUNoRCxHQUNELFNBQVMsRUFBRSxDQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3BCLFNBQU8sQ0FBRSxJQUFJLEVBQUUsR0FBSyxDQUFDLElBQUksRUFBRSxHQUFLLENBQUMsSUFBSSxDQUFDLEdBQUksSUFBSSxDQUFDO0NBQ2hELENBQUM7O0FBRVIsU0FBUyxRQUFRLENBQUUsR0FBRyxFQUF3QjswQ0FBSixFQUFFOzt1QkFBbkIsSUFBSTtNQUFKLElBQUksNkJBQUcsTUFBTTs7QUFDcEMsTUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLO01BQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTTtNQUM3QyxPQUFPLEdBQUcsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO01BQ25DLEdBQUcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztNQUMxQyxHQUFHLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxHQUFHLENBQUM7TUFDaEMsSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUU5QixPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO0FBQzNDLFFBQUksQ0FBQyxZQUFBO1FBQUUsQ0FBQyxZQUFBO1FBQUUsQ0FBQyxZQUFBLENBQUM7QUFDWixRQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7QUFDakIsT0FBQyxHQUFXLElBQUksRUFBRTtBQUFmLE9BQUMsR0FBZ0IsSUFBSSxFQUFFO0FBQXBCLE9BQUMsR0FBcUIsSUFBSSxFQUFFO0tBQ3BDLE1BQU07QUFDTCxPQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztLQUNwQjtBQUNELFFBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztHQUMxQjs7QUFFRCxTQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QixTQUFPLE9BQU8sQ0FBQztDQUNoQjs7QUFFYyxTQUFTLE9BQU8sQ0FBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO0FBQzdDLE1BQUksS0FBSyxZQUFBLENBQUM7O0FBRVYsV0FBUyxJQUFJLENBQUUsR0FBRyxFQUFFO0FBQ2xCLE9BQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDNUMsU0FBSyxHQUFHLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQzthQUFNLElBQUksQ0FBQyxHQUFHLENBQUM7S0FBQSxDQUFDLENBQUM7R0FDdkQ7O0FBRUQsU0FBTztBQUNMLFVBQU0sRUFBTixNQUFNO0FBQ04sU0FBSyxFQUFDLGlCQUFHO0FBQ1AsVUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUMvQjtBQUNELFFBQUksRUFBQyxnQkFBRztBQUNOLFlBQU0sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNwQztHQUNGLENBQUM7Q0FDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9ICgobmV3IFVpbnQzMkFycmF5KChuZXcgVWludDhBcnJheShbMSwyLDMsNF0pKS5idWZmZXIpKVswXSA9PT0gMHgwNDAzMDIwMSlcbiIsIi8qIGRlbW8uanMgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgbm9pc2lmeSBmcm9tICcuLi9ub2lzaWZ5Q2FudmFzJztcblxuW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubm9pc2UtY2FudmFzJykpXG4gIC5mb3JFYWNoKGZ1bmN0aW9uIChjYW52YXMpIHtcbiAgICBsZXQgbW9kZTtcbiAgICBpZiAoY2FudmFzLndpZHRoID4gMzAwKSB7XG4gICAgICBtb2RlID0gJ3JnYic7XG4gICAgfVxuICAgIGxldCBub2lzeSA9IG5vaXNpZnkoY2FudmFzLCB7bW9kZX0pO1xuICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG5vaXN5LnN0b3ApO1xuICAgIG5vaXN5LnN0YXJ0KCk7XG4gIH0pO1xuIiwiLyogbm9pc2lmeUNhbnZhcy5qcyAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHJhbmQgKCkge1xuICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIDB4ZmYgJiAweGZmO1xufVxuXG5sZXQgcGl4ZWwgPSByZXF1aXJlKCdpcy1saXR0bGUtZW5kaWFuJykgP1xuICAgICAgZnVuY3Rpb24gbGUgKHIsIGcsIGIpIHtcbiAgICAgICAgcmV0dXJuICgweGZmIDw8IDI0KSB8IChiIDw8IDE2KSB8IChnIDw8IDgpIHwgcjtcbiAgICAgIH0gOlxuICAgICAgZnVuY3Rpb24gYmUgKHIsIGcsIGIpIHtcbiAgICAgICAgcmV0dXJuIChyIDw8IDI0KSB8IChnIDw8IDE2KSB8IChiIDw8IDgpIHwgMHhmZjtcbiAgICAgIH07XG5cbmZ1bmN0aW9uIGdlbmVyYXRlIChjdHgsIHttb2RlID0gJ2dyZXknfSA9IHt9KSB7XG4gIGxldCB3ID0gY3R4LmNhbnZhcy53aWR0aCwgaCA9IGN0eC5jYW52YXMuaGVpZ2h0LFxuICAgIGltZ0RhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHcsIGgpLFxuICAgIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihpbWdEYXRhLmRhdGEubGVuZ3RoKSxcbiAgICBwaXggPSBuZXcgVWludDhDbGFtcGVkQXJyYXkoYnVmKSxcbiAgICBkYXRhID0gbmV3IFVpbnQzMkFycmF5KGJ1Zik7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGwgPSBkYXRhLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgIGxldCByLCBnLCBiO1xuICAgIGlmIChtb2RlID09PSAncmdiJykge1xuICAgICAgW3IsIGcsIGJdID0gW3JhbmQoKSwgcmFuZCgpLCByYW5kKCldO1xuICAgIH0gZWxzZSB7XG4gICAgICByID0gZyA9IGIgPSByYW5kKCk7XG4gICAgfVxuICAgIGRhdGFbaV0gPSBwaXhlbChyLCBnLCBiKTtcbiAgfVxuXG4gIGltZ0RhdGEuZGF0YS5zZXQocGl4KTtcbiAgcmV0dXJuIGltZ0RhdGE7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5vaXNpZnkgKGNhbnZhcywgb3B0cykge1xuICBsZXQgcmVxSWQ7XG5cbiAgZnVuY3Rpb24gc3RlcCAoY3R4KSB7XG4gICAgY3R4LnB1dEltYWdlRGF0YShnZW5lcmF0ZShjdHgsIG9wdHMpLCAwLCAwKTtcbiAgICByZXFJZCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gc3RlcChjdHgpKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY2FudmFzLFxuICAgIHN0YXJ0ICgpIHtcbiAgICAgIHN0ZXAoY2FudmFzLmdldENvbnRleHQoJzJkJykpO1xuICAgIH0sXG4gICAgc3RvcCAoKSB7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUocmVxSWQpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==
