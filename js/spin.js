(function () {
  const product = window.LOCOFO_PRODUCT;
  const frameSrcs = product.frames;
  const frameCount = frameSrcs.length;

  const stage = document.getElementById('spinStage');
  const canvas = document.getElementById('spinCanvas');
  if (!stage || !canvas) return;

  const ctx = canvas.getContext('2d');
  const badge = document.getElementById('frameBadge');
  const pillsEl = document.getElementById('framePills');

  const pillSpans = frameSrcs.map((_, i) => {
    const s = document.createElement('span');
    if (i === 0) s.classList.add('on');
    pillsEl.appendChild(s);
    return s;
  });

  const images = frameSrcs.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const frameListeners = [];
  let position = 0;
  let target = 0;
  let shown = 0;
  let holdTab = false;
  let raf = 0;
  let lastTick = 0;

  function clampFrame(index) {
    return Math.min(frameCount - 1, Math.max(0, index));
  }

  function drawContained(targetCtx, img, alpha) {
    if (!img?.complete || !img.naturalWidth || alpha <= 0) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;
    targetCtx.save();
    targetCtx.globalAlpha = alpha;
    targetCtx.drawImage(img, x, y, w, h);
    targetCtx.restore();
  }

  function paint(pos) {
    const clamped = clampFrame(pos);
    const index = Math.floor(clamped + 1e-6);
    const frac = clamped - index;
    const next = Math.min(frameCount - 1, index + 1);
    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, cw, ch);
    if (frac < 0.004 || index === next) {
      drawContained(ctx, images[index], 1);
    } else {
      drawContained(ctx, images[index], 1 - frac);
      drawContained(ctx, images[next], frac);
    }

    const nearest = frac >= 0.5 ? next : index;
    if (nearest === shown) return;
    shown = nearest;
    if (badge) badge.textContent = `${shown + 1} / ${frameCount}`;
    pillSpans.forEach((s, i) => s.classList.toggle('on', i === shown));
    if (!holdTab) frameListeners.forEach((fn) => fn(shown));
  }

  function settle() {
    if (Math.abs(position - target) > 0.001) return;
    position = target;
    holdTab = false;
    paint(position);
    releaseWheelLock();
  }

  function tick(now) {
    const dt = lastTick ? Math.min(34, now - lastTick) : 16;
    lastTick = now;
    const diff = target - position;
    if (reduceMotion || Math.abs(diff) < 0.0015) {
      position = target;
      paint(position);
      settle();
      raf = 0;
      lastTick = 0;
      return;
    }
    const follow = dragging ? 90 : 380;
    position += diff * (1 - Math.exp(-dt / follow));
    paint(position);
    raf = requestAnimationFrame(tick);
  }

  function start() {
    if (raf) return;
    lastTick = 0;
    raf = requestAnimationFrame(tick);
  }

  function nudge(delta) {
    holdTab = false;
    target = clampFrame(target + delta);
    start();
  }

  function setFrame(index) {
    const next = clampFrame(index);
    if (next === target && Math.abs(position - next) < 0.001) return;
    holdTab = true;
    target = next;
    start();
  }

  /* One gesture moves one tab, then waits until that scroll has finished. */
  let wheelAccum = 0;
  let wheelLocked = false;
  let wheelQuietUntil = 0;
  let wheelTimer = 0;
  const wheelStep = 70;
  const wheelQuietMs = 260;

  function wheelPixels(e) {
    if (e.deltaMode === 1) return e.deltaY * 16;
    if (e.deltaMode === 2) return e.deltaY * window.innerHeight;
    return e.deltaY;
  }

  function releaseWheelLock() {
    if (!wheelLocked) return;
    if (Date.now() < wheelQuietUntil) return;
    wheelLocked = false;
    wheelAccum = 0;
  }

  function armWheelRelease() {
    window.clearTimeout(wheelTimer);
    wheelTimer = window.setTimeout(releaseWheelLock, wheelQuietMs + 30);
  }

  window.addEventListener(
    'wheel',
    (e) => {
      if (document.body.classList.contains('drawer-open')) return;
      if (e.target.closest && e.target.closest('.drawer')) return;
      e.preventDefault();
      wheelQuietUntil = Date.now() + wheelQuietMs;
      if (wheelLocked) {
        armWheelRelease();
        return;
      }
      wheelAccum += wheelPixels(e);
      if (Math.abs(wheelAccum) < wheelStep) return;
      const dir = wheelAccum > 0 ? 1 : -1;
      wheelAccum = 0;
      wheelLocked = true;
      nudge(dir);
      armWheelRelease();
    },
    { passive: false }
  );

  /* Drag scrub (pointer + mouse for broad compatibility) */
  let dragging = false;
  let lastX = 0;
  const dragThreshold = 28;

  function onDragStart(clientX, pointerId) {
    dragging = true;
    lastX = clientX;
    stage.classList.add('is-dragging');
    if (pointerId != null && stage.setPointerCapture) {
      try {
        stage.setPointerCapture(pointerId);
      } catch {
        /* ignore */
      }
    }
  }

  function onDragMove(clientX) {
    if (!dragging) return;
    const dx = clientX - lastX;
    if (Math.abs(dx) >= dragThreshold) {
      nudge(dx > 0 ? 1 : -1);
      lastX = clientX;
    }
  }

  function endDrag(pointerId) {
    if (!dragging) return;
    dragging = false;
    stage.classList.remove('is-dragging');
    if (pointerId != null && stage.releasePointerCapture) {
      try {
        stage.releasePointerCapture(pointerId);
      } catch {
        /* ignore */
      }
    }
  }

  stage.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    onDragStart(e.clientX, e.pointerId);
  });
  stage.addEventListener('pointermove', (e) => onDragMove(e.clientX));
  stage.addEventListener('pointerup', (e) => endDrag(e.pointerId));
  stage.addEventListener('pointercancel', (e) => endDrag(e.pointerId));

  stage.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    onDragStart(e.clientX, null);
  });
  window.addEventListener('mousemove', (e) => onDragMove(e.clientX));
  window.addEventListener('mouseup', () => endDrag(null));

  images.forEach((img) => {
    const done = () => paint(position);
    if (img.complete) done();
    else {
      img.onload = done;
      img.onerror = done;
    }
  });
  paint(0);

  window.LocofoSpin = {
    setFrame,
    getFrame: () => shown,
    onFrame(fn) {
      frameListeners.push(fn);
    },
  };
})();
