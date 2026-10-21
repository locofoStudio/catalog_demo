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
    let index = Math.floor(clamped);
    let frac = clamped - index;
    if (index >= frameCount - 1) {
      index = frameCount - 1;
      frac = 0;
    }
    const next = Math.min(frameCount - 1, index + 1);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawContained(ctx, images[index], 1);
    if (frac > 0.001 && index !== next) drawContained(ctx, images[next], frac);
  }

  function syncChrome(index, notify) {
    shown = index;
    if (badge) badge.textContent = `${index + 1} / ${frameCount}`;
    pillSpans.forEach((s, i) => s.classList.toggle('on', i === index));
    if (notify) frameListeners.forEach((fn) => fn(index));
  }

  /* Glide to the next frame in a fixed time so the motion actually lands. */
  let animFrom = 0;
  let animStart = 0;
  let blendFrom = 0;
  let blendTo = 0;
  let useDirect = false;
  const animMs = 520;

  function paintBlend(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawContained(ctx, images[blendFrom], 1);
    if (blendFrom !== blendTo && t > 0.001) drawContained(ctx, images[blendTo], t);
  }

  function finishAnim() {
    raf = 0;
    useDirect = false;
    position = target;
    holdTab = false;
    paint(position);
  }

  function tick(now) {
    const t = reduceMotion ? 1 : Math.min(1, (now - animStart) / animMs);
    const eased = 1 - (1 - t) ** 3;
    if (useDirect) {
      paintBlend(eased);
    } else {
      position = animFrom + (target - animFrom) * eased;
      paint(position);
    }
    if (t >= 1) {
      finishAnim();
      return;
    }
    raf = requestAnimationFrame(tick);
  }

  function begin() {
    animFrom = position;
    animStart = performance.now();
    if (raf) return;
    raf = requestAnimationFrame(tick);
  }

  function nudge(delta) {
    const next = clampFrame(target + delta);
    if (next === target) return false;
    holdTab = false;
    useDirect = false;
    target = next;
    syncChrome(next, true);
    begin();
    return true;
  }

  function setFrame(index) {
    const next = clampFrame(index);
    if (next === target && Math.abs(position - next) < 0.001 && !raf) return;
    const from = Math.round(position);
    holdTab = true;
    target = next;
    syncChrome(next, false);
    if (Math.abs(next - from) > 1) {
      useDirect = true;
      blendFrom = from;
      blendTo = next;
      position = next;
    } else {
      useDirect = false;
    }
    begin();
  }

  /* Drag on the photo steps to the next view. */
  let dragging = false;
  let dragStepped = false;
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
    if (!dragging || dragStepped) return;
    const dx = clientX - lastX;
    if (Math.abs(dx) < dragThreshold) return;
    dragStepped = true;
    nudge(dx > 0 ? 1 : -1);
  }

  function endDrag(pointerId) {
    if (!dragging) return;
    dragging = false;
    dragStepped = false;
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

  if (!window.PointerEvent) {
    stage.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      onDragStart(e.clientX, null);
    });
    window.addEventListener('mousemove', (e) => onDragMove(e.clientX));
    window.addEventListener('mouseup', () => endDrag(null));
  }

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
