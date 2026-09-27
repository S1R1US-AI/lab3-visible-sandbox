/* Soft Matrix rain ghost — DRAFT soft-launch front door.
   Low opacity overlay; pointer-events none; pauses when tab hidden. */
(function () {
  'use strict';
  var canvas = document.getElementById('matrix-rain');
  if (!canvas || !canvas.getContext) return;

  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var cols = [];
  var fontSize = 14;
  var chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>[]{}|/\\$#@*%+=~';
  var running = true;
  var last = 0;
  var interval = 55;

  function resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.ceil(w / fontSize);
    cols = new Array(n);
    for (var i = 0; i < n; i++) {
      cols[i] = Math.random() * -40;
    }
  }

  function frame(ts) {
    if (!running) {
      requestAnimationFrame(frame);
      return;
    }
    if (ts - last < interval) {
      requestAnimationFrame(frame);
      return;
    }
    last = ts;

    var w = window.innerWidth;
    var h = window.innerHeight;
    ctx.fillStyle = 'rgba(18, 22, 25, 0.12)';
    ctx.fillRect(0, 0, w, h);
    ctx.font = fontSize + 'px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
    ctx.fillStyle = 'rgba(46, 196, 120, 0.55)';

    for (var i = 0; i < cols.length; i++) {
      var ch = chars.charAt((Math.random() * chars.length) | 0);
      var x = i * fontSize;
      var y = cols[i] * fontSize;
      ctx.fillText(ch, x, y);
      if (y > h && Math.random() > 0.975) cols[i] = 0;
      else cols[i]++;
    }
    requestAnimationFrame(frame);
  }

  document.addEventListener('visibilitychange', function () {
    running = !document.hidden;
  });

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(frame);
})();
