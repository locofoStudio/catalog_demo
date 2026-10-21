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

  let current = 0;
  let ready = 0;
  images.forEach((img) => {
    const done = () => {
      ready += 1;
      if (ready === 1) drawFrame(0);
    };
    if (img.complete) done();
    else {
      img.onload = done;
      img.onerror = done;
    }
  });

  function drawFrame(index) {
    const img = images[index];
    if (!img?.complete || !img.naturalWidth) return;
    const cw = canvas.width;
    const ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);
    const scale = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, w, h);
  }

  function setFrame(index) {
    const next = Math.min(frameCount - 1, Math.max(0, index));
    if (next === current && images[next]?.complete) return;
    current = next;
    drawFrame(current);
    if (badge) badge.textContent = `${current + 1} / ${frameCount}`;
    pillSpans.forEach((s, i) => s.classList.toggle('on', i === current));
  }

  function advance(delta) {
    setFrame(current + delta);
  }

  /* Wheel scrub */
  let wheelLock = false;
  stage.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      if (wheelLock) return;
      wheelLock = true;
      const dir = e.deltaY > 0 ? 1 : -1;
      advance(dir);
      requestAnimationFrame(() => {
        wheelLock = false;
      });
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
      advance(dx > 0 ? 1 : -1);
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

  window.LocofoSpin = { setFrame, getFrame: () => current };
})();
