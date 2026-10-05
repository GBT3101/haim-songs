/* =========================================================
   ניגון אוטומטי — גלילה בקצב קריאה נוח
   הסצנות מתנגנות במהירותן הטבעית, ובכל בית הגלילה נעצרת
   מספיק זמן כדי לקרוא את המילים בנחת.
   גלילה ידנית עוצרת את הניגון לרגע, והוא ממשיך מעצמו
   שנייה אחרי שהגלילה הידנית נגמרת.
   ========================================================= */
(function () {
  'use strict';
  const songs = window.SONG_TIMELINES;
  const button = document.querySelector('.hero__play');
  if (!songs || !songs.length || !button) return;

  const root = document.documentElement;
  const label = button.querySelector('.play-btn__label');

  const SPEED = 0.85;         // יחידות ציר-זמן בשנייה: בית רגיל ≈ 12 שניות
  const INTRO_SPEED = 1.4;    // כותרת השיר עוברת מעט מהר יותר
  const SECS_PER_WORD = 0.8;  // זמן קריאה לכל מילה
  const RESUME_AFTER = 1000;  // המשך אוטומטי אחרי גלילה ידנית (מ"ש)
  const LABELS = { idle: 'הַפְעָלָה', playing: 'הַשְׁהָיָה' };
  const EASE = { lin: (p) => p, io: (p) => .5 - Math.cos(Math.PI * p) / 2 };

  let playing = false;   // מצב הכפתור
  let held = false;      // נעצר זמנית בגלל גלילה ידנית
  let fingerDown = false;
  let plan = [], idx = 0, elapsed = 0, lastTime = 0, raf = 0, resumeTimer = 0;
  let setY = -1;         // המיקום האחרון שהניגון גלל אליו
  let wakeLock = null;

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
    setY = s.y0 + (s.y1 - s.y0) * EASE[s.e](elapsed / s.d);
    window.scrollTo(0, setY);
    raf = requestAnimationFrame(tick);
  }

  // מתחיל לגלול מהמקום שבו הדף נמצא עכשיו
  function run() {
    held = false;
    plan = buildPlan();
    idx = locate(window.scrollY);
    elapsed = 0;
    setY = window.scrollY;
    lastTime = performance.now();
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  }

  function start() {
    root.style.scrollBehavior = 'auto';
    if (window.scrollY >= scrollMax() - 4) window.scrollTo(0, 0);  // בסוף — מתחילים מחדש
    playing = true;
    updateButton();
    keepAwake();
    run();
  }

  function stop() {
    playing = false;
    held = false;
    cancelAnimationFrame(raf);
    clearTimeout(resumeTimer);
    root.style.scrollBehavior = '';
    releaseAwake();
    updateButton();
  }

  function updateButton() {
    const state = playing ? 'playing' : 'idle';
    button.dataset.state = state;
    label.textContent = LABELS[state];
  }
  button.addEventListener('click', () => (playing ? stop() : start()));

  /* ---------- גלילה ידנית: עצירה זמנית והמשך אחרי שנייה ---------- */
  function hold() {
    if (!playing) return;
    if (!held) { held = true; cancelAnimationFrame(raf); }
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      if (playing && held && !fingerDown) run();   // אצבע על המסך — ממתינים שתורם
    }, RESUME_AFTER);
  }
  const onButton = (e) => e.target instanceof Element && e.target.closest('.hero__play');
  const liftFinger = () => { fingerDown = false; if (held) hold(); };
  const NAV_KEYS = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ']);

  window.addEventListener('wheel', hold, { passive: true });
  window.addEventListener('touchstart', (e) => { if (onButton(e)) return; fingerDown = true; hold(); }, { passive: true });
  window.addEventListener('touchmove', hold, { passive: true });
  window.addEventListener('touchend', liftFinger, { passive: true });
  window.addEventListener('touchcancel', liftFinger, { passive: true });
  window.addEventListener('keydown', (e) => { if (NAV_KEYS.has(e.key) && !onButton(e)) hold(); });
  // כל גלילה שלא הניגון עשה (פס גלילה, קישור, תנופת אצבע) נחשבת ידנית
  window.addEventListener('scroll', () => {
    if (playing && (held || Math.abs(window.scrollY - setY) > 3)) hold();
  }, { passive: true });

  // שינוי גודל חלון באמצע ניגון — מחשבים את המסלול מחדש מהמקום הנוכחי
  if (window.ScrollTrigger) ScrollTrigger.addEventListener('refresh', () => { if (playing && !held) run(); });

  /* ---------- המסך לא נכבה בזמן הניגון ---------- */
  async function keepAwake() {
    try { wakeLock = navigator.wakeLock ? await navigator.wakeLock.request('screen') : null; } catch (e) { wakeLock = null; }
  }
  function releaseAwake() {
    try { if (wakeLock) wakeLock.release(); } catch (e) { /* כבר שוחרר */ }
    wakeLock = null;
  }
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && playing) keepAwake();
  });
})();
