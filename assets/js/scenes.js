/* =========================================================
   כוריאוגרפיה — מה קורה בכל בית של כל שיר בזמן הגלילה
   כל שיר מחזיר מערך "פעימות": [פתיחה, בית 1, בית 2, ...]
   ========================================================= */
window.SCENES = (function () {
  'use strict';

  /* ---------- עזרים ---------- */
  function helpers(sec) {
    const $ = (n) => sec.querySelector(`[data-a="${n}"]`);
    const $$ = (sel) => Array.from(sec.querySelectorAll(sel));
    const mouth = (tl, who, m, at, d = .3) => {
      const g = $(who + '-mouth');
      if (!g) return;
      g.querySelectorAll(':scope > [data-m]').forEach((el) => tl.to(el, { opacity: el.dataset.m === m ? 1 : 0, duration: d }, at));
    };
    const show = (tl, el, at, d = .5, v = {}) => el && tl.to(el, { opacity: 1, duration: d, ...v }, at);
    const hide = (tl, el, at, d = .5, v = {}) => el && tl.to(el, { opacity: 0, duration: d, ...v }, at);
    const pop = (tl, wrap, inner, at, d = .7) => {
      if (!wrap) return;
      tl.to(wrap, { opacity: 1, duration: .25 }, at);
      tl.fromTo(inner || wrap, { scale: .2 }, { scale: 1, duration: d, ease: 'back.out(2.2)', transformOrigin: '50% 50%', immediateRender: false }, at);
    };
    const unpop = (tl, wrap, inner, at, d = .4) => {
      if (!wrap) return;
      tl.to(inner || wrap, { scale: .3, duration: d, ease: 'back.in(1.6)', transformOrigin: '50% 50%' }, at);
      tl.to(wrap, { opacity: 0, duration: d * .8 }, at + d * .2);
    };
    const swap = (tl, a, b, at, d = .25) => { hide(tl, a, at, d); show(tl, b, at, d); };
    const tears = (tl, who, on, at) => { const el = $(who + '-tears'); el && tl.to(el, { opacity: on ? 1 : 0, duration: .4 }, at); };
    return { $, $$, mouth, show, hide, pop, unpop, swap, tears };
  }

  /* =======================================================
     1. סלט ירקות
     ======================================================= */
  function salad(sec) {
    const H = helpers(sec), { $, $$, mouth, show, hide, pop, unpop, swap, tears } = H;
    const W = { carrot: $('carrotW'), cabbage: $('cabbageW'), tomato: $('tomatoW'), cucumber: $('cucumberW'), onion: $('onionW') };
    const all = Object.keys(W);
    const pieces = $$('[data-a="salad"] .pc');
    gsap.set(pieces, { y: -520, opacity: 0, rotation: () => gsap.utils.random(-180, 180) });
    gsap.set($('mom'), { y: -760 });
    gsap.set($('water'), { y: 60 });
    gsap.set($$('[data-a^="slash"] > g'), { scaleX: 0, transformOrigin: '0% 50%' });
    gsap.set(Object.values(W), { y: 170, transformOrigin: '50% 100%' });
    const tomTremble = $('tomatoW').firstElementChild;

    return [
      { len: 6, fn(tl, t) { // פתיחה — הירקות מציצים מהקערה
        all.forEach((k, i) => tl.to(W[k], { y: 0, duration: 1.4, ease: 'back.out(1.8)' }, t + .4 + i * .35));
      } },
      { fn(tl, t) { // בכו מרה
        all.forEach((k, i) => { tears(tl, k, true, t + .8 + i * .2); mouth(tl, k, 'sad', t + .6 + i * .2); });
        tl.to($('water'), { opacity: 1, y: 30, duration: 4, ease: 'power1.inOut' }, t + 1.5);
        all.forEach((k, i) => tl.to(W[k], { y: 6, duration: .5, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t + 1 + i * .15));
      } },
      { fn(tl, t) { // הגזר צורח
        tears(tl, 'carrot', false, t + .4);
        mouth(tl, 'carrot', 'big', t + .8);
        tl.to(W.carrot, { y: -95, duration: .9, ease: 'back.out(2)' }, t + .6);
        tl.to(W.carrot, { rotation: 5, duration: .14, yoyo: true, repeat: 9, ease: 'sine.inOut' }, t + 1.5);
        tl.fromTo($('shout'), { scale: .5, transformOrigin: '50% 60%' }, { scale: 1, duration: .6, ease: 'back.out(3)', immediateRender: false }, t + 1.1);
        show(tl, $('shout'), t + 1.1, .3);
        all.filter((k) => k !== 'carrot').forEach((k) => mouth(tl, k, 'o', t + 1.4));
      } },
      { fn(tl, t) { // הכרוב נחנק ועלוב
        tl.to(W.carrot, { y: 0, rotation: 0, duration: .8, ease: 'power2.inOut' }, t + .2);
        hide(tl, $('shout'), t + .2, .3);
        mouth(tl, 'carrot', 'sad', t + .4); tears(tl, 'carrot', true, t + .6);
        all.filter((k) => k !== 'carrot' && k !== 'cabbage').forEach((k) => mouth(tl, k, 'sad', t + .4));
        mouth(tl, 'cabbage', 'wavy', t + 1);
        show(tl, $('cough'), t + 1, .5);
        tl.to($('cabbage-leafL'), { rotation: -38, transformOrigin: '100% 10%', duration: 1.6, ease: 'power2.inOut' }, t + 1.6);
        tl.to($('cabbage-leafR'), { rotation: 38, transformOrigin: '0% 10%', duration: 1.6, ease: 'power2.inOut' }, t + 1.6);
        tl.to(W.cabbage, { scale: .84, duration: 2, ease: 'power2.inOut' }, t + 1.8);
        tl.to($('cabbage-grey'), { opacity: .38, duration: 2 }, t + 2);
        show(tl, $('sweat'), t + 2.4, .4);
        tl.to($('sweat'), { y: 26, duration: 1.6, ease: 'power1.in' }, t + 2.6);
      } },
      { fn(tl, t) { // העגבנייה נאלמה
        hide(tl, $('cough'), t + .1, .3); hide(tl, $('sweat'), t + .1, .3);
        tl.to($('cabbage-leafL'), { rotation: -14, duration: .8 }, t + .2);
        tl.to($('cabbage-leafR'), { rotation: 14, duration: .8 }, t + .2);
        tl.to(W.cabbage, { scale: .94, duration: .8 }, t + .2);
        tl.to($('cabbage-grey'), { opacity: .12, duration: .8 }, t + .2);
        mouth(tl, 'cabbage', 'sad', t + .3);
        tears(tl, 'tomato', false, t + .6);
        mouth(tl, 'tomato', '-', t + 1);
        pop(tl, $('tomato-zip'), null, t + 1.2, .6);
        tl.to($('tomato-eyes'), { scale: 1.4, transformOrigin: '50% 50%', duration: .8, ease: 'back.out(2)' }, t + 1.4);
        tl.to(tomTremble, { '--amp': 2.4, duration: .6 }, t + 1.6);
        pop(tl, $('dots'), $('dots-in'), t + 2.4);
      } },
      { fn(tl, t) { // המלפפון איבד את הצפון
        hide(tl, $('tomato-zip'), t + .2, .3);
        tl.to($('tomato-eyes'), { scale: 1, duration: .5 }, t + .2);
        tl.to(tomTremble, { '--amp': .4, duration: .5 }, t + .2);
        mouth(tl, 'tomato', 'sad', t + .4);
        unpop(tl, $('dots'), $('dots-in'), t + .1);
        tears(tl, 'cucumber', false, t + .5);
        tl.fromTo($('compass'), { y: -60, scale: .4, transformOrigin: '50% 50%' }, { y: 0, scale: 1, duration: .9, ease: 'back.out(2)', immediateRender: false }, t + .8);
        show(tl, $('compass'), t + .8, .3);
        tl.to(W.cucumber, { rotation: 720, transformOrigin: '50% 50%', duration: 3.2, ease: 'power2.inOut' }, t + 1.4);
        swap(tl, $('cucumber-eyes'), $('cucumber-dizzy'), t + 1.6);
        mouth(tl, 'cucumber', 'wavy', t + 1.6);
        show(tl, $('dizzy'), t + 2.2, .5);
      } },
      { fn(tl, t) { // הבצל מתחכם
        hide(tl, $('compass'), t + .2, .3); hide(tl, $('dizzy'), t + .2, .3);
        swap(tl, $('cucumber-dizzy'), $('cucumber-eyes'), t + .3);
        mouth(tl, 'cucumber', 'sad', t + .3);
        all.filter((k) => k !== 'onion').forEach((k) => tears(tl, k, true, t + .5));
        tears(tl, 'onion', false, t + .3);
        show(tl, $('onion-glasses'), t + .8, .4);
        mouth(tl, 'onion', 'smug', t + .8);
        tl.to(W.onion, { x: 130, duration: .8, ease: 'none' }, t + 1.4);
        tl.to(W.onion, { y: -190, duration: .8, ease: 'power2.out' }, t + 1.4);
        tl.to(W.onion, { x: 252, duration: .8, ease: 'none' }, t + 2.2);
        tl.to(W.onion, { y: 128, duration: .8, ease: 'bounce.out' }, t + 2.2);
        show(tl, $('onion-arm'), t + 3.1, .4);
        tl.fromTo($('onion-arm'), { rotation: -14, transformOrigin: '0% 100%' }, { rotation: 10, yoyo: true, repeat: 5, duration: .3, ease: 'sine.inOut', immediateRender: false }, t + 3.3);
        show(tl, $('onionWaves'), t + 3.6, .6);
        all.filter((k) => k !== 'onion').forEach((k) => mouth(tl, k, 'wavy', t + 3.8));
        tl.to($('water'), { y: 0, duration: 3, ease: 'power1.inOut' }, t + 4);
      } },
      { len: 14, fn(tl, t) { // אמא קובעת — סלט!
        hide(tl, $('onionWaves'), t + .1, .3);
        hide(tl, $('onion-arm'), t + .1, .3);
        hide(tl, $('onion-glasses'), t + .1, .3);
        tl.to(W.onion, { x: 0, duration: .9, ease: 'power1.inOut' }, t + .3);
        tl.to(W.onion, { y: -150, duration: .45, ease: 'power2.out' }, t + .3);
        tl.to(W.onion, { y: 0, duration: .45, ease: 'power2.in' }, t + .75);
        all.forEach((k) => { tears(tl, k, false, t + 1); mouth(tl, k, 'o', t + 1.2); });
        tl.to($('mom'), { y: 0, duration: 1.4, ease: 'power3.out' }, t + .6);
        show(tl, $('stamp'), t + 1.8, .15);
        tl.fromTo($('stamp-in'), { scale: 2.6, rotation: -30, transformOrigin: '50% 50%' }, { scale: 1, rotation: 0, duration: .55, ease: 'back.out(1.4)', immediateRender: false }, t + 1.8);
        $$('[data-a^="slash"] > g').forEach((s, i) => {
          tl.to(s, { scaleX: 1, duration: .25, ease: 'power3.out' }, t + 2.8 + i * .22);
        });
        show(tl, $('slashes'), t + 2.8, .1);
        hide(tl, $('slashes'), t + 4.2, .4);
        all.forEach((k, i) => tl.to(W[k], { scale: 0, opacity: 0, duration: .35, ease: 'back.in(2)', transformOrigin: '50% 50%' }, t + 3.1 + i * .2));
        hide(tl, $('water'), t + 3.4, .6);
        tl.to(pieces, { y: 0, opacity: 1, rotation: 0, duration: .9, ease: 'bounce.out', stagger: { each: .045, from: 'random' } }, t + 3.6);
        tl.to($('mom'), { rotation: 7, svgOrigin: '606 166', duration: .35, yoyo: true, repeat: 7, ease: 'sine.inOut' }, t + 6.4);
        show(tl, $('glits'), t + 8.4, .6);
        tl.to($('mom'), { y: -760, duration: 1.4, ease: 'power2.in' }, t + 9.6);
      } }
    ];
  }

  /* =======================================================
     2. החציל האציל
     ======================================================= */
  function eggplant(sec) {
    const { $, $$, mouth, show, hide, pop, unpop, swap, tears } = helpers(sec);
    const all = $('eggAll'), body = $('eggBody'), crownD = $('crownDrop'), cape = $('cape');
    const chorus = ['ch1', 'ch2', 'ch3', 'ch4'].map($);
    const legs = [$('egg-legL'), $('egg-legR')];
    gsap.set(chorus, { y: 340, opacity: 0 });
    gsap.set(crownD, { y: -560 });
    gsap.set(cape, { scaleY: 0, transformOrigin: '50% 0%' });
    gsap.set([$('potBack'), $('potFront')], { y: 440 });
    gsap.set(all, { scale: 0, transformOrigin: '50% 100%' });
    gsap.set(legs, { transformOrigin: '50% 0%' });
    const walk = (tl, at, n, amp = 22, d = .3) => {
      tl.to(legs[0], { rotation: amp, duration: d, yoyo: true, repeat: n, ease: 'sine.inOut' }, at);
      tl.to(legs[1], { rotation: -amp, duration: d, yoyo: true, repeat: n, ease: 'sine.inOut' }, at);
      tl.to(body, { y: -10, duration: d, yoyo: true, repeat: n, ease: 'sine.inOut' }, at);
    };

    return [
      { len: 6, fn(tl, t) {
        tl.to(all, { scale: 1, duration: 1.5, ease: 'elastic.out(1, .55)' }, t + .4);
      } },
      { fn(tl, t) { // מי יציל אותי?
        mouth(tl, 'egg', 'big', t + .5);
        show(tl, $('sweat'), t + .7, .3);
        tl.to($('egg-armL'), { rotation: 70, transformOrigin: '100% 0%', duration: .4 }, t + .6);
        tl.to($('egg-armR'), { rotation: -70, transformOrigin: '0% 0%', duration: .4 }, t + .6);
        tl.to($('egg-armL'), { rotation: 40, duration: .2, yoyo: true, repeat: 11, ease: 'sine.inOut' }, t + 1);
        tl.to($('egg-armR'), { rotation: -40, duration: .2, yoyo: true, repeat: 11, ease: 'sine.inOut' }, t + 1);
        tl.to(all, { x: -150, duration: 1.2, ease: 'power1.inOut' }, t + 1);
        tl.to(all, { x: 150, duration: 1.6, ease: 'power1.inOut' }, t + 2.2);
        tl.to(all, { x: 0, duration: 1.2, ease: 'power1.inOut' }, t + 3.8);
        walk(tl, t + 1, 13, 26, .3);
      } },
      { fn(tl, t) { // הירקות עונים בלאט
        tl.to($('egg-armL'), { rotation: 0, duration: .5 }, t + .2);
        tl.to($('egg-armR'), { rotation: 0, duration: .5 }, t + .2);
        hide(tl, $('sweat'), t + .2, .3);
        mouth(tl, 'egg', 'smile', t + .3);
        chorus.forEach((c, i) => tl.to(c, { y: 0, opacity: 1, duration: 1, ease: 'back.out(1.6)' }, t + .6 + i * .25));
        ['chc', 'cht', 'chq', 'chb'].forEach((k) => mouth(tl, k, 'smug', t + 1.2));
        pop(tl, $('whisper'), $('whisper-in'), t + 2.4);
        mouth(tl, 'egg', 'o', t + 3.2);
        tl.to($('egg-eyes'), { scale: 1.35, transformOrigin: '50% 50%', duration: .5, ease: 'back.out(2)' }, t + 3.2);
        tl.to(all, { x: 12, duration: .1, yoyo: true, repeat: 5 }, t + 3.4);
      } },
      { fn(tl, t) { // מה פתאום? אני אציל!
        unpop(tl, $('whisper'), $('whisper-in'), t + .1);
        tl.to($('egg-eyes'), { scale: 1, duration: .3 }, t + .2);
        swap(tl, $('egg-eyes'), $('egg-proud'), t + .6);
        mouth(tl, 'egg', 'smug', t + .6);
        show(tl, crownD, t + .8, .2);
        tl.to(crownD, { y: 0, duration: 1.2, ease: 'bounce.out' }, t + .8);
        show(tl, cape, t + 1.6, .2);
        tl.to(cape, { scaleY: 1, duration: 1, ease: 'back.out(1.5)' }, t + 1.6);
        tl.to(all, { scale: 1.12, rotation: -6, duration: 1.2, ease: 'power2.out' }, t + 2.2);
        tl.to($('rays'), { opacity: .7, duration: 1 }, t + 2.2);
        show(tl, $('glits'), t + 2.6, .6);
        ['chc', 'cht', 'chq', 'chb'].forEach((k) => mouth(tl, k, 'o', t + 2.6));
      } },
      { fn(tl, t) { // ששששש — לא יעזור לבכות
        hide(tl, $('rays'), t + .2, .6); hide(tl, $('glits'), t + .2, .4);
        tl.to(all, { scale: 1, rotation: 0, duration: .8 }, t + .3);
        ['chc', 'cht', 'chq', 'chb'].forEach((k) => mouth(tl, k, 'flat', t + .5));
        show(tl, $('shh'), t + .8, .5);
        tl.fromTo($('shh'), { x: 180 }, { x: -60, duration: 4, ease: 'power1.out', immediateRender: false }, t + .8);
        chorus.forEach((c, i) => tl.to(c, { y: -18, duration: .3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t + 1 + i * .1));
        swap(tl, $('egg-proud'), $('egg-eyes'), t + 1.6);
        mouth(tl, 'egg', 'sad', t + 1.6);
        tears(tl, 'egg', true, t + 2);
        tl.to(crownD, { rotation: 14, x: 8, duration: .6 }, t + 2.2);
        tl.to(cape, { scaleY: .9, duration: .6 }, t + 2.2);
      } },
      { len: 20, fn(tl, t) { // הדור או ברישול — לסיר!
        hide(tl, $('shh'), t + .2, .5);
        tears(tl, 'egg', false, t + .4);
        // הדור
        tl.to(crownD, { rotation: 0, x: 0, duration: .5 }, t + .5);
        tl.to(cape, { scaleY: 1, duration: .5 }, t + .5);
        swap(tl, $('egg-eyes'), $('egg-proud'), t + .6);
        mouth(tl, 'egg', 'smug', t + .6);
        show(tl, $('cane'), t + .7, .3);
        tl.to(all, { rotation: -5, duration: .4 }, t + .8);
        tl.to(all, { x: -170, duration: 3, ease: 'none' }, t + 1);
        walk(tl, t + 1, 9, 24, .3);
        // ברישול
        tl.to($('cane'), { opacity: 0, y: 60, rotation: 50, duration: .6 }, t + 4.2);
        swap(tl, $('egg-proud'), $('egg-eyes'), t + 4.3);
        mouth(tl, 'egg', 'wavy', t + 4.3);
        tl.to(crownD, { rotation: 26, x: 14, y: 6, duration: .6 }, t + 4.3);
        tl.to(cape, { scaleY: .82, rotation: 6, duration: .6 }, t + 4.3);
        tl.to(all, { rotation: 9, duration: .6 }, t + 4.3);
        tl.to(all, { x: 160, duration: 3.6, ease: 'none' }, t + 4.6);
        walk(tl, t + 4.6, 7, 12, .5);
        // הסיר עולה
        chorus.forEach((c, i) => tl.to(c, { y: 340, opacity: 0, duration: .8, ease: 'power2.in' }, t + 8 + i * .1));
        [$('potBack'), $('potFront')].forEach((p) => { show(tl, p, t + 8.4, .3); tl.to(p, { y: 0, duration: 1.4, ease: 'back.out(1.3)' }, t + 8.4); });
        mouth(tl, 'egg', 'big', t + 9.6);
        tl.to($('egg-eyes'), { scale: 1.4, duration: .4 }, t + 9.6);
        // קפיצה לסיר
        tl.to(all, { x: 0, rotation: 360, duration: 1.6, ease: 'power1.inOut' }, t + 10.4);
        tl.to(all, { y: -190, duration: .8, ease: 'power2.out' }, t + 10.4);
        tl.to(all, { y: 210, duration: .8, ease: 'power2.in' }, t + 11.2);
        tl.to([body, cape], { opacity: 0, duration: .3 }, t + 11.75);
        tl.to(crownD, { y: -60, rotation: -40, duration: .4, ease: 'power2.out' }, t + 11.8);
        tl.to(crownD, { y: 74, rotation: -12, duration: .7, ease: 'bounce.out' }, t + 12.2);
        show(tl, $('splash'), t + 11.9, .1);
        $$('[data-a="splash"] > g').forEach((d) => {
          tl.fromTo(d, { x: 0, y: 0, opacity: 1 }, { x: +d.dataset.dx, y: +d.dataset.dy, opacity: 0, duration: 1.4, ease: 'power2.out', immediateRender: false }, t + 11.9);
        });
        tl.to(sec.querySelector('[data-a="hot"]'), { opacity: .7, duration: 2 }, t + 12);
        tl.to(crownD, { rotation: -4, y: 68, duration: .6, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t + 13.2);
      } }
    ];
  }

  /* =======================================================
     3. השלדג
     ======================================================= */
  function kingfisher(sec) {
    const { $, $$, show, hide, pop, unpop, swap } = helpers(sec);
    const pos = $('kfPos'), tilt = $('kfTilt');
    const perch = { x: 600, y: 172 };
    gsap.set(pos, perch);
    gsap.set(tilt, { transformOrigin: '50% 50%' });
    const fly = (tl, at) => { hide(tl, $('kf-wingFold'), at, .15); show(tl, $('kf-wingFly'), at, .15); hide(tl, $('kf-feet'), at, .2); };
    const land = (tl, at) => { show(tl, $('kf-wingFold'), at, .15); hide(tl, $('kf-wingFly'), at, .15); show(tl, $('kf-feet'), at, .2); };

    return [
      { len: 6, fn(tl, t) {
        tl.to($('kf-head'), { rotation: -10, transformOrigin: '70% 80%', duration: .6, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t + .8);
      } },
      { fn(tl, t) { // ראיתי ציפור — כחולה, מקור ארוך
        tl.to($('kid'), { y: -14, duration: .3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t + .6);
        tl.to(tilt, { scale: 1.45, duration: 1.4, ease: 'power2.inOut' }, t + .8);
        tl.to($('kf-head'), { rotation: 8, duration: .5, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t + 2.2);
      } },
      { fn(tl, t) { // חג לו וחג
        tl.to(tilt, { scale: 1, duration: .8 }, t + .2);
        fly(tl, t + .6);
        show(tl, $('trail'), t + .8, .6);
        tl.to(pos, {
          motionPath: { path: [{ x: 400, y: 150 }, { x: 180, y: 228 }, { x: 400, y: 302 }, { x: 620, y: 228 }, { x: 400, y: 150 }, { x: 180, y: 228 }, { x: 400, y: 302 }, { x: 600, y: 236 }, { x: 390, y: 190 }], curviness: 1.4 },
          duration: 5.4, ease: 'none'
        }, t + .8);
        [[.11, -1], [.39, 1], [.61, -1], [.86, 1]].forEach(([p, s]) => tl.to(tilt, { scaleX: s, duration: .16 }, t + .8 + 5.4 * p));
        tl.to(tilt, { scaleX: 1, duration: .1 }, t + 6.2);
        hide(tl, $('trail'), t + 6, .5);
        pop(tl, $('label'), $('label-in'), t + 6.4);
        pop(tl, $('bulb'), $('bulb-in'), t + 6.6);
        show(tl, $('kid-eyesOpen'), t + 6.6, .2);
        hide(tl, $('kid-binos'), t + 6.6, .2);
      } },
      { fn(tl, t) { // צלל והחל להדגים
        unpop(tl, $('label'), $('label-in'), t + .2);
        unpop(tl, $('bulb'), $('bulb-in'), t + .2);
        tl.to(pos, { y: 170, duration: .6, yoyo: true, repeat: 1, ease: 'sine.inOut' }, t + .6);
        tl.to(tilt, { rotation: -78, duration: .5, ease: 'power2.in' }, t + 2);
        tl.to(pos, { x: 372, y: 430, duration: .9, ease: 'power3.in' }, t + 2.2);
        tl.to(pos, { opacity: 0, duration: .15 }, t + 3.05);
        show(tl, $('splash'), t + 3.05, .1);
        tl.fromTo($('splash').firstElementChild, { scaleY: .2, transformOrigin: '50% 100%' }, { scaleY: 1, duration: .5, ease: 'back.out(2)', immediateRender: false }, t + 3.05);
        $$('[data-a="splash"] > g').forEach((d) => tl.fromTo(d, { x: 0, y: 0, opacity: 1 }, { x: +d.dataset.dx, y: +d.dataset.dy, opacity: 0, duration: 1.2, ease: 'power2.out', immediateRender: false }, t + 3.05));
        hide(tl, $('splash'), t + 4.2, .5);
        show(tl, $('rings'), t + 3.1, .3);
        show(tl, $('bubbles'), t + 3.2, .3);
        hide(tl, $('fishA'), t + 3.6, .3);
      } },
      { len: 16, fn(tl, t) { // רצתי לספר — והוא ממריא עם דג
        hide(tl, $('kid-legsStand'), t + .5, .1); show(tl, $('kid-legsRun'), t + .5, .1);
        tl.to($('kid'), { x: -720, duration: 4.2, ease: 'power1.in' }, t + .7);
        tl.set(tilt, { rotation: -100 }, t + 1.8);
        show(tl, $('kf-fish'), t + 1.8, .1);
        tl.to(pos, { opacity: 1, duration: .15 }, t + 2);
        show(tl, $('splash'), t + 2, .1);
        $$('[data-a="splash"] > g').forEach((d) => tl.fromTo(d, { x: 0, y: 0, opacity: 1 }, { x: +d.dataset.dx * .8, y: +d.dataset.dy * .8, opacity: 0, duration: 1, ease: 'power2.out', immediateRender: false }, t + 2));
        hide(tl, $('splash'), t + 3, .4);
        tl.to(pos, { y: 120, x: 330, duration: 1.6, ease: 'power2.out' }, t + 2);
        tl.to(tilt, { rotation: 0, duration: 1.4, ease: 'power1.inOut' }, t + 2.4);
        hide(tl, $('bubbles'), t + 3, .5);
        hide(tl, $('rings'), t + 6, 1);
        tl.to(pos, { motionPath: { path: [{ x: 200, y: 90 }, { x: 330, y: 40 }, { x: 520, y: 100 }, { x: perch.x, y: perch.y }], curviness: 1.3 }, duration: 3.4, ease: 'power1.inOut' }, t + 3.8);
        tl.to(tilt, { scaleX: -1, duration: .15 }, t + 4.6);
        tl.to(tilt, { scaleX: 1, duration: .15 }, t + 7.1);
        land(tl, t + 7.2);
        tl.to($('kf-head'), { rotation: -12, duration: .4, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t + 7.6);
      } }
    ];
  }

  /* =======================================================
     4. ציפור אצילה
     ======================================================= */
  function noblebird(sec) {
    const { $, $$, mouth, show, hide, pop, unpop, swap } = helpers(sec);
    const catPos = $('catPos'), catSpin = $('catSpin'), momPos = $('momPos'), momTilt = $('momTilt');
    const home = { x: 398, y: 190 };
    gsap.set(catPos, { y: -100 });
    gsap.set(catSpin, { transformOrigin: '50% 50%' });
    gsap.set(momPos, { x: -320, y: -160 });
    gsap.set(momTilt, { scaleX: -1, transformOrigin: '50% 50%' });
    gsap.set($('mom-wingFold'), { opacity: 0 }); gsap.set($('mom-wingFly'), { opacity: 1 }); gsap.set($('mom-feet'), { opacity: 0 });
    gsap.set($('curL'), { x: -500 }); gsap.set($('curR'), { x: 500 });
    const leaves = $$('[data-a^="lf"]');
    leaves.forEach((l) => gsap.set(l, { x: +l.dataset.x, y: +l.dataset.y }));
    const chirp = (tl, at, n) => {
      tl.to($('chick-beakOpen'), { opacity: 1, duration: .12, yoyo: true, repeat: n, ease: 'none' }, at);
      tl.to($('chick-beak'), { opacity: 0, duration: .12, yoyo: true, repeat: n, ease: 'none' }, at);
    };
    const momFly = (tl, at) => { hide(tl, $('mom-wingFold'), at, .15); show(tl, $('mom-wingFly'), at, .15); hide(tl, $('mom-feet'), at, .15); };
    const momLand = (tl, at) => { show(tl, $('mom-wingFold'), at, .15); hide(tl, $('mom-wingFly'), at, .15); show(tl, $('mom-feet'), at, .15); };

    return [
      { len: 6, fn(tl, t) {
        tl.to($('cat-head'), { rotation: -8, transformOrigin: '50% 90%', duration: .6, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t + .8);
      } },
      { fn(tl, t) { // חתול טיפס — גוזל מצייץ
        show(tl, $('notes'), t + .4, .5);
        chirp(tl, t + .4, 13);
        tl.to(catPos, { y: -190, duration: 1, ease: 'power2.out' }, t + 1.2);
        tl.to(catPos, { y: -280, duration: 1, ease: 'power2.out' }, t + 2.3);
        tl.to(catPos, { y: -360, duration: 1, ease: 'power2.out' }, t + 3.4);
        tl.to(catSpin, { rotation: 4, duration: .5, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t + 1.2);
        show(tl, $('cat-tongue'), t + 4.6, .3);
      } },
      { fn(tl, t) { // אמא ציפור — רגע של מחזה
        hide(tl, $('cat-tongue'), t + .2, .3);
        show(tl, $('theater'), t + .4, .3);
        tl.to($('curL'), { x: 0, duration: 1.4, ease: 'power3.out' }, t + .4);
        tl.to($('curR'), { x: 0, duration: 1.4, ease: 'power3.out' }, t + .4);
        tl.to(momPos, { motionPath: { path: [{ x: 60, y: -40 }, { x: 260, y: 80 }, { x: home.x, y: home.y - 30 }, home], curviness: 1.2 }, duration: 2.6, ease: 'power1.inOut' }, t + 1);
        tl.to(momTilt, { scaleX: 1, duration: .2 }, t + 3.4);
        momLand(tl, t + 3.5);
        show(tl, $('beams'), t + 3.4, .8);
        tl.to(momTilt, { y: -10, duration: .25, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t + 3.8);
        hide(tl, $('notes'), t + 4, .5);
      } },
      { fn(tl, t) { // צרחה ונעצה מקור
        tl.to(momTilt, { scaleX: -1, duration: .2 }, t + .4);
        swap(tl, $('mom-beak'), $('mom-beakOpen'), t + .6, .1);
        show(tl, $('angry'), t + .6, .3);
        tl.to($('angry'), { x: 160, y: 120, duration: .1 }, t + .5);
        tl.to(momPos, { x: 432, y: 236, duration: .35, ease: 'power3.in', yoyo: true, repeat: 3 }, t + 1.6);
        pop(tl, $('pow'), $('pow-in'), t + 1.95, .5);
        show(tl, $('cat-spikes'), t + 1.95, .1);
        swap(tl, $('cat-eyes'), $('cat-x'), t + 1.95, .1);
        mouth(tl, 'cat', 'cry', t + 1.95, .1);
        tl.to(catSpin, { x: 8, duration: .06, yoyo: true, repeat: 15, ease: 'none' }, t + 2);
      } },
      { len: 12, fn(tl, t) { // נפל ונחבל — מיאו
        unpop(tl, $('pow'), $('pow-in'), t + .1);
        hide(tl, $('angry'), t + .1, .3);
        swap(tl, $('mom-beakOpen'), $('mom-beak'), t + .2, .1);
        tl.to($('curL'), { x: -500, duration: 1.2, ease: 'power2.in' }, t + .3);
        tl.to($('curR'), { x: 500, duration: 1.2, ease: 'power2.in' }, t + .3);
        hide(tl, $('beams'), t + .3, .6);
        tl.to(momPos, { x: home.x, y: home.y, duration: .6 }, t + .3);
        tl.to(catPos, { x: 130, duration: 1.6, ease: 'power1.out' }, t + .8);
        tl.to(catPos, { y: -88, duration: 1.6, ease: 'bounce.out' }, t + .8);
        tl.to(catSpin, { rotation: 540, duration: 1.3, ease: 'power1.in' }, t + .8);
        tl.set(catSpin, { rotation: 0 }, t + 2.15);
        leaves.forEach((l, i) => {
          tl.to(l, { opacity: 1, duration: .2 }, t + .8 + i * .1);
          tl.to(l, { y: '+=' + (360 + i * 10), x: '+=' + (i % 2 ? 60 : -60), rotation: 220 * (i % 2 ? 1 : -1), duration: 3, ease: 'sine.inOut' }, t + .8 + i * .1);
          tl.to(l, { opacity: 0, duration: .5 }, t + 3.4 + i * .1);
        });
        hide(tl, $('cat-spikes'), t + 2.2, .2);
        swap(tl, $('cat-pawsUp'), $('cat-pawsDown'), t + 2.2, .2);
        tl.set($('dizzy'), { x: 602, y: 452 }, t + 2.2);
        show(tl, $('dizzy'), t + 2.4, .3);
        show(tl, $('cat-bandage'), t + 3.4, .2);
        tl.fromTo($('cat-bandage'), { scale: 1.8, transformOrigin: '50% 50%' }, { scale: 1, duration: .4, ease: 'back.out(2)', immediateRender: false }, t + 3.4);
        swap(tl, $('cat-x'), $('cat-eyes'), t + 4.2, .2);
        show(tl, $('cat-tearsC'), t + 4.4, .3);
        pop(tl, $('meow'), $('meow-in'), t + 4.8);
      } },
      { fn(tl, t) { // הפסדתי ארוחה — חוסר מזל
        unpop(tl, $('meow'), $('meow-in'), t + .1);
        hide(tl, $('dizzy'), t + .1, .3);
        mouth(tl, 'cat', 'sad', t + .4);
        tl.to(catSpin, { scaleY: .92, transformOrigin: '50% 100%', duration: .6 }, t + .4);
        tl.set($('rain'), { x: 604, y: 314 }, t + .4);
        show(tl, $('rain'), t + .8, .5);
        tl.fromTo($('rain'), { y: 260 }, { y: 314, duration: .8, ease: 'power2.out', immediateRender: false }, t + .8);
        pop(tl, $('thinkPlate'), $('thinkPlate-in'), t + 2.2);
      } },
      { len: 14, fn(tl, t) { // אמא ציפור אצילה — הצילה
        hide(tl, $('rain'), t + .2, .4);
        unpop(tl, $('thinkPlate'), $('thinkPlate-in'), t + .2);
        tl.to(catPos, { x: 520, duration: 4, ease: 'power1.in' }, t + .8);
        hide(tl, $('cat-tearsC'), t + .6, .3);
        momFly(tl, t + .8);
        tl.to(momPos, { motionPath: { path: [{ x: 360, y: 120 }, { x: 340, y: 160 }], curviness: 1 }, duration: 1.2, ease: 'power1.inOut' }, t + .8);
        momLand(tl, t + 2);
        tl.to(momTilt, { scaleX: 1, duration: .2 }, t + .8);
        show(tl, $('nestGlow'), t + 2.2, 1);
        pop(tl, $('mom-medal'), null, t + 3);
        show(tl, $('hearts'), t + 3.4, .6);
        tl.to($('chickW'), { y: -10, duration: .3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t + 3.6);
        chirp(tl, t + 3.6, 7);
        tl.to(momTilt, { rotation: -8, duration: .5, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t + 4.2);
      } }
    ];
  }

  /* =======================================================
     5. שן חלב
     ======================================================= */
  function tooth(sec) {
    const { $, $$, show, hide, pop, unpop, swap } = helpers(sec);
    const teeth = [0, 1, 2, 3, 4, 5].map((i) => $('tt' + i));
    gsap.set(teeth, { scaleY: 0, scaleX: .6, transformOrigin: '50% 100%' });
    gsap.set($('bigTooth'), { scaleY: 0, scaleX: .4, transformOrigin: '50% 100%' });
    gsap.set($('climber'), { y: 52 });
    const rb = $$('[data-a^="rb"]');
    gsap.set(rb, { strokeDasharray: 1000, strokeDashoffset: 1000 });
    const conf = $$('[data-a="confetti"] > g');
    conf.forEach((c) => gsap.set(c, { x: +c.dataset.x, y: -140, opacity: 0 }));

    return [
      { len: 6, fn(tl, t) {
        tl.to($('babyHead'), { rotation: 5, transformOrigin: '50% 100%', duration: .6, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t + .8);
      } },
      { fn(tl, t) { // שן חלב צמחה לשני
        tl.to($('sceneA'), { scale: 1.65, svgOrigin: '400 300', duration: 1.5, ease: 'power2.inOut' }, t + .6);
        pop(tl, $('ting'), null, t + 2);
        tl.to($('ting'), { rotation: 90, transformOrigin: '50% 50%', duration: 1.2 }, t + 2.2);
        tl.to($('sceneA'), { scale: 1, duration: 1.3, ease: 'power2.inOut' }, t + 4);
        hide(tl, $('ting'), t + 4.4, .4);
        pop(tl, $('photo'), $('photo-in'), t + 5.2);
        tl.fromTo($('photo-in'), { rotation: -10 }, { rotation: 6, transformOrigin: '50% 0%', duration: .8, yoyo: true, repeat: 1, ease: 'sine.inOut', immediateRender: false }, t + 5.6);
      } },
      { fn(tl, t) { // שיני חלב צומחות... ונושרות
        tl.to($('sceneA'), { opacity: 0, y: 40, duration: .7 }, t + .2);
        show(tl, $('sceneB'), t + .6, .6);
        teeth.forEach((el, i) => tl.to(el, { scaleY: 1, scaleX: 1, duration: .8, ease: 'back.out(2.4)' }, t + 1.2 + i * .35));
        show(tl, $('chute'), t + 4.6, .4);
        tl.to([teeth[1], $('ttFall')], { y: -40, duration: .5, ease: 'power2.out' }, t + 4.6);
        tl.to([teeth[1], $('ttFall')], { y: 250, duration: 3, ease: 'sine.in' }, t + 5.1);
        tl.to([teeth[1], $('ttFall')], { x: 40, rotation: 8, duration: .75, yoyo: true, repeat: 3, ease: 'sine.inOut' }, t + 5.1);
      } },
      { fn(tl, t) { // למה? זה פשוט שלב
        tl.to($('sceneB'), { opacity: 0, y: 40, duration: .7 }, t + .2);
        show(tl, $('sceneC'), t + .6, .6);
        show(tl, $('qmarks'), t + 1, .6);
        const c = $('climber');
        for (let i = 1; i <= 3; i++) {
          const at = t + 2 + (i - 1) * 1.1;
          tl.to(c, { x: -120 * i, duration: .8, ease: 'none' }, at);
          tl.to(c, { y: 52 - 80 * i - 70, duration: .4, ease: 'power2.out' }, at);
          tl.to(c, { y: 52 - 80 * i, duration: .4, ease: 'power2.in' }, at + .4);
        }
        hide(tl, $('qmarks'), t + 5.2, .4);
        pop(tl, $('bang'), $('bang-in'), t + 5.4);
        tl.to($('climber'), { rotation: 8, transformOrigin: '50% 100%', duration: .3, yoyo: true, repeat: 3 }, t + 5.6);
      } },
      { len: 18, fn(tl, t) { // שן צומחת, שן נושרת — שן לתפארת
        tl.to($('sceneC'), { opacity: 0, y: 40, duration: .7 }, t + .2);
        show(tl, $('sceneD'), t + .6, .6);
        show(tl, $('wave'), t + 1.4, .4);
        tl.to($('milkTooth'), { rotation: 10, transformOrigin: '50% 100%', duration: .25, yoyo: true, repeat: 5 }, t + 1.4);
        tl.to($('milkTooth'), { y: -70, duration: .6, ease: 'power2.out' }, t + 3);
        show(tl, $('chute2'), t + 3.2, .3);
        hide(tl, $('wave'), t + 3.4, .4);
        tl.to($('milkTooth'), { x: 330, y: 240, rotation: 14, duration: 3.4, ease: 'sine.in' }, t + 3.6);
        tl.to($('bigTooth'), { scaleY: 1, scaleX: 1, duration: 1.6, ease: 'elastic.out(1, .5)' }, t + 5.6);
        rb.forEach((p, i) => tl.to(p, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.out' }, t + 7.4 + i * .18));
        pop(tl, $('medal'), $('medal-in'), t + 8.6);
        show(tl, $('glits'), t + 8.8, .6);
        conf.forEach((c, i) => {
          tl.to(c, { opacity: 1, duration: .1 }, t + 9 + (i % 13) * .18);
          tl.to(c, { y: 760, rotation: +c.dataset.r, duration: 3.4, ease: 'none' }, t + 9 + (i % 13) * .18);
        });
      } }
    ];
  }

  /* =======================================================
     6. הארנב
     ======================================================= */
  function rabbit(sec) {
    const { $, $$, show, hide, pop, unpop, swap } = helpers(sec);
    const pos = $('rabPos'), bounce = $('rabBounce');
    const mr = sec.querySelector('.curtain--mr'), ml = sec.querySelector('.curtain--ml');
    gsap.set(pos, { x: 560 });
    gsap.set(bounce, { transformOrigin: '50% 100%' });
    const conf = $$('[data-a="confetti"] > g');
    conf.forEach((c) => gsap.set(c, { x: +c.dataset.x, y: -160, opacity: 0 }));
    const bite = $('biteMask');

    return [
      { len: 6, fn() {} },
      { fn(tl, t) { // ידידנו הארנב — חיית מחמד
        tl.to(mr, { xPercent: 100, duration: 1.8, ease: 'power2.inOut' }, t);
        tl.to(ml, { xPercent: -100, duration: 1.8, ease: 'power2.inOut' }, t);
        tl.to(pos, { x: 0, duration: 2.6, ease: 'none' }, t + 1);
        tl.to(bounce, { y: -70, duration: .26, yoyo: true, repeat: 9, ease: 'power1.out' }, t + 1);
        tl.to(bounce, { scaleY: .9, duration: .13, yoyo: true, repeat: 1 }, t + 3.6);
        show(tl, $('hearts'), t + 3.8, .6);
        show(tl, $('rab-collar'), t + 4, .3);
        tl.fromTo($('rab-collar'), { scale: .3, transformOrigin: '50% 50%' }, { scale: 1, duration: .5, ease: 'back.out(2.4)', immediateRender: false }, t + 4);
        swap(tl, $('rab-eyes'), $('rab-happy'), t + 4.4);
      } },
      { fn(tl, t) { // קוסם — מכרסם את הגזר
        hide(tl, $('hearts'), t + .2, .5);
        swap(tl, $('rab-happy'), $('rab-eyes'), t + .3);
        show(tl, $('wand'), t + .6, .3);
        tl.to($('armWand'), { rotation: -18, transformOrigin: '0% 0%', duration: .25, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t + 1);
        pop(tl, $('hat'), $('hat-in'), t + 1.4);
        pop(tl, $('hatFront'), $('hatFront-in'), t + 1.4);
        show(tl, $('magic'), t + 1.8, .4);
        show(tl, $('hatCarrot'), t + 2.6, .1);
        tl.fromTo($('hatCarrot'), { y: 80 }, { y: -40, duration: 1.2, ease: 'back.out(1.6)', immediateRender: false }, t + 2.6);
        hide(tl, $('magic'), t + 4, .4);
        tl.to($('hatCarrot'), { x: -248, y: -70, rotation: -30, scale: .78, duration: 1, ease: 'power2.inOut' }, t + 4.2);
        hide(tl, $('hatCarrot'), t + 5.15, .1);
        hide(tl, $('wand'), t + 4.4, .3);
        swap(tl, $('armDown'), $('armHold'), t + 5.1, .1);
        show(tl, $('held'), t + 5.1, .1);
        // ביס ראשון
        swap(tl, $('rab-teeth'), $('rab-chew'), t + 6.2, .1);
        tl.to(bite, { y: 34, duration: .3, ease: 'power2.out' }, t + 6.3);
        show(tl, $('crumbs'), t + 6.3, .2);
        swap(tl, $('rab-chew'), $('rab-teeth'), t + 6.8, .1);
        hide(tl, $('crumbs'), t + 7.4, .3);
      } },
      { fn(tl, t) { // שיניו מאוד חדות
        tl.to($('world'), { scale: 1.9, svgOrigin: '330 392', duration: 1.4, ease: 'power2.inOut' }, t + .5);
        show(tl, $('ting'), t + 1.9, .2);
        tl.fromTo($('ting').firstElementChild, { scale: .2, rotation: -45, transformOrigin: '50% 50%' }, { scale: 1.4, rotation: 45, duration: .8, ease: 'back.out(2)', immediateRender: false }, t + 1.9);
        tl.to($('rab-teeth'), { scaleY: 1.18, transformOrigin: '50% 0%', duration: .3, yoyo: true, repeat: 3 }, t + 2.2);
      } },
      { len: 22, fn(tl, t) { // אממ אאמ אממ — והופ!
        hide(tl, $('ting'), t + .1, .3);
        tl.to($('world'), { scale: 1, duration: 1.2, ease: 'power2.inOut' }, t + .2);
        for (let k = 0; k < 3; k++) {
          const at = t + 1.6 + k * 1.5;
          swap(tl, $('rab-teeth'), $('rab-chew'), at, .1);
          tl.to(bite, { y: 34 + (k + 1) * 34, duration: .3, ease: 'power2.out' }, at + .1);
          show(tl, $('crumbs'), at + .1, .2);
          pop(tl, $('amm' + k), $('amm' + k + '-in'), at + .1, .5);
          tl.to(bounce, { scaleY: .95, duration: .15, yoyo: true, repeat: 3 }, at);
          swap(tl, $('rab-chew'), $('rab-teeth'), at + .7, .1);
        }
        hide(tl, $('crumbs'), t + 6.4, .3);
        // הופ!
        const hop = t + 6.8;
        show(tl, $('poof'), hop, .1);
        tl.fromTo($('poof-in'), { scale: .2, transformOrigin: '50% 50%' }, { scale: 1.5, duration: .9, ease: 'power2.out', immediateRender: false }, hop);
        tl.to($('poof'), { opacity: 0, duration: .8 }, hop + .7);
        hide(tl, $('armHold'), hop + .2, .1);
        show(tl, $('armUp'), hop + .2, .1); show(tl, $('armUp2'), hop + .2, .1);
        hide(tl, $('armWand'), hop + .2, .1);
        ['amm0', 'amm1', 'amm2'].forEach((a) => hide(tl, $(a), hop, .3));
        swap(tl, $('rab-eyes'), $('rab-happy'), hop + .3);
        pop(tl, $('hop'), $('hop-in'), hop + .5);
        tl.to(bounce, { y: -50, duration: .3, yoyo: true, repeat: 3, ease: 'power1.out' }, hop + .6);
        conf.forEach((c, i) => {
          tl.to(c, { opacity: 1, duration: .1 }, hop + .8 + (i % 12) * .2);
          tl.to(c, { y: 820, rotation: +c.dataset.r, duration: 3.6, ease: 'none' }, hop + .8 + (i % 12) * .2);
        });
        // הווילון יורד
        tl.to(mr, { xPercent: 0, duration: 2.6, ease: 'power2.inOut' }, t + 16);
        tl.to(ml, { xPercent: 0, duration: 2.6, ease: 'power2.inOut' }, t + 16);
      } }
    ];
  }

  return { salad, eggplant, kingfisher, noblebird, tooth, rabbit };
})();
