/* =========================================================
   ניגון אוטומטי — גלילה בקצב קריאה נוח
   הסצנות מתנגנות במהירותן הטבעית, ובכל בית הגלילה נעצרת
   מספיק זמן כדי לקרוא את המילים בנחת.
   ========================================================= */
(function () {
  'use strict';
  const songs = window.SONG_TIMELINES;
  if (!songs || !songs.length) return;

  const root = document.documentElement;
  const buttons = Array.from(document.querySelectorAll('[data-play]'));
  const heroBtn = document.querySelector('.hero__play');
  const fab = document.querySelector('.player-fab');

  const SPEED = 0.85;         // יחידות ציר-זמן בשנייה: בית רגיל ≈ 12 שניות
  const INTRO_SPEED = 1.4;    // כותרת השיר עוברת מעט מהר יותר
  const SECS_PER_WORD = 0.8;  // זמן קריאה לכל מילה
  const LABELS = { idle: 'הַפְעָלָה', playing: 'הַשְׁהָיָה', paused: 'הֶמְשֵׁךְ' };
  const EASE = { lin: (p) => p, io: (p) => .5 - Math.cos(Math.PI * p) / 2 };

  let state = 'idle';
  let plan = [], idx = 0, elapsed = 0, lastTime = 0, raf = 0, pausedAt = -1;
  let heroBtnVisible = true, wakeLock = null;

  const scrollMax = () => root.scrollHeight - window.innerHeight;
  const pageTop = (el) => el.getBoundingClientRect().top + window.scrollY;
  const countWords = (stanza) => Array.from(stanza.querySelectorAll('.line'))
    .reduce((n, line) => n + line.textContent.trim().split(/\s+/).length, 0);
  const readSecs = (stanza) => stanza ? 2 + countWords(stanza) * SECS_PER_WORD : 0;

  /* ---------- מסלול הגלילה: תנועות ועצירות ---------- */
  function buildPlan() {
    const segs = [];
    const move = (y0, y1, d, e = 'lin') => { if (d > 0) segs.push({ y0, y1, d, e }); };
    let y = 0;
    songs.forEach((s, si) => {
      const top = pageTop(s.sec);
      const dist = s.sec.offsetHeight - window.innerHeight;
      const D = s.tl.duration();
      const at = (u) => top + dist * Math.min(1, u / D);
      const stanzas = s.sec.querySelectorAll('.stanza');

      move(y, top, si === 0 ? 4 : 3.2, 'io');           // מעבר אל השיר
      let t = 0;
      s.beats.forEach((len, i) => {
        if (i === 0) { move(at(0), at(len), len / INTRO_SPEED); t += len; return; }
        const lastBeat = i === s.beats.length - 1;
        const holdAt = lastBeat ? t + len : t + len - 1; // רגע לפני שהבית נעלם
        move(at(t), at(holdAt), (holdAt - t) / SPEED);
        const shown = (holdAt - t - 1.4) / SPEED;        // כמה זמן הבית כבר היה על המסך
        move(at(holdAt), at(holdAt), Math.max(lastBeat ? 3 : .8, readSecs(stanzas[i - 1]) - shown));
        if (!lastBeat) move(at(holdAt), at(t + len), (t + len - holdAt) / SPEED);
        t += len;
      });
      y = at(D);
    });
    move(y, scrollMax(), 3.5, 'io');                    // אל הסיום
    return segs;
  }

  // מוצא את המקום במסלול שמתאים למיקום הגלילה הנוכחי
  function locate(y) {
    for (let i = 0; i < plan.length; i++) {
      const s = plan[i];
      if (s.y1 <= y + 1) continue;
      if (y > s.y0) plan[i] = { ...s, y0: y, d: s.d * (s.y1 - y) / (s.y1 - s.y0) };
      return i;
    }
    return plan.length;
  }

  /* ---------- ניגון ---------- */
  function tick(now) {
    elapsed += Math.min(.1, (now - lastTime) / 1000);
    lastTime = now;
    let s = plan[idx];
    while (s && elapsed >= s.d) { elapsed -= s.d; s = plan[++idx]; }
    if (!s) { window.scrollTo(0, scrollMax()); stop(); return; }
    window.scrollTo(0, s.y0 + (s.y1 - s.y0) * EASE[s.e](elapsed / s.d));
    raf = requestAnimationFrame(tick);
  }

  function play() {
    root.style.scrollBehavior = 'auto';
    if (window.scrollY >= scrollMax() - 4) window.scrollTo(0, 0);  // בסוף — מתחילים מחדש
    const y = window.scrollY;
    const resume = state === 'paused' && Math.abs(y - pausedAt) < 3 && idx < plan.length;
    if (!resume) { plan = buildPlan(); idx = locate(y); elapsed = 0; }
    setState('playing');
    keepAwake();
    lastTime = performance.now();
    raf = requestAnimationFrame(tick);
  }

  function halt(next) {
    cancelAnimationFrame(raf);
    root.style.scrollBehavior = '';
    releaseAwake();
    setState(next);
  }
  function pause() { if (state !== 'playing') return; pausedAt = window.scrollY; halt('paused'); }
  function stop() { idx = 0; elapsed = 0; halt('idle'); }

  /* ---------- כפתורים ---------- */
  function setState(next) {
    state = next;
    buttons.forEach((b) => {
      b.dataset.state = next;
      b.querySelector('.play-btn__label').textContent = LABELS[next];
    });
    updateFab();
  }
  function updateFab() {
    if (fab) fab.classList.toggle('is-hidden', state === 'idle' && heroBtnVisible);
  }
  buttons.forEach((b) => b.addEventListener('click', () => (state === 'playing' ? pause() : play())));
  if (heroBtn && 'IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => { heroBtnVisible = en.isIntersecting; updateFab(); }).observe(heroBtn);
  }

  /* ---------- גלילה ידנית עוצרת את הניגון ---------- */
  const NAV_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']);
  window.addEventListener('wheel', pause, { passive: true });
  window.addEventListener('touchmove', pause, { passive: true });
  window.addEventListener('keydown', (e) => { if (NAV_KEYS.has(e.key) && !e.target.closest('button')) pause(); });
  document.addEventListener('click', (e) => { if (e.target.closest('a[href^="#"]')) pause(); });

  // שינוי גודל חלון באמצע ניגון — מחשבים את המסלול מחדש מהמקום הנוכחי
  window.ScrollTrigger && ScrollTrigger.addEventListener('refresh', () => {
    if (state !== 'playing') return;
    plan = buildPlan(); idx = locate(window.scrollY); elapsed = 0;
  });

  /* ---------- המסך לא נכבה בזמן הניגון ---------- */
  async function keepAwake() {
    try { wakeLock = navigator.wakeLock ? await navigator.wakeLock.request('screen') : null; } catch (e) { wakeLock = null; }
  }
  function releaseAwake() {
    try { if (wakeLock) wakeLock.release(); } catch (e) { /* כבר שוחרר */ }
    wakeLock = null;
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && state === 'playing') keepAwake();
  });
})();
