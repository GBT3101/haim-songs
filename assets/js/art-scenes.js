/* =========================================================
   תפאורות — רקע (backdrop) ושחקנים (actors) לכל שיר
   רקע:   viewBox 0 0 1600 1000, "slice" — ממלא את כל המסך
   שחקנים: viewBox 0 0 800 700, "meet" — מתאים את עצמו למסך
   ========================================================= */
(function (A) {
  'use strict';
  const { R, rnd, f, star, sparkle, heart, note, face, carrot, cabbage, tomato, cucumber, onion, eggplant, crown,
    kingfisher, fishShape, child, cat, momBird, chick, nest, tooth, rabbit, dizzyStars, bubble, thought, burst, INK } = A;

  const bg = (inner, defs = '') =>
    `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false"><defs>${defs}</defs>${inner}</svg>`;
  const lg = (id, stops, x2 = 0, y2 = 1) =>
    `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</linearGradient>`;
  const rg = (id, stops, cx = .5, cy = .5, r = .5) =>
    `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</radialGradient>`;

  function cloud(x, y, s, fill = '#fff', o = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${o}"><path d="M-90 20 C -110 20 -112 -8 -88 -10 C -90 -40 -50 -48 -36 -26 C -26 -60 30 -62 38 -24 C 60 -40 96 -24 86 2 C 110 4 110 22 90 22Z" fill="${fill}"/></g>`;
  }
  function flower(x, y, s, petal = '#fff', mid = '#ffcc33') {
    let p = '';
    for (let i = 0; i < 5; i++) p += `<ellipse cx="0" cy="-7" rx="4.6" ry="7" fill="${petal}" transform="rotate(${i * 72})"/>`;
    return `<g transform="translate(${x} ${y}) scale(${s})">${p}<circle r="4" fill="${mid}"/></g>`;
  }
  function grassTufts(x0, x1, y, n, color = '#4f9a3a') {
    let s = '';
    for (let i = 0; i < n; i++) {
      const x = R(x0, x1), h = R(14, 30);
      s += `<path class="sway" style="--d:${f(R(-4, 0))}s" d="M${f(x)} ${y} q-3 ${f(-h * .6)} -8 ${f(-h)} M${f(x)} ${y} q1 ${f(-h * .7)} 2 ${f(-h * 1.1)} M${f(x)} ${y} q4 ${f(-h * .5)} 9 ${f(-h * .9)}" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
    }
    return s;
  }

  /* =======================================================
     1. סלט ירקות — מטבח שטוף שמש
     ======================================================= */
  const salad = {
    backdrop() {
      let motes = '';
      for (let i = 0; i < 26; i++) motes += `<circle class="rise" style="--t:${f(R(9, 18))}s;--d:${f(R(-18, 0))}s;--h:-${f(R(200, 420))}px;--o:.7" cx="${f(R(380, 1100))}" cy="${f(R(600, 980))}" r="${f(R(1.5, 4))}" fill="#fff"/>`;
      let jars = '';
      [['#7cbf4f', '#bfe39a'], ['#e5413a', '#ff8a7a'], ['#f2b33d', '#ffe08a']].forEach(([c, h], i) => {
        const x = 1060 + i * 130;
        jars += `<g transform="translate(${x} 418)"><rect x="-42" y="-86" width="84" height="98" rx="18" fill="#eaf6ff" opacity=".7" stroke="#cfe3f2" stroke-width="3"/>
          <rect x="-36" y="-56" width="72" height="62" rx="14" fill="${c}"/><circle cx="-14" cy="-36" r="9" fill="${h}" opacity=".8"/><circle cx="12" cy="-20" r="7" fill="${h}" opacity=".7"/>
          <rect x="-46" y="-102" width="92" height="20" rx="7" fill="${i === 1 ? '#f2b33d' : '#e5413a'}"/><rect x="-46" y="-102" width="92" height="6" rx="3" fill="#fff" opacity=".35"/>
          <rect x="-24" y="-44" width="48" height="24" rx="4" fill="#fffaf0"/><path d="M-14 -32 h28" stroke="#c8452c" stroke-width="3"/></g>`;
      });
      return bg(`
        <rect width="1600" height="1000" fill="url(#sWall)"/>
        <rect width="1600" height="560" fill="url(#sPaper)"/>
        <rect y="560" width="1600" height="440" fill="url(#sTiles)"/>
        <rect y="552" width="1600" height="14" fill="#e7c48f"/>
        <!-- חלון -->
        <g transform="translate(560 330)">
          <rect x="-250" y="-230" width="500" height="430" rx="30" fill="#ffffff" filter="drop-shadow(0 18px 18px rgba(120,70,0,.18))"/>
          <rect x="-222" y="-202" width="444" height="374" rx="16" fill="url(#sSky)"/>
          <circle cx="110" cy="-110" r="46" fill="#fff4b0"/><circle cx="110" cy="-110" r="90" fill="url(#gGlow)" class="glow"/>
          <g class="drift-x" style="--t:26s;--a:40px">${cloud(-90, -120, .9)}</g>
          <g class="drift-x" style="--t:34s;--a:-50px">${cloud(60, -40, .6, '#fff', .9)}</g>
          <path d="M-222 120 C -140 60 -60 70 0 100 C 70 50 160 60 222 100 V172 H-222Z" fill="#9fd88a"/>
          <path d="M-222 150 C -120 110 40 130 222 140 V172 H-222Z" fill="#7cc36a"/>
          <rect x="-8" y="-202" width="16" height="374" fill="#fff"/><rect x="-222" y="-22" width="444" height="16" fill="#fff"/>
          <rect x="-280" y="196" width="560" height="30" rx="10" fill="#f7e2bf"/>
          <g transform="translate(-150 196)"><path d="M-30 -60 h60 l-8 60 h-44z" fill="#d9774a"/><rect x="-34" y="-66" width="68" height="14" rx="5" fill="#e98a5a"/>
            <g class="sway" style="--d:-1s"><path d="M0 -64 C -30 -90 -40 -130 -10 -150 C 0 -120 6 -96 0 -64Z" fill="#5fb446"/><path d="M0 -64 C 30 -96 40 -128 18 -150 C 6 -122 -2 -96 0 -64Z" fill="#4c9f39"/><path d="M0 -64 C -8 -100 0 -150 6 -170 C 16 -140 10 -100 0 -64Z" fill="#6cc455"/></g></g>
          <g transform="translate(160 196)"><path d="M-24 -40 h48 l-6 40 h-36z" fill="#5b8fd9"/><rect x="-14" y="-110" width="28" height="74" rx="14" fill="#6dbb58"/><rect x="-36" y="-90" width="16" height="40" rx="8" fill="#6dbb58"/>
            <circle cx="0" cy="-114" r="8" fill="#ff7aa2"/></g>
          <!-- וילונות -->
          <path d="M-266 -250 C -270 -100 -250 60 -300 200 C -260 210 -220 200 -200 190 C -210 120 -200 0 -170 -250Z" fill="url(#sCurtain)"/>
          <path d="M266 -250 C 270 -100 250 60 300 200 C 260 210 220 200 200 190 C 210 120 200 0 170 -250Z" fill="url(#sCurtain)"/>
          <rect x="-300" y="-262" width="600" height="22" rx="11" fill="#c8452c"/>
          <circle cx="-300" cy="-251" r="16" fill="#e5413a"/><circle cx="300" cy="-251" r="16" fill="#e5413a"/>
        </g>
        <!-- קרני אור -->
        <g class="glow" style="--d:-1s"><path d="M380 160 L780 160 L1260 1000 L520 1000Z" fill="#fff" opacity=".16"/></g>
        <g class="glow" style="--d:-2s"><path d="M470 160 L640 160 L960 1000 L700 1000Z" fill="#fff" opacity=".14"/></g>
        ${motes}
        <!-- מדף וצנצנות -->
        <rect x="990" y="426" width="420" height="22" rx="6" fill="#b5763d"/><path d="M1010 448 l20 40 M1390 448 l-20 40" stroke="#8d5a2b" stroke-width="10" stroke-linecap="round"/>
        ${jars}
        <!-- כלים תלויים -->
        <rect x="1000" y="70" width="440" height="12" rx="6" fill="#b9c3cc"/>
        <g transform="translate(1080 82)"><g class="sway-t" style="--d:-1s"><path d="M0 0 v120" stroke="#9aa6b2" stroke-width="8" stroke-linecap="round"/><ellipse cx="0" cy="140" rx="30" ry="22" fill="#b9c3cc"/><ellipse cx="0" cy="134" rx="22" ry="12" fill="#8f9ba6"/></g></g>
        <g transform="translate(1200 82)"><g class="sway-t" style="--d:-2.4s"><path d="M0 0 v70" stroke="#c98b4a" stroke-width="10" stroke-linecap="round"/><path d="M-26 70 h52 v70 a26 26 0 0 1 -52 0z" fill="#e0a96c"/></g></g>
        <g transform="translate(1320 82)"><g class="sway-t" style="--d:-3.3s"><path d="M0 0 v70" stroke="#9aa6b2" stroke-width="7" stroke-linecap="round"/>
          <path d="M0 70 C -26 110 -22 170 0 176 C 22 170 26 110 0 70Z M0 70 C -12 110 -10 160 0 176 C 10 160 12 110 0 70Z" fill="none" stroke="#9aa6b2" stroke-width="4"/></g></g>
      `, `${lg('sWall', [[0, '#fff7e6'], [1, '#ffe2b8']])}
          ${lg('sSky', [[0, '#a9defa'], [1, '#fff3d4']])}
          ${lg('sCurtain', [[0, '#ffd56b'], [.5, '#ffe7a0'], [1, '#f2b33d']], 1, 0)}
          <pattern id="sPaper" width="90" height="90" patternUnits="userSpaceOnUse"><g fill="#f4c27f" opacity=".35">
            <circle cx="20" cy="20" r="4"/><circle cx="14" cy="20" r="3"/><circle cx="26" cy="20" r="3"/><circle cx="20" cy="14" r="3"/><circle cx="20" cy="26" r="3"/>
            <circle cx="65" cy="65" r="4"/><circle cx="59" cy="65" r="3"/><circle cx="71" cy="65" r="3"/><circle cx="65" cy="59" r="3"/><circle cx="65" cy="71" r="3"/></g></pattern>
          <pattern id="sTiles" width="80" height="80" patternUnits="userSpaceOnUse"><rect width="80" height="80" fill="#fffaf0"/>
            <rect x="3" y="3" width="74" height="74" rx="6" fill="#d8efe6"/><circle cx="40" cy="40" r="12" fill="none" stroke="#9fd2c0" stroke-width="3"/>
            <path d="M40 22 v-12 M40 58 v12 M22 40 h-12 M58 40 h12" stroke="#9fd2c0" stroke-width="3"/></pattern>`);
    },

    actors() {
      // ערימת הסלט — חתיכות ירקות
      let pieces = '';
      const kinds = ['tom', 'cuc', 'car', 'oni', 'cab', 'tom', 'cuc', 'par'];
      for (let i = 0; i < 96; i++) {
        const x = R(205, 595);
        const h = 105 * Math.sqrt(Math.max(0, 1 - Math.pow((x - 400) / 215, 2)));
        const y = 380 - R(0, h);
        const k = kinds[i % kinds.length], rot = f(R(-60, 60));
        const happy = i % 9 === 0;
        let p = '';
        if (k === 'tom') p = `<path d="M-20 0 A20 20 0 0 1 20 0Z" fill="#e8402f"/><path d="M-15 -1 A15 15 0 0 1 15 -1Z" fill="#ff7a62"/><ellipse cx="-6" cy="-6" rx="2.4" ry="3.4" fill="#ffe2a6"/><ellipse cx="6" cy="-6" rx="2.4" ry="3.4" fill="#ffe2a6"/>`;
        if (k === 'cuc') p = `<circle r="16" fill="#3f8f35"/><circle r="13" fill="#d8f0b0"/><circle r="6" fill="#bfe08e"/><g fill="#f4fbe6"><ellipse cx="0" cy="-4" rx="1.6" ry="2.6"/><ellipse cx="4" cy="2" rx="1.6" ry="2.6" transform="rotate(120 4 2)"/><ellipse cx="-4" cy="2" rx="1.6" ry="2.6" transform="rotate(240 -4 2)"/></g>`;
        if (k === 'car') p = `<circle r="13" fill="#f58a1f"/><circle r="7" fill="#ffb35c"/>`;
        if (k === 'oni') p = `<circle r="13" fill="none" stroke="#f1e2f4" stroke-width="5"/><circle r="7" fill="none" stroke="#e2c0ea" stroke-width="3"/>`;
        if (k === 'cab') p = `<path d="M-18 4 C -10 -10 4 10 18 -4" stroke="#c6eb9b" stroke-width="7" fill="none" stroke-linecap="round"/>`;
        if (k === 'par') p = `<path d="M0 0 C -10 -6 -10 -16 0 -20 C 10 -16 10 -6 0 0Z" fill="#3f9a35"/><path d="M0 0 C -14 2 -20 -6 -16 -14 C -8 -12 -4 -6 0 0Z" fill="#5fb446"/>`;
        if (happy && (k === 'cuc' || k === 'car' || k === 'tom')) p += `<circle cx="-4" cy="${k === 'tom' ? -8 : -2}" r="1.8" fill="${INK}"/><circle cx="4" cy="${k === 'tom' ? -8 : -2}" r="1.8" fill="${INK}"/><path d="M-3 ${k === 'tom' ? -4 : 2} q3 3 6 0" stroke="${INK}" stroke-width="1.4" fill="none"/>`;
        pieces += `<g transform="translate(${f(x)} ${f(y)}) rotate(${rot}) scale(1.25)"><g class="pc">${p}</g></g>`;
      }
      const shout = `<g data-a="shout" opacity="0" stroke="#e5413a" stroke-width="6" stroke-linecap="round">
          <path d="M168 150 l-34 -14 M162 186 l-38 0 M168 222 l-34 14"/><path d="M308 150 l34 -14 M314 186 l38 0 M308 222 l34 14"/>
          <text class="fx" x="300" y="96" font-size="64" fill="#e5413a" stroke="none" transform="rotate(12 300 96)">!!</text></g>`;
      const stamp = `<g data-a="stamp" opacity="0" transform="translate(178 120) rotate(-14)"><g data-a="stamp-in">
          <circle r="76" fill="#fffaf0" fill-opacity=".55" stroke="#d3283c" stroke-width="7"/><circle r="64" fill="none" stroke="#d3283c" stroke-width="3"/>
          <text class="fx-serif" x="0" y="16" text-anchor="middle" font-size="44" fill="#d3283c">הֻחְלַט!</text>
          ${star(-44, -36, 8, '#d3283c')}${star(44, -36, 8, '#d3283c')}${star(0, 46, 8, '#d3283c')}</g></g>`;
      const compass = `<g transform="translate(664 132)"><g data-a="compass" opacity="0">
          <circle r="38" fill="url(#gGold)"/><circle r="31" fill="#fffaf0"/>
          <text class="fx-serif" x="0" y="-14" text-anchor="middle" font-size="20" fill="#c8452c">צ</text>
          <g class="spin" style="--t:.7s"><path d="M0 -24 L7 0 L0 24 L-7 0Z" fill="#2d8ce0"/><path d="M0 -24 L7 0 L-7 0Z" fill="#e5413a"/></g>
          <circle r="4" fill="#3a2a20"/></g></g>`;
      const waves = `<g data-a="onionWaves" opacity="0" fill="none" stroke="#c99a52" stroke-width="5" stroke-linecap="round">
          ${[0, .7, 1.4, 2.1].map((d) => `<g class="ripple" style="--d:-${d}s;--t:2.8s"><path d="M560 380 a100 100 0 0 1 200 0" stroke-dasharray="14 12"/></g>`).join('')}</g>`;
      const mom = `<g data-a="mom">
          <path d="M572 -620 L668 -620 L652 64 L560 64Z" fill="#e65a6e"/><path d="M572 -620 L668 -620 L652 64 L560 64Z" fill="url(#pDots)"/>
          <rect x="552" y="50" width="108" height="30" rx="12" fill="#fffaf0"/>
          <path d="M566 78 L648 78 L634 150 L578 150Z" fill="url(#gSkin)"/>
          <g data-a="spoon"><path d="M612 160 L452 352" stroke="#c98b4a" stroke-width="16" stroke-linecap="round"/>
            <ellipse cx="438" cy="370" rx="26" ry="38" transform="rotate(40 438 370)" fill="#d9a066" stroke="#a8682f" stroke-width="3"/></g>
          <ellipse cx="606" cy="166" rx="40" ry="34" fill="url(#gSkin)"/>
          <path d="M574 160 q-10 14 4 22 M584 176 q-6 14 8 18" stroke="#d99a72" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
      const slashes = `<g data-a="slashes" opacity="0" stroke="#fff" stroke-linecap="round">
          ${[[150, 140, 330, 360], [260, 190, 420, 420], [440, 230, 600, 430], [520, 160, 700, 360], [330, 300, 520, 440]].map(([x1, y1, x2, y2], i) =>
            `<g data-a="slash${i}"><path d="M${x1} ${y1} L${x2} ${y2}" stroke-width="12" opacity=".95"/><path d="M${x1} ${y1} L${x2} ${y2}" stroke-width="30" opacity=".25"/></g>`).join('')}</g>`;
      let glits = '';
      for (let i = 0; i < 12; i++) glits += sparkle(f(R(170, 630)), f(R(200, 330)), f(R(8, 16)), i % 3 ? '#fff' : '#ffe27a', 'twinkle', R(-2, 0));

      return `
        <g data-a="table"><rect x="-1600" y="528" width="4000" height="1400" fill="url(#pGingham)"/>
          <rect x="-1600" y="528" width="4000" height="1400" fill="url(#sTableShade)"/>
          <rect x="-1600" y="522" width="4000" height="10" fill="#fff" opacity=".6"/></g>
        <ellipse cx="400" cy="556" rx="270" ry="26" fill="url(#gShadow)"/>
        <ellipse cx="400" cy="360" rx="235" ry="40" fill="url(#gBowlIn)"/>
        <ellipse cx="400" cy="360" rx="235" ry="40" fill="none" stroke="#fff" stroke-width="8"/>
        <g transform="translate(318 292)"><g data-a="cabbageW"><g class="breathe" style="--d:-1s">${cabbage('cabbage')}</g></g></g>
        <g transform="translate(232 178) rotate(-10)"><g data-a="carrotW"><g class="breathe" style="--d:-2s">${carrot('carrot')}</g></g></g>
        <g transform="translate(594 300) rotate(16)"><g data-a="cucumberW"><g class="breathe" style="--d:-.5s">${cucumber('cucumber')}</g></g></g>
        <g transform="translate(508 334)"><g data-a="tomatoW"><g class="tremble" style="--amp:0">${tomato('tomato')}</g></g></g>
        <g transform="translate(408 360)"><g data-a="onionW"><g class="breathe" style="--d:-1.6s">${onion('onion')}</g></g></g>
        <g data-a="water" opacity="0"><ellipse cx="400" cy="384" rx="222" ry="34" fill="#8fd8ff" opacity=".8"/>
          <path d="M240 378 q40 -10 80 0 t80 0 t80 0 t80 0" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/></g>
        <g data-a="salad">${pieces}</g>
        <path d="M165 360 A235 40 0 0 0 635 360 C 630 470 530 550 400 550 C 270 550 170 470 165 360Z" fill="url(#gBowl)"/>
        <path d="M165 360 A235 40 0 0 0 635 360 C 630 470 530 550 400 550 C 270 550 170 470 165 360Z" fill="url(#gBowlSide)"/>
        <path d="M184 432 Q400 512 616 432" stroke="#5b9bd5" stroke-width="12" fill="none" stroke-linecap="round"/>
        <path d="M200 458 Q400 530 600 458" stroke="#5b9bd5" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="2 16"/>
        ${[250, 325, 400, 475, 550].map((x, i) => `<g transform="translate(${x} ${[404, 420, 426, 420, 404][i]})">${heartFlower()}</g>`).join('')}
        <path d="M165 360 A235 40 0 0 0 635 360" stroke="#fff" stroke-width="9" fill="none"/>
        <path d="M200 390 Q210 440 250 480" stroke="#fff" stroke-width="10" stroke-linecap="round" fill="none" opacity=".8"/>
        <path d="M340 544 h120 l14 16 h-148z" fill="#c6d8ea"/>
        ${shout}
        <g data-a="cough" opacity="0">${[0, .9, 1.8].map((d, i) => `<circle class="steam" style="--d:-${d}s;--t:2.7s" cx="${270 - i * 8}" cy="300" r="${12 + i * 3}" fill="#dfe6da"/>`).join('')}</g>
        <g data-a="sweat" opacity="0"><path d="M392 232 q-9 15 0 22 q9 -7 0 -22z" fill="#8fd8ff" stroke="#4aa8e0" stroke-width="2"/></g>
        ${bubble('dots', 618, 222, 120, 70, `<g fill="${INK}"><circle cx="-26" cy="0" r="7"/><circle cx="0" cy="0" r="7"/><circle cx="26" cy="0" r="7"/></g>`, { tail: 'left' })}
        ${compass}
        ${dizzyStars('dizzy', 612, 216, 48)}
        ${waves}
        ${slashes}
        ${mom}
        <g data-a="glits" opacity="0">${glits}</g>
        ${stamp}`;
    },
    extraDefs: `<linearGradient id="sTableShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a2a10" stop-opacity="0"/><stop offset=".35" stop-color="#7a2a10" stop-opacity=".22"/></linearGradient>`
  };
  function heartFlower() {
    return `<circle r="9" fill="#ffd34d"/><circle r="4" fill="#e5413a"/>`;
  }

  /* =======================================================
     2. החציל האציל — אולם מלכותי
     ======================================================= */
  const eggplantScene = {
    backdrop() {
      let stars = '';
      for (let i = 0; i < 40; i++) stars += sparkle(f(R(0, 1600)), f(R(120, 900)), f(R(4, 11)), i % 3 ? '#ffe7a3' : '#fff', 'twinkle', R(-3, 0));
      let swags = '';
      for (let i = 0; i < 6; i++) {
        const x = i * 280 - 40;
        swags += `<path d="M${x} 0 C ${x + 40} 150 ${x + 240} 150 ${x + 280} 0Z" fill="url(#eSwag)"/>
          <path d="M${x + 6} 14 C ${x + 46} 150 ${x + 234} 150 ${x + 274} 14" stroke="#f4c54f" stroke-width="7" fill="none" stroke-dasharray="3 7"/>
          <g transform="translate(${x + 280} 10)"><circle r="16" fill="url(#gGold)"/><path d="M-10 10 L-14 70 L14 70 L10 10Z" fill="url(#gGold)"/><path d="M-14 70 h28" stroke="#c48419" stroke-width="6"/></g>`;
      }
      return bg(`
        <rect width="1600" height="1000" fill="url(#eBg)"/>
        <rect width="1600" height="1000" fill="url(#ePat)" opacity=".5"/>
        <g opacity=".9">
          <rect x="60" y="80" width="90" height="920" fill="url(#ePillar)"/><rect x="40" y="70" width="130" height="34" rx="8" fill="url(#gGold)"/>
          <rect x="1450" y="80" width="90" height="920" fill="url(#ePillar)"/><rect x="1430" y="70" width="130" height="34" rx="8" fill="url(#gGold)"/></g>
        ${stars}
        ${swags}
        <rect data-a="hot" width="1600" height="1000" fill="url(#eHot)" opacity="0"/>
      `, `${rg('eBg', [[0, '#8a45b8'], [.55, '#4c1a6e'], [1, '#22082f']], .45, .45, .75)}
          ${lg('eSwag', [[0, '#6a2496'], [1, '#3a0f5e']])}
          ${lg('ePillar', [[0, '#5a2280'], [.5, '#8a4ab8'], [1, '#4a1a6a']], 1, 0)}
          ${rg('eHot', [[0, '#ff8a3c', .85], [1, '#ff5a1f', 0]], .45, 1, .9)}
          <pattern id="ePat" width="120" height="120" patternUnits="userSpaceOnUse"><g fill="#f4c54f" opacity=".16">
            <path d="M60 20 C 70 40 80 44 90 40 C 84 54 70 56 60 70 C 50 56 36 54 30 40 C 40 44 50 40 60 20Z"/><circle cx="60" cy="82" r="5"/>
            <path d="M0 80 C 6 92 14 94 20 92 C 16 100 8 102 0 110Z M120 80 C 114 92 106 94 100 92 C 104 100 112 102 120 110Z"/></g></pattern>`);
    },
    actors() {
      let rays = '';
      for (let i = 0; i < 18; i++) rays += `<path d="M0 0 L${f(Math.cos(i * Math.PI / 9 - .06) * 420)} ${f(Math.sin(i * Math.PI / 9 - .06) * 420)} L${f(Math.cos(i * Math.PI / 9 + .06) * 420)} ${f(Math.sin(i * Math.PI / 9 + .06) * 420)}Z" fill="url(#eRay)"/>`;
      let splash = '';
      for (let i = 0; i < 14; i++) {
        const ang = Math.PI + (i / 13) * Math.PI;
        splash += `<g data-a="sp${i}" data-dx="${f(Math.cos(ang) * R(120, 230))}" data-dy="${f(Math.sin(ang) * R(140, 260))}"><path d="M0 -10 q-8 12 0 18 q8 -6 0 -18z" fill="#ffae4a" stroke="#e5732a" stroke-width="2"/></g>`;
      }
      let steam = '';
      for (let i = 0; i < 6; i++) steam += `<path class="steam" style="--d:-${f(i * .6)}s;--t:3.4s" d="M${-110 + i * 44} -60 c-14 -20 14 -30 0 -50 c-14 -20 14 -30 0 -50" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" opacity=".8"/>`;
      const miniBowl = `<g transform="translate(0 4)"><path d="M-46 -6 A46 10 0 0 0 46 -6 C 44 22 24 34 0 34 C -24 34 -44 22 -46 -6Z" fill="#eef4fa" stroke="#5b9bd5" stroke-width="3"/>
          <circle cx="-22" cy="-12" r="10" fill="#e8402f"/><circle cx="0" cy="-16" r="10" fill="#6cbc52"/><circle cx="20" cy="-12" r="9" fill="#f58a1f"/><circle cx="-6" cy="-6" r="7" fill="#c6eb9b"/>
          <ellipse cx="34" cy="-22" rx="9" ry="16" transform="rotate(30 34 -22)" fill="#7330a6"/><circle cx="31" cy="-25" r="1.6" fill="#fff"/><circle cx="36" cy="-21" r="1.6" fill="#fff"/></g>`;
      return `
        <rect x="-1600" y="580" width="4000" height="1400" fill="#24082f"/>
        <path d="M290 590 L510 590 L760 900 L40 900Z" fill="#a8172b"/><path d="M300 590 L500 590 L740 900 L60 900Z" fill="none" stroke="#f4c54f" stroke-width="5" stroke-dasharray="2 10"/>
        <ellipse cx="400" cy="600" rx="310" ry="56" fill="#7a5410"/>
        <ellipse cx="400" cy="588" rx="310" ry="54" fill="url(#gGoldH)"/>
        <ellipse cx="400" cy="584" rx="292" ry="46" fill="#5b2088"/>
        <path class="glow" d="M360 -700 L440 -700 L660 588 L140 588Z" fill="url(#gBeam)" opacity=".5"/>
        <ellipse cx="400" cy="584" rx="220" ry="34" fill="url(#gGlow)" opacity=".75"/>
        <defs><radialGradient id="eRay" cx="0" cy="0" r="420" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffe27a" stop-opacity=".9"/><stop offset="1" stop-color="#ffe27a" stop-opacity="0"/></radialGradient></defs>
        <g data-a="rays" opacity="0" transform="translate(400 330)"><g class="spin" style="--t:40s">${rays}</g></g>
        <g transform="translate(400 640)"><g data-a="potBack" opacity="0"><ellipse cx="0" cy="-44" rx="168" ry="26" fill="#5e100c"/><ellipse cx="0" cy="-40" rx="160" ry="20" fill="#ff9d3c"/>
          <circle cx="-60" cy="-42" r="7" fill="#ffc27a"/><circle cx="40" cy="-38" r="5" fill="#ffc27a"/></g></g>
        <g transform="translate(400 430)"><g data-a="eggAll">
          <g data-a="cape" opacity="0"><path d="M-62 -96 C -110 0 -128 100 -140 150 Q0 186 140 150 C 128 100 110 0 62 -96Z" fill="url(#gVelvet)"/>
            <path d="M-120 150 Q0 186 120 150" stroke="#f4c54f" stroke-width="6" fill="none"/>
            <path d="M-74 -100 Q0 -70 74 -100 Q70 -84 0 -58 Q-70 -84 -74 -100Z" fill="#fffaf2"/>
            <g fill="#2b1a12"><path d="M-40 -84 l3 7 3 -7z"/><path d="M0 -70 l3 7 3 -7z"/><path d="M38 -84 l3 7 3 -7z"/></g></g>
          <g data-a="eggBody">${eggplant('egg')}</g>
          <g transform="translate(0 -128)"><g data-a="crownDrop" opacity="0">${crown('crown')}</g></g>
          <g data-a="cane" opacity="0"><path d="M98 48 L120 148" stroke="#2b1a12" stroke-width="7" stroke-linecap="round"/><circle cx="97" cy="44" r="9" fill="url(#gGold)"/></g>
          <g data-a="sweat" opacity="0"><path d="M70 -90 q-9 14 0 21 q9 -7 0 -21z" fill="#8fd8ff"/><path d="M-80 -60 q-8 13 0 19 q8 -6 0 -19z" fill="#8fd8ff"/></g>
        </g></g>
        <g transform="translate(400 640)"><g data-a="potFront" opacity="0">
          <path d="M-178 -42 C -176 40 -150 118 -90 124 H90 C 150 118 176 40 178 -42 A178 26 0 0 1 -178 -42Z" fill="url(#gPot)"/>
          <path d="M-178 -42 A178 26 0 0 0 178 -42" stroke="#ff7a6a" stroke-width="10" fill="none"/>
          <rect x="-214" y="-30" width="44" height="20" rx="10" fill="#7d120d"/><rect x="170" y="-30" width="44" height="20" rx="10" fill="#7d120d"/>
          <path d="M-140 -10 C -136 50 -118 92 -86 104" stroke="#fff" stroke-width="10" fill="none" opacity=".35" stroke-linecap="round"/>
          ${[-90, 0, 90].map((x) => `<circle cx="${x}" cy="40" r="14" fill="#fffaf0" opacity=".9"/><circle cx="${x}" cy="40" r="7" fill="#ffd34d"/>`).join('')}
          <g data-a="steam">${steam}</g>
        </g></g>
        <g data-a="splash" opacity="0" transform="translate(400 600)">${splash}</g>
        <g transform="translate(140 650) scale(.55)"><g data-a="ch1">${carrot('chc')}</g></g>
        <g transform="translate(258 676) scale(.62)"><g data-a="ch2">${tomato('cht')}</g></g>
        <g transform="translate(670 640) scale(.6)"><g data-a="ch3">${cucumber('chq')}</g></g>
        <g transform="translate(560 690) scale(.5)"><g data-a="ch4">${cabbage('chb')}</g></g>
        ${bubble('whisper', 236, 456, 170, 110, miniBowl, { tail: 'left' })}
        <g data-a="shh" opacity="0">
          <text class="fx" x="400" y="150" text-anchor="middle" font-size="96" fill="#fffaf0" stroke="#7b3aa6" stroke-width="5" paint-order="stroke" letter-spacing="4">שְׁשְׁשְׁשְׁ</text>
          <g fill="#fff" opacity=".8">${sparkle(170, 90, 14)}${sparkle(640, 110, 12)}</g></g>
        <g data-a="glits" opacity="0">${Array.from({ length: 14 }, (_, i) => sparkle(f(R(180, 620)), f(R(160, 520)), f(R(8, 18)), i % 2 ? '#ffe27a' : '#fff', 'twinkle', R(-2, 0))).join('')}</g>`;
    }
  };

  /* =======================================================
     3. השלדג — נחל בבוקר
     ======================================================= */
  const kingfisherScene = {
    backdrop() {
      let rays = '';
      for (let i = 0; i < 16; i++) rays += `<path d="M0 0 L${f(Math.cos(i * Math.PI / 8 - .05) * 600)} ${f(Math.sin(i * Math.PI / 8 - .05) * 600)} L${f(Math.cos(i * Math.PI / 8 + .05) * 600)} ${f(Math.sin(i * Math.PI / 8 + .05) * 600)}Z" fill="#fff6c8" opacity=".35"/>`;
      let trees = '';
      for (let i = 0; i < 18; i++) {
        const x = R(0, 1600), y = R(560, 600), s = R(.6, 1.1);
        trees += `<g transform="translate(${f(x)} ${f(y)}) scale(${f(s)})"><rect x="-4" y="0" width="8" height="26" fill="#6a8f4a"/><circle cx="0" cy="-8" r="22" fill="${rnd() > .5 ? '#79b765' : '#6aa95a'}"/></g>`;
      }
      let birds = '';
      for (let i = 0; i < 5; i++) birds += `<g class="drift-x" style="--t:${f(R(30, 50))}s;--a:${f(R(80, 200))}px;--d:-${f(R(0, 20))}s"><path d="M${f(R(200, 1400))} ${f(R(140, 360))} q10 -10 20 0 q10 -10 20 0" stroke="#4a6a8a" stroke-width="3.5" fill="none" stroke-linecap="round" opacity=".6"/></g>`;
      return bg(`
        <rect width="1600" height="1000" fill="url(#kSky)"/>
        <g transform="translate(1280 190)"><g class="spin" style="--t:90s">${rays}</g><circle r="210" fill="url(#gGlow)"/><circle r="80" fill="#fff2a8"/><circle r="66" fill="#ffe680"/></g>
        <g class="drift-x" style="--t:44s;--a:90px">${cloud(300, 180, 1.4)}</g>
        <g class="drift-x" style="--t:56s;--a:-120px">${cloud(820, 110, 1.1, '#fff', .9)}</g>
        <g class="drift-x" style="--t:38s;--a:70px">${cloud(1080, 330, .9, '#fff', .85)}</g>
        <g class="drift-x" style="--t:62s;--a:-90px">${cloud(140, 380, .8, '#fff', .8)}</g>
        ${birds}
        <path d="M0 600 C 200 470 420 520 620 560 C 820 470 1100 480 1300 550 C 1420 500 1520 510 1600 540 V1000 H0Z" fill="#b6dfa8"/>
        ${trees}
        <path d="M0 650 C 260 590 560 640 820 620 C 1060 600 1320 640 1600 610 V1000 H0Z" fill="#8fcf7c"/>
      `, `${lg('kSky', [[0, '#7fcdf3'], [.55, '#c6ecfb'], [1, '#fff3d0']])}`);
    },
    actors() {
      let reeds = '';
      const reed = (x, y, h, d) => `<g class="sway" style="--d:${d}s"><path d="M${x} ${y} C ${x - 4} ${y - h * .5} ${x + 4} ${y - h * .8} ${x} ${y - h}" stroke="#4f9a3a" stroke-width="5" fill="none" stroke-linecap="round"/>
          <rect x="${x - 7}" y="${y - h + 6}" width="14" height="${f(h * .22)}" rx="7" fill="#8a5a2e"/>
          <path d="M${x} ${y} C ${x - 20} ${y - h * .4} ${x - 30} ${y - h * .5} ${x - 40} ${y - h * .55}" stroke="#5fb446" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
      [[40, 720, 300, -1], [80, 720, 250, -2], [130, 720, 330, -3], [170, 720, 220, -1.5], [740, 720, 260, -2.5], [780, 720, 210, -.5]].forEach(([x, y, h, d]) => reeds += reed(x, y, h, d));
      let pebbles = '';
      for (let i = 0; i < 40; i++) pebbles += `<ellipse cx="${f(R(-200, 1000))}" cy="${f(R(650, 690))}" rx="${f(R(10, 26))}" ry="${f(R(6, 12))}" fill="${['#c9b28a', '#9f8a6a', '#b8c4cf', '#8fa5b3'][i % 4]}" opacity=".9"/>`;
      let weeds = '';
      [[110, 120], [250, 90], [470, 110], [610, 130], [720, 80]].forEach(([x, h], i) => weeds += `<g class="sway" style="--d:-${i * .7}s"><path d="M${x} 690 C ${x - 20} ${690 - h * .4} ${x + 20} ${690 - h * .7} ${x} ${690 - h}" stroke="#3f8f5a" stroke-width="8" fill="none" stroke-linecap="round"/></g>`);
      let leaves = '';
      for (let i = 0; i < 9; i++) {
        const t = i / 8, x = 1060 - t * 500, y = 162 + t * 86;
        leaves += `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(R(-40, 40))})"><g class="sway" style="--d:-${f(R(0, 3))}s"><path d="M0 0 C -12 -18 -8 -36 0 -44 C 8 -36 12 -18 0 0Z" fill="${i % 2 ? '#5fb446' : '#4c9f39'}"/></g></g>`;
      }
      let surface = '';
      for (let r = 0; r < 3; r++) {
        let d = `M-1600 ${428 + r * 26}`;
        for (let x = -1600; x < 2400; x += 80) d += ` q20 -${6 - r} 40 0 t40 0`;
        surface += `<g class="wave-x" style="--t:${6 + r * 3}s;--a:${r % 2 ? 80 : -80}px"><path d="${d}" stroke="#fff" stroke-width="${3 - r * .6}" fill="none" opacity="${.65 - r * .15}"/></g>`;
      }
      let drops = '';
      for (let i = 0; i < 12; i++) {
        const ang = -Math.PI * (i / 11);
        drops += `<g data-a="dr${i}" data-dx="${f(Math.cos(ang) * R(60, 140))}" data-dy="${f(Math.sin(ang) * R(70, 170) - 20)}"><circle r="${f(R(4, 8))}" fill="#e6f8ff" stroke="#7fd3f0" stroke-width="2"/></g>`;
      }
      return `
        <path d="M-1600 404 C -1200 384 -800 410 -400 392 C -100 380 200 406 400 394 C 600 382 900 400 1200 390 C 1600 380 2000 404 2400 392 V440 H-1600Z" fill="#6cbf55"/>
        ${[[-60, 384], [40, 380], [300, 376], [520, 380], [880, 378]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${f(R(26, 40))}" fill="#5aa84a"/>`).join('')}
        <rect x="-1600" y="414" width="4000" height="1400" fill="url(#gWater)"/>
        <g opacity=".12" fill="#fff">${[100, 300, 520, 700].map((x) => `<path d="M${x} 420 L${x + 60} 420 L${x + 10} 700 L${x - 50} 700Z"/>`).join('')}</g>
        ${surface}
        ${pebbles}${weeds}
        <g transform="translate(330 560)"><g class="swim" style="--a:-150px;--t:10s"><g data-a="fishA">${fishShape('#gFish2', 1)}</g></g></g>
        <g transform="translate(600 610)"><g class="swim" style="--a:-170px;--t:12s;--d:-4s">${fishShape('#gFish', 1.1)}</g></g>
        <g transform="translate(200 520)"><g class="swim" style="--a:-90px;--t:8s;--d:-2s">${fishShape('#gFish', .7)}</g></g>
        <g data-a="rings" opacity="0" transform="translate(372 420)">${[0, 1, 2].map((d) => `<ellipse class="ripple" style="--d:-${d}s;--t:3s" rx="90" ry="14" fill="none" stroke="#fff" stroke-width="4"/>`).join('')}</g>
        <path d="M1160 140 C 940 160 720 214 520 244 C 512 246 510 256 520 256 C 720 238 940 196 1160 182Z" fill="url(#gBark)"/>
        <path d="M800 202 C 780 170 760 150 730 140" stroke="#7a4a2a" stroke-width="9" fill="none" stroke-linecap="round"/>
        ${leaves}
        <g data-a="trail" opacity="0"><ellipse cx="400" cy="226" rx="230" ry="70" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="6 14" stroke-linecap="round"/></g>
        <g data-a="label" opacity="0" transform="translate(400 70)"><g data-a="label-in">
          <path d="M-150 -34 H150 L130 0 L150 34 H-150 L-130 0Z" fill="#1f7fb6"/><path d="M-120 -26 H120 V26 H-120Z" fill="#26a0dc"/>
          <text class="fx-serif" x="0" y="16" text-anchor="middle" font-size="44" fill="#fff">שַׁלְדָּג</text></g></g>
        <g data-a="kfPos"><g data-a="kfTilt"><g transform="scale(1.1)">${kingfisher('kf')}</g></g></g>
        <g data-a="splash" opacity="0" transform="translate(372 418)">
          <path d="M-60 0 C -50 -40 -34 -70 -20 -60 C -14 -80 14 -80 20 -60 C 34 -70 50 -40 60 0Z" fill="#e6f8ff" stroke="#7fd3f0" stroke-width="3"/>
          ${drops}</g>
        <g data-a="bubbles" opacity="0">${Array.from({ length: 8 }, (_, i) => `<circle class="rise" style="--t:${f(R(2, 3.5))}s;--d:-${f(R(0, 3))}s;--h:-${f(R(80, 160))}px;--o:.9" cx="${f(R(340, 410))}" cy="${f(R(560, 640))}" r="${f(R(4, 9))}" fill="none" stroke="#fff" stroke-width="2.5"/>`).join('')}</g>
        <path d="M-1600 646 C -1000 620 -400 650 0 634 C 300 622 560 652 800 636 C 1200 620 1800 650 2400 636 V1400 H-1600Z" fill="url(#kBank)"/>
        ${grassTufts(-200, 1000, 646, 40, '#4f9a3a')}
        ${[60, 210, 330, 480, 560, 700].map((x, i) => flower(x, 676 + (i % 2) * 12, 1.2, i % 2 ? '#fff' : '#ffd1e0')).join('')}
        <g transform="translate(250 190)"><g class="hover-y"><g class="drift-x" style="--t:7s;--a:30px">
          <g opacity=".75"><g class="flap" style="--o:100% 50%;--a1:-20deg;--a2:20deg"><ellipse cx="-14" cy="-10" rx="18" ry="7" fill="#dff6ff"/></g>
          <g class="flap" style="--o:0% 50%;--a1:20deg;--a2:-20deg"><ellipse cx="14" cy="-10" rx="18" ry="7" fill="#dff6ff"/></g></g>
          <rect x="-3" y="-14" width="6" height="40" rx="3" fill="#2d8ce0"/><circle cx="0" cy="-16" r="6" fill="#1f6fb6"/></g></g></g>
        <g transform="translate(624 518) scale(1.1)"><g data-a="kid">${child('kid')}</g></g>
        <g data-a="bulb" opacity="0" transform="translate(624 370)"><g data-a="bulb-in">
          ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<path d="M${f(Math.cos(i * Math.PI / 4) * 40)} ${f(Math.sin(i * Math.PI / 4) * 40)} L${f(Math.cos(i * Math.PI / 4) * 56)} ${f(Math.sin(i * Math.PI / 4) * 56)}" stroke="#ffcf3f" stroke-width="5" stroke-linecap="round"/>`).join('')}
          <circle r="28" fill="#fff27a" stroke="#e5a91a" stroke-width="3"/><rect x="-12" y="24" width="24" height="16" rx="4" fill="#9aa6b2"/></g></g>
        ${reeds}`;
    },
    extraDefs: `<linearGradient id="kBank" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fcd62"/><stop offset="1" stop-color="#3f8f35"/></linearGradient>`
  };

  /* =======================================================
     4. ציפור אצילה — עץ בשקיעה
     ======================================================= */
  const noblebird = {
    backdrop() {
      let birds = '';
      for (let i = 0; i < 6; i++) birds += `<g class="drift-x" style="--t:${f(R(30, 60))}s;--a:${f(R(60, 160))}px;--d:-${f(R(0, 30))}s"><path d="M${f(R(150, 1450))} ${f(R(120, 380))} q9 -9 18 0 q9 -9 18 0" stroke="#7a4a6a" stroke-width="3.2" fill="none" stroke-linecap="round" opacity=".55"/></g>`;
      return bg(`
        <rect width="1600" height="1000" fill="url(#nSky)"/>
        <g transform="translate(330 640)"><circle r="300" fill="url(#gGlow)" class="glow"/><circle r="120" fill="#fff0c4"/><circle r="104" fill="#ffe2a0"/></g>
        <g class="drift-x" style="--t:50s;--a:110px">${cloud(520, 220, 1.5, '#ffd3d9', .9)}</g>
        <g class="drift-x" style="--t:64s;--a:-100px">${cloud(1180, 150, 1.2, '#ffe0d0', .9)}</g>
        <g class="drift-x" style="--t:42s;--a:80px">${cloud(1000, 380, .9, '#ffc9d6', .8)}</g>
        ${birds}
        <path d="M0 640 C 240 560 480 600 700 640 C 940 560 1240 560 1600 620 V1000 H0Z" fill="#c9a2c9"/>
        <path d="M0 700 C 300 640 620 690 900 670 C 1140 650 1380 680 1600 660 V1000 H0Z" fill="#a7b77e"/>
      `, `${lg('nSky', [[0, '#9f8fd6'], [.35, '#f3a6b8'], [.7, '#ffc9a0'], [1, '#ffe8bf']])}`);
    },
    actors() {
      const N = nest();
      let foliage = '';
      [[300, 150, 80, '#4f9a3a'], [400, 70, 110, '#5aa845'], [540, 60, 110, '#4f9a3a'], [650, 140, 86, '#5aa845'], [470, 160, 100, '#62b44c'], [360, 210, 60, '#4c9439'], [600, 220, 66, '#4c9439']].forEach(([x, y, r, c]) => {
        foliage += `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
      });
      [[380, 40, 50], [520, 30, 46], [640, 110, 40], [300, 130, 36], [450, 130, 44]].forEach(([x, y, r]) => foliage += `<circle cx="${x}" cy="${y}" r="${r}" fill="#7fcc5c" opacity=".7"/>`);
      let fl = '';
      for (let i = 0; i < 16; i++) fl += flower(f(R(-200, 1000)), f(R(640, 700)), f(R(.9, 1.4)), ['#fff', '#ffd1e0', '#ffe27a'][i % 3]);
      let leavesFall = '';
      for (let i = 0; i < 8; i++) leavesFall += `<g data-a="lf${i}" data-x="${f(R(380, 640))}" data-y="${f(R(150, 260))}" opacity="0"><path d="M0 0 C -9 -12 -6 -26 0 -32 C 6 -26 9 -12 0 0Z" fill="${i % 2 ? '#5fb446' : '#8fd86a'}"/></g>`;
      let hearts = '';
      for (let i = 0; i < 7; i++) hearts += `<g class="rise" style="--t:${f(R(3, 5))}s;--d:-${f(R(0, 5))}s;--h:-${f(R(120, 220))}px;--o:1">${heart(f(R(230, 420)), f(R(140, 200)), f(R(.9, 1.6)), i % 2 ? '#ff5d7a' : '#ff8fa6')}</g>`;
      let notes = '';
      for (let i = 0; i < 5; i++) notes += `<g class="rise" style="--t:${f(R(2.6, 4))}s;--d:-${f(R(0, 4))}s;--h:-${f(R(100, 160))}px;--o:1">${note(f(R(230, 330)), f(R(150, 180)), f(R(1, 1.5)), ['#7a3aa6', '#c8452c', '#1f7fb6'][i % 3])}</g>`;
      const plate = `<g transform="translate(0 4)"><ellipse rx="44" ry="20" fill="#fffaf0" stroke="#bcc6d0" stroke-width="3"/><ellipse rx="30" ry="12" fill="none" stroke="#dbe3ea" stroke-width="2"/>
          <path d="M-60 -18 v34 M-64 -18 v10 M-56 -18 v10" stroke="#9aa6b2" stroke-width="3" stroke-linecap="round"/><path d="M60 -18 c6 6 6 18 0 22 v12" stroke="#9aa6b2" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M-12 -8 l24 14 M12 -8 l-24 14" stroke="#e5484d" stroke-width="3" stroke-linecap="round" opacity=".7"/></g>`;
      let rain = '';
      for (let i = 0; i < 6; i++) rain += `<path class="drip" style="--d:${f(i * .2)}s" d="M${-40 + i * 16} 20 q-3 6 0 9 q3 -3 0 -9z" fill="#7fb6e0"/>`;
      return `
        <path d="M-1600 620 C -800 590 -200 640 200 612 C 500 592 800 628 1200 606 C 1700 590 2200 620 2400 610 V1400 H-1600Z" fill="url(#nGround)"/>
        ${grassTufts(-300, 1100, 622, 50, '#4f9a3a')}${fl}
        <g data-a="theater" opacity="0">
          <g data-a="curL"><path d="M-900 -400 H330 C 290 -60 170 250 -900 380Z" fill="url(#gVelvet)"/><path d="M330 -400 C 290 -60 170 250 -900 380" stroke="#f4c54f" stroke-width="8" fill="none" stroke-dasharray="4 8"/></g>
          <g data-a="curR"><path d="M1700 -400 H470 C 510 -60 630 250 1700 380Z" fill="url(#gVelvet)"/><path d="M470 -400 C 510 -60 630 250 1700 380" stroke="#f4c54f" stroke-width="8" fill="none" stroke-dasharray="4 8"/></g>
        </g>
        <path d="M392 724 C 420 700 426 670 428 630 C 434 480 438 340 440 170 L 504 170 C 506 340 510 480 516 630 C 518 670 524 700 552 724Z" fill="url(#gBark)"/>
        <g stroke="#5e351a" stroke-width="3" fill="none" opacity=".55"><path d="M452 600 q6 -30 0 -60 M490 520 q-6 -30 0 -60 M460 420 q6 -24 0 -50 M488 330 q-5 -24 0 -50"/></g>
        <path d="M446 250 C 380 236 300 222 168 200 C 160 199 158 212 166 214 C 300 236 380 254 446 274Z" fill="url(#gBark)"/>
        <path d="M300 226 C 290 200 280 186 262 176" stroke="#7a4a2a" stroke-width="7" fill="none" stroke-linecap="round"/>
        <g data-a="nestGlow" opacity="0"><circle cx="276" cy="180" r="150" fill="url(#gGlow)"/></g>
        <g data-a="beams" opacity="0"><path class="glow" d="M120 -400 L200 -400 L420 210 L330 220Z" fill="url(#gBeam)"/><path class="glow" style="--d:-1.5s" d="M680 -400 L760 -400 L470 220 L380 210Z" fill="url(#gBeam)"/></g>
        <g transform="translate(276 206)">${N.back}</g>
        <g transform="translate(266 178)"><g data-a="chickW"><g class="bob-s">${chick('chick')}</g></g></g>
        <g transform="translate(276 206)">${N.front}</g>
        <g data-a="notes" opacity="0">${notes}</g>
        <g class="sway-t" style="--t:8s">${foliage}</g>
        <g transform="translate(472 640)"><g data-a="catPos"><g data-a="catSpin">${cat('cat')}</g></g></g>
        ${burst('pow', 470, 330, 72, '#fff27a', 'טוּק!', { fs: 38 })}
        <g data-a="angry" opacity="0" stroke="#c8452c" stroke-width="5" fill="none" stroke-linecap="round"><path d="M300 70 l14 -14 l8 14 l14 -14 M320 110 l20 -6 l0 14 l20 -6"/></g>
        <g data-a="momPos"><g data-a="momTilt">${momBird('mom')}</g></g>
        ${dizzyStars('dizzy', 0, 0, 52)}
        ${bubble('meow', 650, 400, 190, 92, `<text class="fx" x="0" y="16" text-anchor="middle" font-size="42" fill="#c8452c">מְיָאוּ!</text>`, { tail: 'left' })}
        <g data-a="rain" opacity="0" transform="translate(620 330)">${cloud(0, 0, .8, '#8f9bab')}${rain}</g>
        ${thought('thinkPlate', 190, 330, 100, 54, plate, [80, 60])}
        <g data-a="hearts" opacity="0">${hearts}</g>
        <g data-a="leaves">${leavesFall}</g>`;
    },
    extraDefs: `<linearGradient id="nGround" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ccf68"/><stop offset="1" stop-color="#4c9439"/></linearGradient>`
  };

  /* =======================================================
     5. שן חלב — חלום תכלת וחלב
     ======================================================= */
  const toothScene = {
    backdrop() {
      let bubbles = '';
      for (let i = 0; i < 26; i++) bubbles += `<circle class="rise" style="--t:${f(R(10, 20))}s;--d:-${f(R(0, 20))}s;--h:-${f(R(500, 900))}px;--o:.75" cx="${f(R(0, 1600))}" cy="${f(R(800, 1000))}" r="${f(R(8, 34))}" fill="#fff" stroke="#cfe3f7" stroke-width="2"/>`;
      let sp = '';
      for (let i = 0; i < 30; i++) sp += sparkle(f(R(0, 1600)), f(R(40, 700)), f(R(5, 12)), i % 3 ? '#fff' : '#ffe9a6', 'twinkle', R(-3, 0));
      let milk = '';
      for (let r = 0; r < 2; r++) {
        let d = `M-400 ${860 + r * 40}`;
        for (let x = -400; x < 2400; x += 200) d += ` q50 -${30 - r * 8} 100 0 t100 0`;
        d += ' V1000 H-400Z';
        milk += `<g class="wave-x" style="--t:${9 + r * 5}s;--a:${r ? 200 : -200}px"><path d="${d}" fill="${r ? '#ffffff' : '#f1f7ff'}"/></g>`;
      }
      return bg(`
        <rect width="1600" height="1000" fill="url(#tSky)"/>
        <g class="drift-x" style="--t:50s;--a:80px">${cloud(260, 200, 1.3, '#fff', .9)}</g>
        <g class="drift-x" style="--t:60s;--a:-90px">${cloud(1300, 260, 1.1, '#fff', .85)}</g>
        <g class="drift-x" style="--t:40s;--a:60px">${cloud(800, 120, .8, '#fff', .8)}</g>
        <g transform="translate(1380 140)"><path d="M0 -60 A60 60 0 1 0 40 44 A48 48 0 1 1 0 -60Z" fill="#fff4c4"/></g>
        ${sp}${bubbles}${milk}
      `, `${lg('tSky', [[0, '#cfe6ff'], [.55, '#f3eaff'], [1, '#fff6ee']])}`);
    },
    actors() {
      // סצנה A — עריסה ותינוקת
      let bars = '';
      for (let x = 196; x <= 604; x += 34) bars += `<rect x="${x - 6}" y="320" width="12" height="210" rx="6" fill="url(#gWood)"/>`;
      let mobile = '';
      [[-80, 60, 'moon'], [0, 80, 'star'], [80, 60, 'star']].forEach(([x, y, k]) => {
        mobile += `<path d="M0 0 L${x} ${y - 24}" stroke="#c9b6e8" stroke-width="2"/>` + (k === 'moon' ? `<path transform="translate(${x} ${y})" d="M0 -20 A20 20 0 1 0 14 14 A16 16 0 1 1 0 -20Z" fill="#ffe27a"/>` : star(x, y, 18, '#ffb8c8'));
      });
      const baby = `
        <ellipse cx="400" cy="380" rx="70" ry="60" fill="#ffc2d4"/>
        <g data-a="babyHead">
          <circle cx="400" cy="262" r="70" fill="url(#gSkinR)"/>
          <circle cx="332" cy="264" r="14" fill="#ffcfa8"/><circle cx="468" cy="264" r="14" fill="#ffcfa8"/>
          <path d="M400 196 c-10 -20 14 -34 26 -18 c8 12 -6 22 -14 14" stroke="#8a5a2e" stroke-width="6" fill="none" stroke-linecap="round"/>
          <ellipse cx="364" cy="282" rx="12" ry="7" fill="#ff8fa6" opacity=".55"/><ellipse cx="436" cy="282" rx="12" ry="7" fill="#ff8fa6" opacity=".55"/>
          <g class="blink" style="--d:-2s"><ellipse cx="376" cy="256" rx="7" ry="9" fill="${INK}"/><ellipse cx="424" cy="256" rx="7" ry="9" fill="${INK}"/>
            <circle cx="378.5" cy="252" r="2.8" fill="#fff"/><circle cx="426.5" cy="252" r="2.8" fill="#fff"/></g>
          <path d="M378 290 Q400 318 422 290 Z" fill="#a8304a"/>
          <ellipse cx="400" cy="304" rx="9" ry="4" fill="#ff8fa6"/>
          <g data-a="babyTooth"><rect x="394" y="296" width="12" height="11" rx="3" fill="#fff" stroke="#d3dfeb" stroke-width="1.5" transform="rotate(180 400 301.5)"/></g>
          <g data-a="ting" opacity="0">${sparkle(426, 300, 18, '#fff7c2', '')}${sparkle(444, 284, 9, '#fff', '')}</g>
        </g>`;
      const photo = `<g data-a="photo" opacity="0" transform="translate(650 120)"><g data-a="photo-in">
          <path d="M0 -40 L-40 0 M0 -40 L40 0" stroke="#8a5a2e" stroke-width="2.5"/><circle cx="0" cy="-42" r="5" fill="#c48419"/>
          <g transform="rotate(5)"><rect x="-70" y="-2" width="140" height="170" rx="6" fill="#fff" filter="drop-shadow(0 8px 8px rgba(0,0,0,.18))"/>
            <rect x="-58" y="10" width="116" height="110" fill="#bfe3ff"/>
            <circle cx="0" cy="66" r="38" fill="url(#gSkinR)"/><path d="M-6 30 c-4 -14 14 -18 16 -6" stroke="#5a3418" stroke-width="5" fill="none" stroke-linecap="round"/>
            <circle cx="-13" cy="60" r="4.5" fill="${INK}"/><circle cx="13" cy="60" r="4.5" fill="${INK}"/>
            <path d="M-12 76 Q0 92 12 76Z" fill="#a8304a"/><rect x="-4" y="76" width="8" height="7" rx="2" fill="#fff"/>
            <ellipse cx="-22" cy="72" rx="6" ry="3.6" fill="#ff8fa6" opacity=".6"/><ellipse cx="22" cy="72" rx="6" ry="3.6" fill="#ff8fa6" opacity=".6"/>
            <text class="fx" x="0" y="154" text-anchor="middle" font-size="26" fill="#3f7fc4">אֲנִי</text></g></g></g>`;
      const sceneA = `<g data-a="sceneA">
          <g transform="translate(400 -60)"><g class="sway-t" style="--t:6s"><path d="M0 -400 V30" stroke="#c9b6e8" stroke-width="3"/><g transform="translate(0 30)"><rect x="-90" y="-6" width="180" height="10" rx="5" fill="#c9b6e8"/>${mobile}</g></g></g>
          <rect x="170" y="300" width="460" height="230" rx="18" fill="#f6e2c8"/>
          ${baby}
          ${bars}
          <rect x="160" y="300" width="480" height="26" rx="13" fill="url(#gWood)"/>
          <rect x="160" y="520" width="480" height="26" rx="13" fill="url(#gWood)"/>
          <rect x="150" y="280" width="30" height="300" rx="14" fill="url(#gWood)"/><rect x="620" y="280" width="30" height="300" rx="14" fill="url(#gWood)"/>
          <circle cx="165" cy="278" r="18" fill="#e0a96c"/><circle cx="635" cy="278" r="18" fill="#e0a96c"/>
          <ellipse cx="350" cy="306" rx="20" ry="15" fill="url(#gSkinR)"/><ellipse cx="450" cy="306" rx="20" ry="15" fill="url(#gSkinR)"/>
          ${photo}
        </g>`;
      // סצנה B — חניכיים ושיני חלב
      let teeth = '';
      [200, 280, 360, 440, 520, 600].forEach((x, i) => {
        teeth += `<g transform="translate(${x} 380)"><g data-a="tt${i}" class="tt"><path d="M-28 0 V-50 C -28 -76 28 -76 28 -50 V0Z" fill="url(#gTooth)" stroke="#bccbdb" stroke-width="3"/>
          <path d="M-16 -54 C -18 -40 -18 -24 -16 -14" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
          <circle cx="-8" cy="-36" r="3" fill="${INK}"/><circle cx="8" cy="-36" r="3" fill="${INK}"/><path d="M-5 -26 q5 5 10 0" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round"/></g></g>`;
      });
      const chute = `<g data-a="chute" opacity="0"><path d="M-70 -110 C -70 -170 70 -170 70 -110 C 50 -120 30 -100 0 -112 C -30 -100 -50 -120 -70 -110Z" fill="#ff8fa6"/>
          <path d="M-70 -110 C -40 -120 -20 -104 0 -112 C 20 -104 40 -120 70 -110" fill="#ffd1dc"/>
          <path d="M-70 -110 L-20 -60 M70 -110 L20 -60 M0 -112 V-60" stroke="#9aa6b2" stroke-width="2"/></g>`;
      const sceneB = `<g data-a="sceneB" opacity="0">
          <path d="M120 360 C 120 340 140 330 160 330 H640 C 660 330 680 340 680 360 V430 C 680 470 640 490 600 490 H200 C 160 490 120 470 120 430Z" fill="url(#gGum)"/>
          <path d="M150 350 H650" stroke="#ffd1dc" stroke-width="8" stroke-linecap="round" opacity=".8"/>
          ${teeth}
          <g transform="translate(280 380)"><g data-a="ttFall">${chute}</g></g>
        </g>`;
      // סצנה C — מדרגות ("שלב")
      let steps = '', icons = '';
      const stepIcons = [
        `<g><rect x="-12" y="-44" width="24" height="40" rx="8" fill="#fff" stroke="#9fc5ea" stroke-width="3"/><rect x="-7" y="-56" width="14" height="14" rx="5" fill="#ffb8c8"/><path d="M-12 -30 h24 M-12 -20 h24" stroke="#9fc5ea" stroke-width="2"/></g>`,
        `<g transform="scale(.5) translate(0 -80)"><path d="M-28 0 V-50 C -28 -76 28 -76 28 -50 V0Z" fill="#fff" stroke="#bccbdb" stroke-width="5"/></g>`,
        `<g transform="scale(.36) translate(0 -110)"><path d="M-42 -52 C -42 -74 -16 -76 0 -62 C 16 -76 42 -74 42 -52 C 46 -20 38 10 32 32 C 27 52 21 72 12 72 C 4 72 4 42 0 42 C -4 42 -4 72 -12 72 C -21 72 -27 52 -32 32 C -38 10 -46 -20 -42 -52Z" fill="#fff" stroke="#bccbdb" stroke-width="6"/></g>`,
        star(0, -30, 26, '#ffd34d')
      ];
      for (let i = 0; i < 4; i++) {
        const x = 540 - i * 120, y = 560 - i * 80;
        steps += `<g data-a="step${i}"><rect x="${x - 60}" y="${y}" width="${120}" height="${700 - y}" fill="${['#ffd1dc', '#cfe6ff', '#d9f2c8', '#fff1b8'][i]}" stroke="#fff" stroke-width="4"/>
          <rect x="${x - 60}" y="${y}" width="120" height="16" fill="#fff" opacity=".7"/>
          <text class="fx" x="${x}" y="${y + 70}" text-anchor="middle" font-size="40" fill="#3f7fc4" opacity=".55">${['א', 'ב', 'ג', 'ד'][i]}</text></g>`;
        icons += `<g transform="translate(${x + 34} ${y - 4})"><g data-a="ic${i}">${stepIcons[i]}</g></g>`;
      }
      const qm = `<g data-a="qmarks" opacity="0">${[[230, 160, -12], [320, 110, 8], [140, 120, 16]].map(([x, y, r], i) =>
        `<g class="hover-y" style="--d:-${i * .5}s"><text class="fx" x="${x}" y="${y}" font-size="${70 - i * 10}" fill="${['#3f7fc4', '#ff8fa6', '#7a3aa6'][i]}" transform="rotate(${r} ${x} ${y})">?</text></g>`).join('')}</g>`;
      const sceneC = `<g data-a="sceneC" opacity="0">${steps}${icons}
          <g transform="translate(540 508)"><g data-a="climber"><g transform="scale(.62) translate(0 -72)">${tooth('climb')}</g></g></g>
          ${qm}
          <g data-a="bang" opacity="0" transform="translate(240 210)"><g data-a="bang-in"><circle r="44" fill="#fff27a" stroke="#e5a91a" stroke-width="4"/><text class="fx" x="0" y="20" text-anchor="middle" font-size="60" fill="#c2410c">!</text></g></g>
        </g>`;
      // סצנה D — שן נושרת ושן חדשה צומחת
      let confetti = '';
      for (let i = 0; i < 26; i++) confetti += `<g data-a="cf${i}" data-x="${f(R(120, 680))}" data-r="${f(R(-200, 200))}"><rect x="-5" y="-9" width="10" height="18" rx="2" fill="${['#ff8fa6', '#ffd34d', '#7fd0ff', '#9be063', '#c497ea'][i % 5]}"/></g>`;
      const rainbow = ['#ff6b6b', '#ffb84d', '#ffe066', '#7ed957', '#5ab0ff', '#a084f0'].map((c, i) =>
        `<path data-a="rb${i}" d="M${120 + i * 22} 520 A${280 - i * 22} ${280 - i * 22} 0 0 1 ${680 - i * 22} 520" stroke="${c}" stroke-width="20" fill="none" stroke-linecap="round" opacity=".9"/>`).join('');
      const medal = `<g data-a="medal" opacity="0" transform="translate(432 448) scale(.8)"><g data-a="medal-in">
          <path d="M-14 -40 L-6 -10 L6 -10 L14 -40Z" fill="#3f7fc4"/><path d="M-8 -40 L0 -14 L8 -40" fill="#ff8fa6"/>
          <circle cx="0" cy="8" r="24" fill="url(#gGold)" stroke="#a8721a" stroke-width="3"/>${star(0, 8, 13, '#fff6c8')}</g></g>`;
      const sceneD = `<g data-a="sceneD" opacity="0">
          <g data-a="rainbow">${rainbow}</g>
          <path d="M110 560 C 110 540 130 530 150 530 H650 C 670 530 690 540 690 560 V610 C 690 650 650 670 610 670 H190 C 150 670 110 650 110 610Z" fill="url(#gGum)"/>
          <path d="M140 550 H660" stroke="#ffd1dc" stroke-width="8" stroke-linecap="round" opacity=".8"/>
          <g transform="translate(400 540)"><g data-a="bigTooth"><g transform="translate(0 -72)">${tooth('big', { mouth: 'grin', s: 1.1 })}
            <g data-a="shineWrap" clip-path="url(#tClip)"><rect class="shine" x="-60" y="-80" width="30" height="170" fill="#fff" opacity=".7" transform="rotate(20)"/></g></g></g></g>
          <g transform="translate(400 540)"><g data-a="milkTooth"><g transform="scale(.6) translate(0 -72)">${tooth('milk')}</g>
            <g transform="translate(0 -40)">${chute.replace('data-a="chute"', 'data-a="chute2"')}</g></g></g>
          <g data-a="wave" opacity="0" transform="translate(470 420)"><text class="fx" x="0" y="0" font-size="40" fill="#3f7fc4">בַּיי!</text></g>
          ${medal}
          <g data-a="glits" opacity="0">${Array.from({ length: 12 }, (_, i) => sparkle(f(R(200, 600)), f(R(160, 520)), f(R(8, 18)), i % 2 ? '#ffe27a' : '#fff', 'twinkle', R(-2, 0))).join('')}</g>
          <g data-a="confetti">${confetti}</g>
        </g>`;
      return sceneA + sceneB + sceneC + sceneD;
    },
    extraDefs: `<clipPath id="tClip"><path d="M-42 -52 C -42 -74 -16 -76 0 -62 C 16 -76 42 -74 42 -52 C 46 -20 38 10 32 32 C 27 52 21 72 12 72 C 4 72 4 42 0 42 C -4 42 -4 72 -12 72 C -21 72 -27 52 -32 32 C -38 10 -46 -20 -42 -52Z"/></clipPath>`
  };

  /* =======================================================
     6. הארנב — מופע קסמים
     ======================================================= */
  const rabbitScene = {
    backdrop() {
      let st = '';
      for (let i = 0; i < 46; i++) st += star(f(R(0, 1600)), f(R(80, 820)), f(R(5, 13)), i % 4 ? '#f4c54f' : '#fff3c4', 'twinkle', `--t:${f(R(1.8, 3.6))}s;--d:-${f(R(0, 3))}s`);
      let bulbs = '';
      for (let i = 0; i <= 22; i++) {
        const t = i / 22, x = 80 + t * 1440, y = 90 + Math.pow((t - .5) * 2, 2) * 90 - 90;
        bulbs += `<circle cx="${f(x)}" cy="${f(y + 120)}" r="22" fill="url(#gGlow)"/><circle class="twinkle" style="--t:1.6s;--d:-${f((i % 4) * .4)}s" cx="${f(x)}" cy="${f(y + 120)}" r="9" fill="#fff3b0"/>`;
      }
      return bg(`
        <rect width="1600" height="1000" fill="url(#rBg)"/>
        <rect width="1600" height="1000" fill="url(#rCloth)" opacity=".6"/>
        ${st}
        <path d="M60 140 Q800 -40 1540 140" stroke="#c48419" stroke-width="6" fill="none"/>
        ${bulbs}
        <g class="glow"><path d="M200 -40 L300 -40 L760 1000 L420 1000Z" fill="#fff4cc" opacity=".08"/></g>
        <g class="glow" style="--d:-1.5s"><path d="M1300 -40 L1400 -40 L1180 1000 L840 1000Z" fill="#fff4cc" opacity=".08"/></g>
      `, `${rg('rBg', [[0, '#4a1d6a'], [.6, '#2a1042'], [1, '#12061e']], .5, .45, .8)}
          <pattern id="rCloth" width="140" height="1000" patternUnits="userSpaceOnUse"><rect width="140" height="1000" fill="#000" opacity="0"/>
            <rect width="70" height="1000" fill="#000" opacity=".12"/></pattern>`);
    },
    actors() {
      let lights = '';
      for (let x = -400; x <= 1200; x += 80) lights += `<g class="glow" style="--d:-${f(R(0, 3))}s"><ellipse cx="${x}" cy="690" rx="44" ry="22" fill="url(#gGlow)"/></g><path d="M${x - 16} 696 a16 12 0 0 1 32 0z" fill="#fff3b0"/>`;
      let confetti = '';
      for (let i = 0; i < 36; i++) confetti += `<g data-a="cf${i}" data-x="${f(R(60, 740))}" data-r="${f(R(-260, 260))}"><rect x="-6" y="-10" width="12" height="20" rx="2" fill="${['#ff5a6c', '#ffd34d', '#7fd0ff', '#9be063', '#c497ea', '#fff'][i % 6]}"/></g>`;
      let poof = '';
      [[0, 0, 46], [-40, 10, 34], [40, 10, 34], [-20, -30, 32], [24, -32, 30], [0, 34, 30]].forEach(([x, y, r]) => poof += `<circle cx="${x}" cy="${y}" r="${r}" fill="#f4f0f8"/>`);
      poof += star(-60, -40, 14, '#ffd34d') + star(64, -30, 12, '#ffd34d') + star(10, -70, 10, '#fff3b0') + star(-50, 50, 10, '#fff3b0');
      const hatCarrot = `<g transform="translate(580 470)"><g data-a="hatCarrot" opacity="0"><g transform="rotate(8) scale(.62)">${carrot('hc', { noFace: true })}</g></g></g>`;
      const hat = `<g data-a="hat" opacity="0" transform="translate(580 470)"><g data-a="hat-in">
          <ellipse cx="0" cy="0" rx="88" ry="20" fill="#17141f"/><ellipse cx="0" cy="0" rx="64" ry="13" fill="#05040a"/></g></g>
        ${hatCarrot}
        <g data-a="hatFront" opacity="0" transform="translate(580 470)"><g data-a="hatFront-in">
          <path d="M-64 0 C -62 30 -60 60 -58 82 Q0 96 58 82 C 60 60 62 30 64 0 A64 13 0 0 1 -64 0Z" fill="url(#gHat)"/>
          <path d="M-62 14 Q0 30 62 14 L62 30 Q0 46 -62 30Z" fill="#c41c35"/>
          <path d="M-88 0 A88 20 0 0 0 88 0" stroke="#2a2533" stroke-width="10" fill="none"/>
          <path d="M-40 40 C -38 56 -36 66 -34 76" stroke="#fff" stroke-width="5" opacity=".25" stroke-linecap="round"/></g></g>`;
      const carrotHeld = `<g data-a="held" opacity="0" transform="translate(-8 18)">
          <g mask="url(#rBite)"><g transform="rotate(180) scale(.48) translate(0 -150)">${carrot('held', { noFace: true })}</g></g></g>`;
      const crumbs = `<g data-a="crumbs" opacity="0">${Array.from({ length: 10 }, (_, i) => `<g class="rise" style="--t:${f(R(.8, 1.4))}s;--d:-${f(R(0, 1.4))}s;--h:${f(R(60, 110))}px;--o:1"><circle cx="${f(R(-40, 40))}" cy="${f(R(0, 20))}" r="${f(R(2.5, 5))}" fill="#f58a1f"/></g>`).join('')}</g>`;
      const amm = ['אממ', 'אָאמ', 'אממ'].map((t, i) => `<g data-a="amm${i}" opacity="0" transform="translate(${[-112, 128, -104][i]} ${[-128, -150, -58][i]}) rotate(${[-10, 8, -4][i]})"><g data-a="amm${i}-in">
          <text class="fx" x="0" y="0" text-anchor="middle" font-size="48" fill="#ffe27a" stroke="#7b1f2a" stroke-width="6" paint-order="stroke">${t}</text></g></g>`).join('');
      return `
        <rect x="-1600" y="540" width="4000" height="1400" fill="url(#pPlanks)"/>
        <rect x="-1600" y="540" width="4000" height="1400" fill="url(#rFloorShade)"/>
        <rect x="-1600" y="534" width="4000" height="10" fill="#f4c54f" opacity=".7"/>
        <path class="glow" d="M300 -700 L380 -700 L520 560 L140 560Z" fill="url(#gBeam)" opacity=".45"/>
        <ellipse cx="330" cy="556" rx="190" ry="30" fill="url(#gGlow)" opacity=".8"/>
        ${hat}
        <g data-a="world">
        <g transform="translate(330 384)"><g data-a="rabPos">
          <g data-a="rabBounce">
            ${rabbit('rab')}
            <g data-a="armDown"><path d="M-50 36 C -70 54 -78 74 -74 92" stroke="#e8e2ee" stroke-width="22" stroke-linecap="round" fill="none"/><circle cx="-74" cy="96" r="14" fill="#fff"/></g>
            <g data-a="armHold" opacity="0"><path d="M-50 36 C -48 20 -30 18 -18 26" stroke="#e8e2ee" stroke-width="22" stroke-linecap="round" fill="none"/>${carrotHeld}<circle cx="-14" cy="28" r="14" fill="#fff"/></g>
            <g data-a="armWand"><path d="M50 36 C 70 54 78 74 74 92" stroke="#e8e2ee" stroke-width="22" stroke-linecap="round" fill="none"/><circle cx="74" cy="96" r="14" fill="#fff"/>
              <g data-a="wand" opacity="0"><path d="M78 92 L150 40" stroke="#17141f" stroke-width="9" stroke-linecap="round"/><path d="M138 49 L150 40" stroke="#fff" stroke-width="9" stroke-linecap="round"/>
              ${sparkle(156, 34, 14, '#fff3b0', 'twinkle')}</g></g>
            <g data-a="armUp" opacity="0"><path d="M50 36 C 76 20 86 -6 90 -30" stroke="#e8e2ee" stroke-width="22" stroke-linecap="round" fill="none"/><circle cx="90" cy="-34" r="14" fill="#fff"/></g>
            <g data-a="armUp2" opacity="0"><path d="M-50 36 C -76 20 -86 -6 -90 -30" stroke="#e8e2ee" stroke-width="22" stroke-linecap="round" fill="none"/><circle cx="-90" cy="-34" r="14" fill="#fff"/></g>
            ${crumbs}
            ${amm}
          </g>
        </g></g>
        </g>
        <g data-a="hearts" opacity="0">${Array.from({ length: 7 }, (_, i) => `<g class="rise" style="--t:${f(R(3, 5))}s;--d:-${f(R(0, 5))}s;--h:-${f(R(140, 240))}px;--o:1">${heart(f(R(220, 450)), f(R(250, 330)), f(R(1, 1.8)), i % 2 ? '#ff5d7a' : '#ff8fa6')}</g>`).join('')}</g>
        <g data-a="ting" opacity="0" transform="translate(330 392)">${sparkle(0, 0, 30, '#fff', '')}${sparkle(22, -18, 12, '#fff7c2', 'twinkle')}${sparkle(-22, 10, 10, '#fff7c2', 'twinkle', -.6)}</g>
        <g data-a="magic" opacity="0">${Array.from({ length: 10 }, (_, i) => sparkle(f(R(470, 700)), f(R(260, 460)), f(R(8, 18)), i % 2 ? '#ffe27a' : '#fff', 'twinkle', R(-2, 0))).join('')}</g>
        <g data-a="poof" opacity="0" transform="translate(316 404)"><g data-a="poof-in">${poof}</g></g>
        <g data-a="hop" opacity="0" transform="translate(560 220)"><g data-a="hop-in"><text class="fx" x="0" y="0" text-anchor="middle" font-size="72" fill="#ffe27a" stroke="#7b1f2a" stroke-width="7" paint-order="stroke">הוֹפּ!</text></g></g>
        <g data-a="confetti">${confetti}</g>
        ${lights}`;
    },
    extraDefs: `<linearGradient id="rFloorShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1042" stop-opacity=".1"/><stop offset=".4" stop-color="#12061e" stop-opacity=".55"/></linearGradient>
      <mask id="rBite" maskUnits="userSpaceOnUse" x="-200" y="-200" width="400" height="400"><rect x="-200" y="-200" width="400" height="400" fill="#fff"/>
        <g data-a="biteMask"><rect x="-200" y="-400" width="400" height="300" fill="#000"/><circle cx="-12" cy="-100" r="12" fill="#000"/><circle cx="6" cy="-100" r="13" fill="#000"/><circle cx="22" cy="-100" r="10" fill="#000"/></g></mask>`
  };

  /* =======================================================
     שער — מדליונים, קישוטים וחלקיקים
     ======================================================= */
  function icon(name) {
    const wrap = (vb, inner) => `<svg viewBox="${vb}" aria-hidden="true" focusable="false">${inner}</svg>`;
    switch (name) {
      case 'carrot': return wrap('-150 -130 300 300', `<g transform="rotate(28) translate(0 -40) scale(.95)">${carrot('ic-carrot')}</g>`);
      case 'eggplant': return wrap('-140 -190 280 330', `<g transform="rotate(-8)">${eggplant('ic-egg')}<g transform="translate(0 -128)">${crown('ic-crown')}</g></g>`);
      case 'kingfisher': return wrap('-140 -120 240 230', kingfisher('ic-kf'));
      case 'mombird': return wrap('-110 -110 200 200', momBird('ic-mom'));
      case 'tooth': return wrap('-80 -100 160 190', tooth('ic-tooth'));
      case 'rabbit': return wrap('-175 -205 350 350', `<g transform="translate(0 10) scale(.82)">${rabbit('ic-rab')}</g>`);
    }
    return '';
  }
  function flourish() {
    return `<svg viewBox="0 0 520 60" aria-hidden="true" focusable="false"><g fill="none" stroke="#c48a35" stroke-width="3" stroke-linecap="round" class="flourish-lines">
      <path d="M260 30 C 230 30 210 10 180 14 C 150 18 150 44 176 44 C 196 44 196 22 178 24"/>
      <path d="M260 30 C 290 30 310 10 340 14 C 370 18 370 44 344 44 C 324 44 324 22 342 24"/>
      <path d="M150 30 H20"/><path d="M370 30 H500"/></g>
      <path d="M260 14 L272 30 L260 46 L248 30Z" fill="#d9a441"/><circle cx="20" cy="30" r="5" fill="#d9a441"/><circle cx="500" cy="30" r="5" fill="#d9a441"/>
      <path d="M232 30 C 224 22 214 22 206 28 C 214 32 224 34 232 30Z" fill="#89b25a"/><path d="M288 30 C 296 22 306 22 314 28 C 306 32 296 34 288 30Z" fill="#89b25a"/></svg>`;
  }
  function floaters() {
    const items = [];
    const shapes = [
      () => `<svg viewBox="-20 -20 40 40">${heart(0, 4, 1.1, '#ff8fa6')}</svg>`,
      () => `<svg viewBox="-20 -20 40 40">${star(0, 0, 16, '#f4c54f')}</svg>`,
      () => `<svg viewBox="-20 -24 40 40"><path d="M0 14 C -14 0 -10 -18 0 -22 C 10 -18 14 0 0 14Z" fill="#7fc65a"/><path d="M0 12 V-16" stroke="#4c9f39" stroke-width="2"/></svg>`,
      () => `<svg viewBox="-20 -24 40 44">${note(0, 0, 1.2, '#b07a35')}</svg>`,
      () => `<svg viewBox="-20 -20 40 40">${sparkle(0, 0, 16, '#e9b54e', '')}</svg>`
    ];
    for (let i = 0; i < 22; i++) {
      let x = R(4, 96), y = R(6, 94);
      if (x > 22 && x < 78 && y > 30 && y < 70) x = x < 50 ? R(4, 18) : R(82, 96);
      items.push(`<div class="hero-float" style="--x:${f(x)}%;--y:${f(y)}%;--s:${f(R(18, 40))}px;--d:${f(R(-8, 0))}s;--t:${f(R(6, 12))}s;--r:${f(R(-30, 30))}deg">${shapes[i % shapes.length]()}</div>`);
    }
    return items.join('');
  }

  // מסגור לטלפון (לאורך) — החלק החשוב של כל תפאורה
  salad.vbTall = '130 50 540 590';
  eggplantScene.vbTall = '90 40 620 620';
  kingfisherScene.vbTall = '100 20 600 680';
  noblebird.vbTall = '120 0 600 680';
  toothScene.vbTall = '130 20 540 660';
  rabbitScene.vbTall = '120 30 580 630';

  A.scenes = {
    salad, eggplant: eggplantScene, kingfisher: kingfisherScene, noblebird, tooth: toothScene, rabbit: rabbitScene
  };
  A.icon = icon;
  A.flourish = flourish;
  A.floaters = floaters;
})(window.ART);
