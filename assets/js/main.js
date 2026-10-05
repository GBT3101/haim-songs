/* =========================================================
   מנוע הגלילה — מחבר בין הגלילה לאנימציות
   ========================================================= */
(function () {
  'use strict';
  const root = document.documentElement;
  if (!window.gsap || !window.ScrollTrigger || !window.ART || !window.SCENES) return;
  root.classList.add('js');

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  ScrollTrigger.config({ ignoreMobileResize: true });

  // גרדיאנטים משותפים
  document.body.insertAdjacentHTML('afterbegin', ART.defs());

  const wideMQ = window.matchMedia('(min-aspect-ratio: 21/20)');
  const BEAT = 10;

  /* ---------- שער ---------- */
  const hero = document.querySelector('.hero');
  (function buildHero() {
    const name = hero.querySelector('.hero__name');
    const txt = name.textContent.trim();
    name.textContent = '';
    Array.from(txt).forEach((ch, i) => {
      const s = document.createElement('span');
      s.setAttribute('aria-hidden', 'true');
      if (ch === ' ') { s.className = 'sp'; s.innerHTML = '&nbsp;'; } else { s.className = 'ch'; s.textContent = ch; s.style.setProperty('--i', i); }
      name.appendChild(s);
    });
    hero.querySelector('.hero__flourish').innerHTML = ART.flourish();
    hero.querySelector('.hero__floaters').innerHTML = ART.floaters();
    hero.querySelectorAll('.medal__disc').forEach((d) => { d.innerHTML = ART.icon(d.dataset.icon); });
  })();

  function placeMedals() {
    const wide = wideMQ.matches;
    const spots = wide
      ? [[87, 24], [87, 50], [87, 76], [13, 24], [13, 50], [13, 76]]
      : [[79, 15], [50, 12], [21, 15], [79, 77], [50, 80], [21, 77]];
    hero.querySelectorAll('.medal').forEach((m, i) => {
      m.style.setProperty('--mx', spots[i][0] + '%');
      m.style.setProperty('--my', spots[i][1] + '%');
    });
  }
  placeMedals();

  // תזוזה עדינה בעקבות העכבר
  const heroStage = hero.querySelector('.hero__stage');
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let raf = 0, px = 0, py = 0;
    heroStage.addEventListener('pointermove', (e) => {
      px = (e.clientX / window.innerWidth - .5) * 2;
      py = (e.clientY / window.innerHeight - .5) * 2;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        heroStage.style.setProperty('--px', px.toFixed(3));
        heroStage.style.setProperty('--py', py.toFixed(3));
      });
    });
  }

  gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: .6 } })
    .to('.hero__title', { y: -70, scale: .9, opacity: .15, ease: 'power1.in' }, 0)
    .to('.hero__flourish', { y: -40, opacity: 0, ease: 'power1.in' }, 0)
    .to('.hero__medals', { scale: 1.25, opacity: 0, ease: 'power1.in' }, 0)
    .to('.hero__floaters', { y: -120, ease: 'none' }, 0)
    .to('.hero__scroll', { opacity: 0, duration: .15 }, 0);

  /* ---------- שירים ---------- */
  const songs = Array.from(document.querySelectorAll('.song'));
  const registry = (window.__songs = []);

  songs.forEach((sec) => {
    const sc = ART.scenes[sec.dataset.scene];
    sec.querySelector('.backdrop').innerHTML = sc.backdrop();
    sec.querySelector('.actors').innerHTML =
      `<svg viewBox="0 0 800 700" preserveAspectRatio="xMidYMid meet" overflow="visible" aria-hidden="true" focusable="false"><defs>${sc.extraDefs || ''}</defs>${sc.actors()}</svg>`;
  });

  function applyLayout() {
    const wide = wideMQ.matches;
    songs.forEach((sec) => {
      const svg = sec.querySelector('.actors > svg');
      const sc = ART.scenes[sec.dataset.scene];
      svg.setAttribute('viewBox', wide ? '0 0 800 700' : (sc.vbTall || '100 0 600 700'));
      svg.setAttribute('preserveAspectRatio', wide ? 'xMidYMid meet' : 'xMidYMax meet');
    });
    placeMedals();
  }
  applyLayout();
  wideMQ.addEventListener ? wideMQ.addEventListener('change', () => { applyLayout(); ScrollTrigger.refresh(); })
    : wideMQ.addListener(() => { applyLayout(); ScrollTrigger.refresh(); });

  // גובה הכרטיס קובע את שטח האיור בטלפון
  const ro = new ResizeObserver((entries) => {
    entries.forEach((en) => {
      const card = en.target;
      card.closest('.stage').style.setProperty('--card-h', Math.round(card.offsetHeight) + 'px');
    });
  });

  songs.forEach((sec) => {
    const stage = sec.querySelector('.stage');
    const card = sec.querySelector('.card');
    const introTitle = sec.querySelector('.intro__title');
    const stanzas = Array.from(sec.querySelectorAll('.stanza'));
    const dotsWrap = sec.querySelector('.card__dots');
    dotsWrap.innerHTML = stanzas.map(() => '<i></i>').join('');
    const dots = Array.from(dotsWrap.children);
    ro.observe(card);

    const beats = SCENES[sec.dataset.scene](sec);
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.inOut' } });

    gsap.set(card, { opacity: 0, y: 50 });
    stanzas.forEach((s) => gsap.set(s.querySelectorAll('.line'), { opacity: 0, y: 30 }));

    let t = 0;
    beats.forEach((b, i) => {
      const len = b.len || BEAT;
      tl.addLabel('b' + i, t);
      if (i === 1) {
        tl.to(introTitle, { opacity: 0, y: -40, scale: .92, duration: .9, ease: 'power2.in' }, t);
        tl.to(card, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, t + .3);
      }
      const st = stanzas[i - 1];
      if (i >= 1 && st) {
        const lines = st.querySelectorAll('.line');
        tl.to(lines, { opacity: 1, y: 0, duration: .9, stagger: .3, ease: 'power2.out' }, t + .5);
        tl.to(dots[i - 1], { opacity: 1, scale: 1.3, duration: .4 }, t + .5);
        if (i < beats.length - 1) {
          tl.to(lines, { opacity: 0, y: -22, duration: .6, stagger: .06, ease: 'power1.in' }, t + len - .8);
          tl.to(dots[i - 1], { opacity: .22, scale: 1, duration: .4 }, t + len - .5);
        }
      }
      if (b.fn) b.fn(tl, t, len);
      t += len;
    });
    tl.to({}, { duration: .01 }, t);
    sec.style.setProperty('--len', t);

    ScrollTrigger.create({ trigger: sec, start: 'top top', end: 'bottom bottom', scrub: .8, animation: tl });
    registry.push({ sec, tl, beats: beats.map((b) => b.len || BEAT) });

    // כניסת הכותרת כשהבמה עולה למסך
    gsap.fromTo(introTitle, { opacity: 0, y: 90, scale: .7 }, {
      opacity: 1, y: 0, scale: 1, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: sec, start: 'top 80%', end: 'top 5%', scrub: .6 }
    });
    // עומק — הרקע זז לאט יותר
    gsap.fromTo(sec.querySelector('.backdrop'), { yPercent: -8 }, {
      yPercent: 0, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top top', scrub: true }
    });
  });

  /* ---------- לולאות רצות רק כשהשיר על המסך ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => en.target.classList.toggle('is-live', en.isIntersecting));
  }, { rootMargin: '10% 0px' });
  [hero, ...songs].forEach((el) => io.observe(el));

  // רענון אחרי טעינת גופנים (גובה הכרטיסים משתנה)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
