(function () {
  const product = window.LOCOFO_PRODUCT;
  if (!product?.frames?.length) return;

  const theater = document.getElementById('theater');
  const stage = document.getElementById('spinStage');
  const canvas = document.getElementById('spinCanvas');
  if (!stage || !canvas) return;

  const ctx = canvas.getContext('2d');
  const badge = document.getElementById('frameBadge');
  const pillsEl = document.getElementById('framePills');
  const tabs = [...document.querySelectorAll('.tabs .tab')];
  const panels = [...document.querySelectorAll('.tab-panel')];
  const desktopMq = window.matchMedia('(min-width: 901px)');

  /* One photo per tab. Extra angles in the file list are not separate steps. */
  function framesForTabs(srcs, tabCount) {
    if (!tabCount || tabCount >= srcs.length) return srcs.slice();
    if (tabCount <= 1) return [srcs[0]];
    return Array.from({ length: tabCount }, (_, i) => {
      const index = Math.round((i / (tabCount - 1)) * (srcs.length - 1));
      return srcs[index];
    });
  }

  const frameSrcs = framesForTabs(product.frames, tabs.length);
  const frameCount = frameSrcs.length;

  const dotCount = tabs.length || frameCount;
  const pillSpans = Array.from({ length: dotCount }, (_, i) => {
    const s = document.createElement('span');
    if (i === 0) s.classList.add('on');
    if (pillsEl) pillsEl.appendChild(s);
    return s;
  });

  const images = frameSrcs.map((src) => {
    const img = new Image();
    img.src = src;
    return img;
  });

  let current = 0;
  let ready = 0;
  let syncingFromScroll = false;

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
    if (next === current && images[next]?.complete) {
      /* still refresh badge/pills */
    } else {
      current = next;
      drawFrame(current);
    }
    if (badge) badge.textContent = `${current + 1} / ${frameCount}`;
    const activeDot = tabs.length ? tabIndexForFrame(current) : current;
    pillSpans.forEach((s, i) => s.classList.toggle('on', i === activeDot));
  }

  function switchTab(name) {
    tabs.forEach((tab) => {
      const on = tab.dataset.tab === name;
      tab.classList.toggle('on', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach((panel) => {
      const on = panel.dataset.panel === name;
      panel.classList.toggle('active', on);
      panel.hidden = !on;
    });
  }

  function tabNameAt(index) {
    const tab = tabs[Math.min(tabs.length - 1, Math.max(0, index))];
    return tab?.dataset.tab || 'desc';
  }

  /** Tab index and frame index are the same: one image per tab. */
  function frameForTabIndex(tabIndex) {
    if (tabs.length <= 1) return 0;
    if (frameCount <= 1) return 0;
    return Math.round((tabIndex / (tabs.length - 1)) * (frameCount - 1));
  }

  function tabIndexForFrame(frameIndex) {
    if (tabs.length <= 1) return 0;
    if (frameCount <= 1) return 0;
    return Math.min(
      tabs.length - 1,
      Math.max(0, Math.round((frameIndex / (frameCount - 1)) * (tabs.length - 1)))
    );
  }

  function theaterProgress() {
    if (!theater) return 0;
    const rect = theater.getBoundingClientRect();
    const total = Math.max(1, theater.offsetHeight - window.innerHeight);
    const scrolled = Math.min(Math.max(-rect.top, 0), total);
    return scrolled / total;
  }

  function applyScrollTheater() {
    if (!desktopMq.matches || !theater) return;
    const progress = theaterProgress();
    const tabIndex = Math.min(
      tabs.length - 1,
      Math.max(0, Math.floor(progress * tabs.length - 1e-9))
    );
    /* One matching frame per tab (scroll moves tab → image) */
    syncingFromScroll = true;
    switchTab(tabNameAt(tabIndex));
    setFrame(frameForTabIndex(tabIndex));
    syncingFromScroll = false;
  }

  function scrollToTabIndex(tabIndex) {
    if (!theater || !desktopMq.matches) {
      switchTab(tabNameAt(tabIndex));
      setFrame(frameForTabIndex(tabIndex));
      return;
    }
    const total = Math.max(1, theater.offsetHeight - window.innerHeight);
    /* Land in the middle of that tab's scroll segment */
    const segment = 1 / Math.max(tabs.length, 1);
    const progress = Math.min(1, tabIndex * segment + segment * 0.5);
    const top =
      theater.getBoundingClientRect().top +
      window.scrollY +
      progress * total;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  let ticking = false;
  function onScroll() {
    if (!desktopMq.matches) return;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      applyScrollTheater();
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    applyScrollTheater();
  });
  desktopMq.addEventListener?.('change', () => applyScrollTheater());

  /* Tab clicks: on desktop, scroll theater to that tab; on mobile, switch + matching frame */
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      if (syncingFromScroll) return;
      scrollToTabIndex(i);
      if (!desktopMq.matches) {
        switchTab(tab.dataset.tab);
        setFrame(frameForTabIndex(i));
      }
    });
  });

  /* Wheel scrub on stage — mobile / always as fine control; on desktop also nudges page scroll when at edges optional */
  let wheelLock = false;
  stage.addEventListener(
    'wheel',
    (e) => {
      if (desktopMq.matches && theater) {
        /* Let page scroll drive tabs; don't trap wheel on desktop theater */
        return;
      }
      e.preventDefault();
      if (wheelLock) return;
      wheelLock = true;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = Math.min(frameCount - 1, Math.max(0, current + dir));
      setFrame(next);
      switchTab(tabNameAt(tabIndexForFrame(next)));
      requestAnimationFrame(() => {
        wheelLock = false;
      });
    },
    { passive: false }
  );

  /* Drag scrub */
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
      const dir = dx > 0 ? 1 : -1;
      const next = Math.min(frameCount - 1, Math.max(0, current + dir));
      setFrame(next);
      if (!desktopMq.matches) {
        switchTab(tabNameAt(tabIndexForFrame(next)));
      }
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

  /* Initial paint */
  applyScrollTheater();
  if (!desktopMq.matches) {
    setFrame(0);
    if (tabs[0]) switchTab(tabs[0].dataset.tab);
  }

  window.LocofoSpin = {
    setFrame,
    getFrame: () => current,
    scrollToTabIndex,
    switchTab,
  };
})();
