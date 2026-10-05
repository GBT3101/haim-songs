/* =========================================================
   ספריית איורים — דמויות, פרצופים וגרדיאנטים משותפים
   כל האיורים מצוירים בקוד (SVG) — ללא תמונות חיצוניות
   ========================================================= */
window.ART = (function () {
  'use strict';

  // מחולל אקראיות דטרמיניסטי — כדי שהאיורים ייראו זהים בכל טעינה
  let seed = 20251005;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const R = (a, b) => a + (b - a) * rnd();
  const f = (n) => Math.round(n * 10) / 10;

  const INK = '#2b1a12';

  /* ---------- גרדיאנטים ודפוסים משותפים ---------- */
  function defs() {
    const lin = (id, stops, x2 = 0, y2 = 1, x1 = 0, y1 = 0) =>
      `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</linearGradient>`;
    const rad = (id, stops, cx = .5, cy = .5, r = .5, fx = cx, fy = cy) =>
      `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}" fx="${fx}" fy="${fy}">${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</radialGradient>`;
    return `<svg class="art-defs" width="0" height="0" style="position:absolute;width:0;height:0" aria-hidden="true" focusable="false"><defs>
      ${lin('gCarrot', [[0, '#ffb24d'], [.45, '#f5801f'], [1, '#d65a10']], 1, 0)}
      ${lin('gLeaf', [[0, '#9be063'], [1, '#3f9a35']])}
      ${lin('gLeaf2', [[0, '#7fd05a'], [1, '#2f7f2c']])}
      ${rad('gTomato', [[0, '#ff9a7e'], [.5, '#ef3b2a'], [1, '#b01b14']], .38, .32, .7)}
      ${rad('gCabHead', [[0, '#f4fde2'], [.6, '#c8eba2'], [1, '#86c766']], .45, .4, .65)}
      ${rad('gCabLeaf', [[0, '#c3eb98'], [1, '#5aa845']], .6, .4, .8)}
      ${lin('gCucumber', [[0, '#2f7a2c'], [.45, '#6cbc52'], [1, '#2a6a28']], 1, 0)}
      ${rad('gOnion', [[0, '#fde9bd'], [.55, '#e9ad5c'], [1, '#b0642a']], .4, .35, .7)}
      ${rad('gEggplant', [[0, '#c497ea'], [.45, '#7330a6'], [1, '#3a0f5e']], .36, .28, .8)}
      ${lin('gCalyx', [[0, '#8fd468'], [1, '#3a8733']])}
      ${lin('gBowl', [[0, '#ffffff'], [.6, '#eef4fa'], [1, '#c6d8ea']])}
      ${lin('gBowlSide', [[0, '#9fb8d0', .55], [.18, '#ffffff', 0], [.82, '#ffffff', 0], [1, '#9fb8d0', .6]], 1, 0)}
      ${rad('gBowlIn', [[0, '#a9c3d6'], [1, '#6f8ca4']], .5, .2, .9)}
      ${lin('gGold', [[0, '#fff3b8'], [.4, '#f4c54f'], [1, '#c48419']])}
      ${lin('gGoldH', [[0, '#c48419'], [.5, '#ffe58a'], [1, '#c48419']], 1, 0)}
      ${lin('gWood', [[0, '#e0a96c'], [1, '#a8682f']])}
      ${lin('gBark', [[0, '#7a4a2a'], [.5, '#9b6440'], [1, '#6a3c20']], 1, 0)}
      ${lin('gKfBlue', [[0, '#4fd4f5'], [.5, '#1fa2e0'], [1, '#126fb8']])}
      ${lin('gKfOrange', [[0, '#ffbf78'], [1, '#ee7424']])}
      ${lin('gWater', [[0, '#8fdcf3'], [.25, '#3fa6d6'], [1, '#174f86']])}
      ${lin('gCat', [[0, '#ffc47a'], [1, '#e8892f']])}
      ${rad('gCatHead', [[0, '#ffd59a'], [.7, '#f5a046'], [1, '#e0832a']], .45, .4, .7)}
      ${lin('gBirdBack', [[0, '#c58956'], [1, '#7e4a2a']])}
      ${rad('gChick', [[0, '#fff6b8'], [.6, '#ffd94d'], [1, '#f2b318']], .4, .35, .75)}
      ${rad('gTooth', [[0, '#ffffff'], [.6, '#f5f8fc'], [1, '#d3dfeb']], .4, .3, .8)}
      ${lin('gGum', [[0, '#ffc2cd'], [1, '#ef7f98']])}
      ${rad('gRabbit', [[0, '#ffffff'], [.65, '#f4f0f6'], [1, '#d8cfe2']], .45, .35, .75)}
      ${lin('gPot', [[0, '#a71f18'], [.3, '#ef5040'], [.55, '#d93a2c'], [1, '#8d150f']], 1, 0)}
      ${lin('gBeam', [[0, '#fff7d6', .75], [1, '#fff7d6', 0]])}
      ${rad('gGlow', [[0, '#fff3b0', .95], [1, '#fff3b0', 0]])}
      ${rad('gGlowW', [[0, '#ffffff', .9], [1, '#ffffff', 0]])}
      ${rad('gShadow', [[0, '#000', .32], [1, '#000', 0]])}
      ${lin('gSkin', [[0, '#ffdcbc'], [1, '#f0b48a']])}
      ${rad('gSkinR', [[0, '#ffe6cf'], [.7, '#ffcfa8'], [1, '#f2b088']], .45, .4, .7)}
      ${lin('gFish', [[0, '#ffd27a'], [1, '#ff7f2a']])}
      ${lin('gFish2', [[0, '#d9f1ff'], [1, '#7fa9cf']])}
      ${lin('gHat', [[0, '#3a3546'], [.5, '#17141f'], [1, '#2a2533']], 1, 0)}
      ${lin('gRed', [[0, '#ff5a6c'], [1, '#c41c35']])}
      ${lin('gVelvet', [[0, '#e0384f'], [1, '#8f1022']])}
      <pattern id="pGingham" width="56" height="56" patternUnits="userSpaceOnUse">
        <rect width="56" height="56" fill="#fff6ee"/><rect width="28" height="56" fill="#e8584a" opacity=".55"/>
        <rect width="56" height="28" fill="#e8584a" opacity=".55"/></pattern>
      <pattern id="pDots" width="22" height="22" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="3.2" fill="#fff" opacity=".85"/><circle cx="16" cy="16" r="3.2" fill="#fff" opacity=".85"/></pattern>
      <pattern id="pPlanks" width="160" height="40" patternUnits="userSpaceOnUse">
        <rect width="160" height="40" fill="#b07a45"/><rect width="160" height="3" fill="#7a4d26"/>
        <rect x="70" width="3" height="40" fill="#8a5a2e"/><path d="M10 18 q30 -6 50 2 M90 26 q30 -8 60 0" stroke="#c99560" stroke-width="2" fill="none"/></pattern>
    </defs></svg>`;
  }

  /* ---------- פרצוף כללי — עיניים, לחיים, פיות ודמעות ---------- */
  function drips(x, y) {
    return [0, .42, .84].map((d) =>
      `<path class="drip" style="--d:${d}s" d="M${x} ${y} q-3.8 6.4 0 10 q3.8 -3.6 0 -10z" fill="#6ccbff"/>`).join('');
  }
  function spiral(cx, cy) {
    return `<path d="M${cx} ${cy} a1.6 1.6 0 1 1 3.2 0 a3.2 3.2 0 1 1 -6.4 0 a4.8 4.8 0 1 1 9.6 0 a6.2 6.2 0 1 1 -12.4 0"/>`;
  }
  function face(a, o = {}) {
    const { x = 0, y = 0, s = 1, gap = 13, eye = 1, mouth = 'smile', blush = true, tears = true, cheekColor = '#ff7f86' } = o;
    const g = gap;
    const m = (k, svg) => svg.replace('data-m=', `${k === mouth ? '' : 'opacity="0" '}data-m=`);
    return `<g transform="translate(${x} ${y}) scale(${s})" data-a="${a}-face">
      ${blush ? `<ellipse cx="${-g - 9}" cy="10" rx="7.5" ry="4.6" fill="${cheekColor}" opacity=".5"/><ellipse cx="${g + 9}" cy="10" rx="7.5" ry="4.6" fill="${cheekColor}" opacity=".5"/>` : ''}
      <g data-a="${a}-eyes"><g class="blink" style="--d:${f(R(-5, 0))}s">
        <ellipse cx="${-g}" cy="0" rx="${5.6 * eye}" ry="${7.6 * eye}" fill="${INK}"/>
        <ellipse cx="${g}" cy="0" rx="${5.6 * eye}" ry="${7.6 * eye}" fill="${INK}"/>
        <circle cx="${-g + 2}" cy="-3.2" r="${2.4 * eye}" fill="#fff"/><circle cx="${g + 2}" cy="-3.2" r="${2.4 * eye}" fill="#fff"/>
        <circle cx="${-g - 1.6}" cy="3.2" r="1.1" fill="#fff" opacity=".8"/><circle cx="${g - 1.6}" cy="3.2" r="1.1" fill="#fff" opacity=".8"/>
      </g></g>
      <g data-a="${a}-dizzy" opacity="0" stroke="${INK}" stroke-width="2.2" fill="none" stroke-linecap="round">${spiral(-g, 0)}${spiral(g, 0)}</g>
      <g data-a="${a}-proud" opacity="0" stroke="${INK}" stroke-width="2.8" fill="none" stroke-linecap="round">
        <path d="M${-g - 7} 1 Q${-g} -3 ${-g + 7} 1"/><path d="M${g - 7} 1 Q${g} -3 ${g + 7} 1"/>
        <path d="M${-g - 7} -9 L${-g + 6} -6" stroke-width="2.2"/><path d="M${g + 7} -9 L${g - 6} -6" stroke-width="2.2"/></g>
      <g data-a="${a}-mouth" fill="none" stroke="${INK}" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round">
        ${m('smile', `<path data-m="smile" d="M-7.5 11 Q0 18.5 7.5 11"/>`)}
        ${m('grin', `<path data-m="grin" d="M-9 10 Q0 22 9 10 Z" fill="#7a2323" stroke-width="2.2"/>`)}
        ${m('sad', `<path data-m="sad" d="M-7.5 17 Q0 9.5 7.5 17"/>`)}
        ${m('o', `<g data-m="o" stroke="none"><ellipse cx="0" cy="15" rx="5.6" ry="7.2" fill="#6b1f1f"/><ellipse cx="0" cy="18.6" rx="3.4" ry="2.4" fill="#ff8f8f"/></g>`)}
        ${m('big', `<g data-m="big" stroke="none"><path d="M-12.5 8 Q0 3 12.5 8 Q11 31 0 31 Q-11 31 -12.5 8Z" fill="#6b1f1f"/><path d="M-7 25 Q0 19 7 25 Q4 30 0 30 Q-4 30 -7 25Z" fill="#ff8f8f"/></g>`)}
        ${m('wavy', `<path data-m="wavy" d="M-10 15 q2.5 -3.4 5 0 t5 0 t5 0 t5 0"/>`)}
        ${m('flat', `<path data-m="flat" d="M-4.5 15 H4.5"/>`)}
        ${m('smug', `<path data-m="smug" d="M-7 14 Q3 17 9 9"/>`)}
      </g>
      ${tears ? `<g data-a="${a}-tears" opacity="0">${drips(-g - 1, 7)}${drips(g + 1, 7)}</g>` : ''}
    </g>`;
  }

  /* ---------- ירקות ---------- */
  function carrot(a, o = {}) {
    return `<g data-a="${a}">
      <g class="sway" style="--d:${f(R(-4, 0))}s">
        <path d="M0 6 C -10 -26 -40 -44 -38 -76 C -18 -60 -6 -38 0 6Z" fill="url(#gLeaf)"/>
        <path d="M0 6 C -9 -38 -2 -78 6 -102 C 16 -70 9 -32 0 6Z" fill="#62b847"/>
        <path d="M0 6 C 12 -28 40 -44 46 -72 C 26 -58 10 -34 0 6Z" fill="url(#gLeaf2)"/>
        <path d="M2 2 C 2 -30 4 -60 6 -94" stroke="#3d8a30" stroke-width="2" fill="none" opacity=".6"/>
      </g>
      <path d="M-29 8 C-31 -6 31 -6 29 8 C 25 82 11 170 3 228 C 1 235 -2 235 -3 228 C -13 170 -25 82 -29 8 Z" fill="url(#gCarrot)"/>
      <g stroke="#c4520e" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".75">
        <path d="M-22 78 q8 5 15 2"/><path d="M10 112 q8 3 12 -2"/><path d="M-16 150 q6 4 11 1"/><path d="M5 188 q5 2 8 -2"/></g>
      <path d="M-17 24 C -20 70 -12 130 -4 190" stroke="#fff" stroke-width="6" stroke-linecap="round" fill="none" opacity=".28"/>
      ${o.noFace ? '' : face(a, { y: 46, s: .95, gap: 12 })}
    </g>`;
  }

  function cabbage(a) {
    const vein = (d) => `<path d="${d}" stroke="#effbdc" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".85"/>`;
    return `<g data-a="${a}">
      <g data-a="${a}-leafL"><path d="M-28 -24 C -84 -46 -112 6 -94 50 C -82 78 -42 72 -30 40Z" fill="url(#gCabLeaf)"/>${vein('M-36 -14 C -70 -10 -88 20 -82 48')}</g>
      <g data-a="${a}-leafR"><path d="M28 -24 C 84 -46 112 6 94 50 C 82 78 42 72 30 40Z" fill="url(#gCabLeaf)"/>${vein('M36 -14 C 70 -10 88 20 82 48')}</g>
      <circle r="72" fill="url(#gCabHead)"/>
      <path d="M-64 -20 C -52 -70 6 -82 12 -42 C 2 -10 -30 32 -60 36 C -72 20 -70 0 -64 -20Z" fill="#b6e28c" opacity=".92"/>
      <path d="M64 -20 C 52 -70 -6 -82 -12 -42 C -2 -10 30 32 60 36 C 72 20 70 0 64 -20Z" fill="#a9db7f" opacity=".92"/>
      ${vein('M8 -46 C -16 -38 -40 -10 -54 24')}${vein('M-30 -40 C -40 -30 -46 -18 -50 -6')}
      ${vein('M-8 -46 C 16 -38 40 -10 54 24')}${vein('M30 -40 C 40 -30 46 -18 50 -6')}
      <path d="M-40 52 C -20 66 20 66 40 52" stroke="#86c766" stroke-width="4" fill="none" opacity=".6"/>
      <circle data-a="${a}-grey" r="74" fill="#8f9a86" opacity="0"/>
      ${face(a, { y: 12, s: 1.05, gap: 14 })}
    </g>`;
  }

  function tomato(a) {
    return `<g data-a="${a}">
      <ellipse rx="60" ry="54" fill="url(#gTomato)"/>
      <path d="M-46 -18 C -40 -40 -20 -50 -4 -50" stroke="#ffb3a1" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>
      <ellipse cx="-26" cy="-24" rx="11" ry="6" fill="#fff" opacity=".6" transform="rotate(-32 -26 -24)"/>
      <g transform="translate(0 -50)">
        <path d="M0 -6 L9 -18 L7 -4 L22 -7 L9 2 L16 15 L0 6 L-16 15 L-9 2 L-22 -7 L-7 -4 L-9 -18Z" fill="url(#gCalyx)"/>
        <path d="M0 -4 C 1 -14 4 -20 9 -24" stroke="#3a8733" stroke-width="5" stroke-linecap="round" fill="none"/>
      </g>
      ${face(a, { y: 6, s: 1.05, gap: 15 })}
      <g data-a="${a}-zip" opacity="0" transform="translate(0 21)">
        <rect x="-15" y="-4" width="30" height="8" rx="4" fill="#7b1f19"/>
        <path d="M-12 -4 v8 M-8 -4 v8 M-4 -4 v8 M0 -4 v8 M4 -4 v8 M8 -4 v8 M12 -4 v8" stroke="#ffd36e" stroke-width="1.6"/>
        <rect x="11" y="-6" width="9" height="12" rx="2.5" fill="#ffd36e" stroke="#b5891d" stroke-width="1"/>
      </g>
    </g>`;
  }

  function cucumber(a) {
    let bumps = '';
    for (let i = 0; i < 14; i++) bumps += `<circle cx="${f(R(-20, 20))}" cy="${f(R(-80, 86))}" r="${f(R(1.8, 3))}" fill="#9fdc7c" opacity=".7"/>`;
    return `<g data-a="${a}">
      <ellipse rx="31" ry="102" fill="url(#gCucumber)"/>
      <path d="M-12 -92 C -16 -40 -16 40 -10 92" stroke="#8fd16a" stroke-width="3.5" fill="none" opacity=".55"/>
      <path d="M10 -92 C 14 -40 14 40 8 92" stroke="#8fd16a" stroke-width="3" fill="none" opacity=".45"/>
      ${bumps}
      <ellipse cy="-98" rx="10" ry="5" fill="#a6dd7e"/>
      ${face(a, { y: -40, s: .95, gap: 12 })}
    </g>`;
  }

  function onion(a) {
    return `<g data-a="${a}">
      <path d="M-6 54 q-6 12 -14 14 M0 56 q0 12 -2 18 M6 54 q6 10 14 12" stroke="#c9a46e" stroke-width="2.6" fill="none" stroke-linecap="round"/>
      <path d="M0 -62 C 10 -42 50 -22 50 14 C 50 44 26 58 0 58 C -26 58 -50 44 -50 14 C -50 -22 -10 -42 0 -62Z" fill="url(#gOnion)"/>
      <g stroke="#b26c30" stroke-width="2" fill="none" opacity=".5">
        <path d="M0 -58 C -26 -30 -32 20 -18 56"/><path d="M0 -58 C 26 -30 32 20 18 56"/><path d="M0 -58 C -6 -20 -6 30 0 58"/></g>
      <path d="M0 -60 q5 -14 -1 -26 q-2 -4 1 -8" stroke="#a5743a" stroke-width="4" fill="none" stroke-linecap="round"/>
      <ellipse cx="-24" cy="-6" rx="7" ry="14" fill="#fff" opacity=".35" transform="rotate(16 -24 -6)"/>
      ${face(a, { y: 14, s: .95, gap: 13 })}
      <g data-a="${a}-glasses" opacity="0" transform="translate(0 14)" fill="none" stroke="#3a2a20" stroke-width="2.6">
        <circle cx="-13" cy="0" r="10" fill="#fff" fill-opacity=".25"/><circle cx="13" cy="0" r="10" fill="#fff" fill-opacity=".25"/>
        <path d="M-3 -1 q3 -3 6 0 M-23 -2 l-14 -5 M23 -2 l14 -5"/></g>
      <g data-a="${a}-arm" opacity="0">
        <path d="M44 20 C 60 14 66 -4 66 -22" stroke="#b0642a" stroke-width="5" fill="none" stroke-linecap="round"/>
        <ellipse cx="66" cy="-26" rx="7" ry="8" fill="#f2c27e"/><rect x="63" y="-50" width="6" height="22" rx="3" fill="#f2c27e"/></g>
    </g>`;
  }

  function eggplant(a) {
    return `<g data-a="${a}">
      <g data-a="${a}-legs" stroke="#3a0f5e" stroke-width="7" stroke-linecap="round" fill="none">
        <path data-a="${a}-legL" d="M-24 104 L-28 140"/><path data-a="${a}-legR" d="M24 104 L28 140"/>
        <ellipse cx="-34" cy="143" rx="15" ry="7" fill="#3a0f5e" stroke="none"/><ellipse cx="34" cy="143" rx="15" ry="7" fill="#3a0f5e" stroke="none"/>
      </g>
      <g data-a="${a}-armR"><path d="M58 -6 C 84 2 96 22 98 44" stroke="#4a1773" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="98" cy="48" r="10" fill="#5b2088"/></g>
      <g data-a="${a}-armL"><path d="M-58 -6 C -84 2 -96 22 -98 44" stroke="#4a1773" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="-98" cy="48" r="10" fill="#5b2088"/></g>
      <path d="M0 -110 C 40 -110 52 -60 62 -10 C 76 50 70 110 0 112 C -70 110 -76 50 -62 -10 C -52 -60 -40 -110 0 -110Z" fill="url(#gEggplant)"/>
      <path d="M-34 -70 C -48 -30 -54 20 -40 70" stroke="#e2c4ff" stroke-width="8" stroke-linecap="round" fill="none" opacity=".35"/>
      <ellipse cx="-30" cy="-56" rx="8" ry="16" fill="#fff" opacity=".4" transform="rotate(20 -30 -56)"/>
      <path d="M-4 -112 C -6 -130 2 -144 12 -148" stroke="#3f8a35" stroke-width="9" stroke-linecap="round" fill="none"/>
      <path d="M-40 -96 C -26 -64 -10 -86 0 -68 C 10 -86 26 -64 40 -96 C 22 -120 -22 -120 -40 -96Z" fill="url(#gCalyx)"/>
      ${face(a, { y: -26, s: 1.25, gap: 14 })}
    </g>`;
  }

  function crown(a) {
    return `<g data-a="${a}">
      <path d="M-46 10 L-52 -32 L-28 -8 L-14 -44 L0 -12 L14 -44 L28 -8 L52 -32 L46 10Z" fill="url(#gGold)" stroke="#a8721a" stroke-width="2.4" stroke-linejoin="round"/>
      <circle cx="-52" cy="-34" r="6" fill="url(#gGold)" stroke="#a8721a" stroke-width="2"/><circle cx="52" cy="-34" r="6" fill="url(#gGold)" stroke="#a8721a" stroke-width="2"/>
      <circle cx="-14" cy="-46" r="6" fill="url(#gGold)" stroke="#a8721a" stroke-width="2"/><circle cx="14" cy="-46" r="6" fill="url(#gGold)" stroke="#a8721a" stroke-width="2"/>
      <rect x="-48" y="4" width="96" height="16" rx="5" fill="url(#gGold)" stroke="#a8721a" stroke-width="2.4"/>
      <circle cx="-26" cy="12" r="5" fill="#e8344d"/><circle cx="0" cy="12" r="6" fill="#2d8ce0"/><circle cx="26" cy="12" r="5" fill="#2fb36a"/>
      <path d="M-40 -2 L-36 -20" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>
    </g>`;
  }

  /* ---------- שלדג ודגים ---------- */
  function kingfisher(a) {
    let spots = '';
    for (let i = 0; i < 9; i++) spots += `<circle cx="${f(R(-2, 34))}" cy="${f(R(-22, 8))}" r="${f(R(1.6, 2.8))}" fill="#bff0ff" opacity=".85"/>`;
    return `<g data-a="${a}">
      <path d="M28 8 L80 30 L74 42 L24 22Z" fill="#126fb8"/>
      <path d="M30 10 L76 30" stroke="#4fd4f5" stroke-width="3" opacity=".6"/>
      <g data-a="${a}-feet" stroke="#e5482e" stroke-width="4" stroke-linecap="round"><path d="M-6 40 L-10 54 M6 40 L4 54"/></g>
      <path d="M-22 -32 C 10 -42 42 -20 42 10 C 42 36 12 46 -14 42 C -42 36 -48 -22 -22 -32Z" fill="url(#gKfBlue)"/>
      <path d="M-38 -2 C -36 30 -10 46 15 42 C 32 38 40 24 38 14 C 10 22 -16 16 -38 -2Z" fill="url(#gKfOrange)"/>
      <g data-a="${a}-wingFold"><path d="M-12 -28 C 20 -38 50 -12 46 18 C 30 26 2 12 -12 -28Z" fill="#1678c0"/>${spots}
        <path d="M0 -6 C 14 4 30 10 44 12" stroke="#0d5c99" stroke-width="2" fill="none" opacity=".7"/></g>
      <g data-a="${a}-wingFly" opacity="0">
        <g class="flap" style="--o:10% 100%;--a1:-34deg;--a2:30deg"><path d="M-4 -18 C -14 -78 26 -112 64 -104 C 42 -76 30 -44 12 -12Z" fill="url(#gKfBlue)"/>
          <path d="M8 -30 C 14 -60 34 -84 54 -96" stroke="#bff0ff" stroke-width="3" fill="none" opacity=".6"/></g>
      </g>
      <g data-a="${a}-head">
        <circle cx="-34" cy="-36" r="27" fill="url(#gKfBlue)"/>
        <path d="M-60 -30 C -54 -14 -34 -10 -16 -18 C -22 -30 -42 -34 -60 -30Z" fill="url(#gKfOrange)"/>
        <path d="M-56 -18 C -50 -6 -38 -4 -28 -8 C -36 -14 -48 -16 -56 -18Z" fill="#fff"/>
        <path d="M-30 -18 C -20 -14 -10 -16 -2 -22 C -10 -26 -20 -24 -30 -18Z" fill="#fff" opacity=".9"/>
        <g class="blink" style="--d:-2s"><circle cx="-42" cy="-40" r="7.5" fill="${INK}"/><circle cx="-39.5" cy="-43" r="2.8" fill="#fff"/></g>
        <path d="M-58 -42 L-124 -31 L-58 -28Z" fill="#2a2a33"/>
        <path d="M-60 -40 L-118 -32" stroke="#5a5a68" stroke-width="2"/>
        <g data-a="${a}-fish" opacity="0" transform="translate(-112 -26) rotate(-8)"><g class="wiggle" style="--o:30% 20%">${fishShape('#gFish2', 0.75)}</g></g>
      </g>
    </g>`;
  }

  function fishShape(grad = '#gFish', s = 1) {
    return `<g transform="scale(${s})">
      <g class="tail" style="--o:0% 50%"><path d="M26 0 L46 -14 L42 0 L46 14Z" fill="url(${grad})"/></g>
      <ellipse cx="0" cy="0" rx="30" ry="14" fill="url(${grad})"/>
      <path d="M-4 -12 Q6 -22 14 -12" fill="url(${grad})" opacity=".9"/>
      <path d="M8 -10 Q2 0 8 10" stroke="#fff" stroke-width="2" fill="none" opacity=".5"/>
      <circle cx="-16" cy="-3" r="3.6" fill="${INK}"/><circle cx="-15" cy="-4.2" r="1.3" fill="#fff"/>
      <path d="M-28 2 q3 2 6 0" stroke="${INK}" stroke-width="1.5" fill="none"/>
    </g>`;
  }

  /* ---------- ילד/ה עם משקפת ---------- */
  function child(a) {
    return `<g data-a="${a}">
      <g data-a="${a}-legsStand" stroke="#3b5aa8" stroke-width="13" stroke-linecap="round"><path d="M-10 58 L-12 96 M10 58 L12 96"/></g>
      <g data-a="${a}-legsRun" opacity="0" stroke="#3b5aa8" stroke-width="13" stroke-linecap="round">
        <g class="wiggle" style="--o:50% 0%"><path d="M-8 58 L-22 92"/></g><g class="wiggle" style="--o:50% 0%;animation-delay:-.15s"><path d="M8 58 L22 92"/></g></g>
      <ellipse cx="-14" cy="98" rx="11" ry="6" fill="#d8402f"/><ellipse cx="14" cy="98" rx="11" ry="6" fill="#d8402f"/>
      <path d="M-26 6 C -26 -6 26 -6 26 6 L 30 62 L -30 62Z" fill="#ffcf3f"/>
      <path d="M-26 30 H26" stroke="#f59e1b" stroke-width="5" opacity=".7"/>
      <circle cx="0" cy="-32" r="31" fill="url(#gSkinR)"/>
      <g fill="#5a3418"><circle cx="-24" cy="-50" r="12"/><circle cx="-8" cy="-60" r="13"/><circle cx="10" cy="-60" r="13"/><circle cx="25" cy="-48" r="12"/><circle cx="30" cy="-32" r="9"/><circle cx="-30" cy="-34" r="9"/></g>
      <ellipse cx="-17" cy="-20" rx="6" ry="3.6" fill="#ff8f8f" opacity=".55"/><ellipse cx="17" cy="-20" rx="6" ry="3.6" fill="#ff8f8f" opacity=".55"/>
      <path d="M-6 -12 Q0 -6 6 -12" stroke="${INK}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
      <g data-a="${a}-binos">
        <path d="M-24 14 C -30 0 -28 -24 -18 -32 M24 14 C 30 0 28 -24 18 -32" stroke="url(#gSkin)" stroke-width="10" stroke-linecap="round" fill="none"/>
        <rect x="-24" y="-46" width="20" height="26" rx="6" fill="#2d2d38"/><rect x="4" y="-46" width="20" height="26" rx="6" fill="#2d2d38"/>
        <rect x="-6" y="-40" width="12" height="9" fill="#46465a"/>
        <circle cx="-14" cy="-44" r="6" fill="#7fd0ff"/><circle cx="14" cy="-44" r="6" fill="#7fd0ff"/>
        <circle cx="-16" cy="-46" r="2" fill="#fff"/><circle cx="12" cy="-46" r="2" fill="#fff"/></g>
      <g data-a="${a}-eyesOpen" opacity="0"><circle cx="-11" cy="-34" r="4.5" fill="${INK}"/><circle cx="11" cy="-34" r="4.5" fill="${INK}"/>
        <circle cx="-9.6" cy="-35.6" r="1.6" fill="#fff"/><circle cx="12.4" cy="-35.6" r="1.6" fill="#fff"/></g>
    </g>`;
  }

  /* ---------- חתול ---------- */
  function cat(a) {
    return `<g data-a="${a}">
      <g data-a="${a}-tail"><g class="sway" style="--d:-1s"><path d="M30 60 C 74 60 92 30 84 0 C 80 -14 68 -16 66 -6 C 74 20 56 40 26 44" fill="url(#gCat)"/>
        <path d="M70 6 l12 -4 M74 22 l12 2 M66 38 l10 8" stroke="#c96a1c" stroke-width="5" stroke-linecap="round"/></g></g>
      <ellipse cx="0" cy="40" rx="44" ry="50" fill="url(#gCat)"/>
      <ellipse cx="0" cy="50" rx="26" ry="34" fill="#fff1dc"/>
      <g stroke="#c96a1c" stroke-width="5" stroke-linecap="round" opacity=".8"><path d="M-40 20 l14 4 M-42 40 l14 2 M40 20 l-14 4 M42 40 l-14 2"/></g>
      <g data-a="${a}-spikes" opacity="0" fill="#f29a3e">
        <path d="M-44 10 l-16 -8 l10 14 l-18 0 l14 10 l-14 8 l18 2Z"/><path d="M44 10 l16 -8 l-10 14 l18 0 l-14 10 l14 8 l-18 2Z"/>
        <path d="M-20 -6 l-6 -16 l12 8 l4 -16 l6 14 l8 -14 l2 16 l12 -8 l-6 16Z"/></g>
      <g data-a="${a}-pawsUp"><ellipse cx="-34" cy="-38" rx="14" ry="12" fill="#ffd59a"/><ellipse cx="34" cy="-38" rx="14" ry="12" fill="#ffd59a"/>
        <path d="M-40 -32 v-6 M-34 -30 v-7 M-28 -32 v-6 M28 -32 v-6 M34 -30 v-7 M40 -32 v-6" stroke="#d98a3c" stroke-width="1.8"/></g>
      <g data-a="${a}-pawsDown" opacity="0"><ellipse cx="-18" cy="86" rx="15" ry="10" fill="#ffd59a"/><ellipse cx="18" cy="86" rx="15" ry="10" fill="#ffd59a"/></g>
      <ellipse cx="-26" cy="88" rx="16" ry="9" fill="#ffd59a"/><ellipse cx="26" cy="88" rx="16" ry="9" fill="#ffd59a"/>
      <g data-a="${a}-head">
        <path d="M-46 -40 L-50 -96 L-12 -66Z" fill="#f29a3e"/><path d="M-42 -52 L-44 -84 L-22 -66Z" fill="#ffb3b8"/>
        <path d="M46 -40 L50 -96 L12 -66Z" fill="#f29a3e"/><path d="M42 -52 L44 -84 L22 -66Z" fill="#ffb3b8"/>
        <ellipse cx="0" cy="-38" rx="56" ry="46" fill="url(#gCatHead)"/>
        <path d="M-10 -82 l4 18 M0 -84 v20 M10 -82 l-4 18" stroke="#d07220" stroke-width="5" stroke-linecap="round"/>
        <ellipse cx="0" cy="-22" rx="24" ry="16" fill="#fff4e2"/>
        <ellipse cx="-30" cy="-26" rx="8" ry="4.6" fill="#ff7f86" opacity=".5"/><ellipse cx="30" cy="-26" rx="8" ry="4.6" fill="#ff7f86" opacity=".5"/>
        <g data-a="${a}-eyes"><g class="blink" style="--d:-3s">
          <ellipse cx="-20" cy="-42" rx="9" ry="11" fill="#7ecb4a"/><ellipse cx="20" cy="-42" rx="9" ry="11" fill="#7ecb4a"/>
          <ellipse cx="-20" cy="-41" rx="4" ry="9" fill="${INK}"/><ellipse cx="20" cy="-41" rx="4" ry="9" fill="${INK}"/>
          <circle cx="-17" cy="-46" r="2.8" fill="#fff"/><circle cx="23" cy="-46" r="2.8" fill="#fff"/></g></g>
        <g data-a="${a}-x" opacity="0" stroke="${INK}" stroke-width="3.4" stroke-linecap="round"><path d="M-27 -49 l14 14 M-13 -49 l-14 14 M13 -49 l14 14 M27 -49 l-14 14"/></g>
        <g data-a="${a}-tearsC" opacity="0">${drips(-22, -32)}${drips(22, -32)}</g>
        <path d="M-5 -30 h10 l-5 6z" fill="#ff7f8f"/>
        <g data-a="${a}-mouth" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round">
          <path data-m="smile" d="M0 -24 v4 q-5 6 -10 1 M0 -20 q5 6 10 1"/>
          <path data-m="lick" opacity="0" d="M0 -24 v4 q-5 6 -10 1 M0 -20 q5 6 10 1"/>
          <g data-m="cry" opacity="0" stroke="none"><path d="M-10 -16 Q0 -24 10 -16 Q8 -4 0 -4 Q-8 -4 -10 -16Z" fill="#6b1f1f"/></g>
          <path data-m="sad" opacity="0" d="M-8 -12 Q0 -20 8 -12"/>
        </g>
        <g data-a="${a}-tongue" opacity="0"><path d="M2 -18 q6 10 12 2 q-2 -6 -12 -2z" fill="#ff7f8f"/></g>
        <g stroke="#8a5a2a" stroke-width="1.6" opacity=".7"><path d="M-24 -22 h-30 M-24 -16 l-28 6 M24 -22 h30 M24 -16 l28 6"/></g>
        <g data-a="${a}-bandage" opacity="0" transform="rotate(-18 -20 -70)"><rect x="-44" y="-78" width="48" height="16" rx="6" fill="#fff8ec" stroke="#e5cfa8" stroke-width="2"/>
          <path d="M-24 -74 v8 M-28 -70 h8" stroke="#e5484d" stroke-width="3"/></g>
      </g>
    </g>`;
  }

  /* ---------- ציפור אם, גוזל וקן ---------- */
  function momBird(a) {
    return `<g data-a="${a}">
      <path d="M34 0 L74 -8 L70 8 L36 14Z" fill="#7e4a2a"/>
      <g data-a="${a}-feet" stroke="#e8902c" stroke-width="4" stroke-linecap="round"><path d="M-6 40 L-8 54 M8 40 L8 54"/></g>
      <ellipse cx="0" cy="4" rx="44" ry="40" fill="url(#gBirdBack)"/>
      <path d="M-40 -6 C -42 30 -14 46 10 44 C 26 42 34 30 30 18 C 12 24 -20 14 -40 -6Z" fill="#fffdf8"/>
      <path d="M-36 -10 C -40 22 -18 38 4 40" stroke="#e8e0d4" stroke-width="3" fill="none" opacity=".8"/>
      <g data-a="${a}-wingFold"><path d="M-6 -10 C 22 -20 46 0 40 26 C 22 30 2 18 -6 -10Z" fill="#9a5d36"/>
        <path d="M6 4 q12 6 28 8 M10 14 q10 4 22 6" stroke="#6e3c1e" stroke-width="2" fill="none"/></g>
      <g data-a="${a}-wingFly" opacity="0"><g class="flap" style="--o:0% 100%;--a1:-30deg;--a2:28deg">
        <path d="M-2 -10 C -10 -64 30 -96 70 -90 C 48 -64 36 -36 14 -4Z" fill="#9a5d36"/>
        <path d="M14 -22 C 22 -48 40 -70 60 -82" stroke="#6e3c1e" stroke-width="2.4" fill="none"/></g></g>
      <g data-a="${a}-head">
        <circle cx="-30" cy="-28" r="26" fill="url(#gBirdBack)"/>
        <path d="M-50 -16 C -44 -4 -28 0 -14 -6 C -22 -14 -38 -18 -50 -16Z" fill="#fffdf8"/>
        <g class="blink" style="--d:-1.4s"><circle cx="-38" cy="-32" r="7" fill="${INK}"/><circle cx="-35.6" cy="-35" r="2.6" fill="#fff"/></g>
        <ellipse cx="-34" cy="-18" rx="6" ry="3.5" fill="#ff8f8f" opacity=".55"/>
        <g data-a="${a}-beak"><path d="M-54 -30 L-74 -24 L-54 -20Z" fill="#f4a42c"/></g>
        <g data-a="${a}-beakOpen" opacity="0"><path d="M-54 -32 L-76 -34 L-54 -25Z" fill="#f4a42c"/><path d="M-54 -24 L-74 -16 L-54 -19Z" fill="#e08a1a"/></g>
      </g>
      <g data-a="${a}-medal" opacity="0" transform="translate(-6 26)">
        <path d="M-10 -22 L-4 -4 L4 -4 L10 -22Z" fill="#2d8ce0"/><path d="M-6 -22 L0 -6 L6 -22" fill="#e8344d"/>
        <circle cx="0" cy="4" r="10" fill="url(#gGold)" stroke="#a8721a" stroke-width="2"/>
        <path d="M0 -1 l1.8 3.6 4 .5 -2.9 2.8 .7 4 -3.6 -1.9 -3.6 1.9 .7 -4 -2.9 -2.8 4 -.5z" fill="#fff6c8"/></g>
    </g>`;
  }

  function chick(a) {
    return `<g data-a="${a}">
      <path d="M-4 -34 q-6 -14 4 -18 q-2 8 4 10 q4 -10 10 -6 q-8 4 -6 12" fill="#ffd94d"/>
      <circle r="32" fill="url(#gChick)"/>
      <path d="M22 -2 C 34 2 36 14 26 18" fill="#f2b318"/>
      <g class="blink" style="--d:-.6s"><circle cx="-12" cy="-6" r="5" fill="${INK}"/><circle cx="8" cy="-6" r="5" fill="${INK}"/>
        <circle cx="-10.4" cy="-8" r="1.8" fill="#fff"/><circle cx="9.6" cy="-8" r="1.8" fill="#fff"/></g>
      <ellipse cx="-20" cy="6" rx="5" ry="3" fill="#ff8f8f" opacity=".6"/><ellipse cx="16" cy="6" rx="5" ry="3" fill="#ff8f8f" opacity=".6"/>
      <g data-a="${a}-beak"><path d="M-8 2 L-2 10 L4 2Z" fill="#f08a1a"/></g>
      <g data-a="${a}-beakOpen" opacity="0"><path d="M-9 0 L-2 -2 L5 0 L-2 4Z" fill="#f08a1a"/><path d="M-8 6 L-2 14 L4 6 L-2 4Z" fill="#d86f0f"/><path d="M-6 3 h8" stroke="#a13a1a" stroke-width="3"/></g>
    </g>`;
  }

  function nest() {
    let twigs = '';
    for (let i = 0; i < 16; i++) {
      const x = R(-70, 50), y = R(-6, 22);
      twigs += `<path d="M${f(x)} ${f(y)} q${f(R(10, 20))} ${f(R(-6, 6))} ${f(R(26, 42))} ${f(R(-4, 4))}" stroke="${rnd() > .5 ? '#7a4a24' : '#a8723e'}" stroke-width="${f(R(2.5, 4.5))}" fill="none" stroke-linecap="round"/>`;
    }
    return { back: `<ellipse cx="0" cy="0" rx="74" ry="18" fill="#5e3618"/>`,
      front: `<path d="M-78 -2 C -74 34 74 34 78 -2 C 60 10 -60 10 -78 -2Z" fill="#8a5a2e"/>${twigs}` };
  }

  /* ---------- שן ---------- */
  function tooth(a, o = {}) {
    return `<g data-a="${a}">
      <path d="M-42 -52 C -42 -74 -16 -76 0 -62 C 16 -76 42 -74 42 -52 C 46 -20 38 10 32 32 C 27 52 21 72 12 72 C 4 72 4 42 0 42 C -4 42 -4 72 -12 72 C -21 72 -27 52 -32 32 C -38 10 -46 -20 -42 -52Z"
        fill="url(#gTooth)" stroke="#bccbdb" stroke-width="3"/>
      <path d="M-28 -56 C -34 -36 -32 -10 -24 10" stroke="#fff" stroke-width="8" stroke-linecap="round" fill="none" opacity=".9"/>
      ${face(a, { y: -18, s: o.s || 1.05, gap: 15, mouth: o.mouth || 'smile' })}
    </g>`;
  }

  /* ---------- ארנב ---------- */
  function rabbit(a) {
    return `<g data-a="${a}">
      <circle cx="58" cy="96" r="20" fill="#fff"/>
      <ellipse cx="0" cy="80" rx="64" ry="72" fill="url(#gRabbit)"/>
      <ellipse cx="0" cy="96" rx="38" ry="48" fill="#fff"/>
      <ellipse cx="-36" cy="152" rx="30" ry="14" fill="#f4f0f6" stroke="#d8cfe2" stroke-width="2"/><ellipse cx="36" cy="152" rx="30" ry="14" fill="#f4f0f6" stroke="#d8cfe2" stroke-width="2"/>
      <g data-a="${a}-collar" opacity="0"><path d="M-36 14 Q0 32 36 14" stroke="#e8344d" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M0 30 c-8 -10 -20 0 -10 10 l10 9 10 -9 c10 -10 -2 -20 -10 -10z" fill="url(#gGold)" stroke="#a8721a" stroke-width="1.6"/></g>
      <g data-a="${a}-ears">
        <g class="ears" style="--d:-1s"><path d="M-30 -60 C -50 -120 -44 -190 -22 -196 C -2 -190 -2 -120 -12 -62Z" fill="url(#gRabbit)" stroke="#d8cfe2" stroke-width="2"/>
          <path d="M-26 -72 C -38 -120 -34 -170 -22 -178 C -12 -170 -12 -120 -16 -74Z" fill="#ffb8c8"/></g>
        <g class="ears" style="--d:-3.2s"><path d="M30 -60 C 50 -120 44 -190 22 -196 C 2 -190 2 -120 12 -62Z" fill="url(#gRabbit)" stroke="#d8cfe2" stroke-width="2"/>
          <path d="M26 -72 C 38 -120 34 -170 22 -178 C 12 -170 12 -120 16 -74Z" fill="#ffb8c8"/></g>
      </g>
      <ellipse cx="0" cy="-26" rx="62" ry="54" fill="url(#gRabbit)"/>
      <ellipse cx="-34" cy="-10" rx="11" ry="6.5" fill="#ff8fa6" opacity=".55"/><ellipse cx="34" cy="-10" rx="11" ry="6.5" fill="#ff8fa6" opacity=".55"/>
      <g data-a="${a}-eyes"><g class="blink" style="--d:-2.2s">
        <ellipse cx="-22" cy="-34" rx="8.5" ry="11" fill="${INK}"/><ellipse cx="22" cy="-34" rx="8.5" ry="11" fill="${INK}"/>
        <circle cx="-19" cy="-38" r="3.4" fill="#fff"/><circle cx="25" cy="-38" r="3.4" fill="#fff"/><circle cx="-24" cy="-29" r="1.5" fill="#fff"/><circle cx="20" cy="-29" r="1.5" fill="#fff"/></g></g>
      <g data-a="${a}-happy" opacity="0" stroke="${INK}" stroke-width="3.4" fill="none" stroke-linecap="round"><path d="M-30 -32 Q-22 -42 -14 -32 M14 -32 Q22 -42 30 -32"/></g>
      <g class="nose"><path d="M-7 -16 h14 l-7 7z" fill="#ff7f99"/></g>
      <path d="M0 -9 v6 M0 -3 q-6 6 -12 2 M0 -3 q6 6 12 2" stroke="${INK}" stroke-width="2.3" fill="none" stroke-linecap="round"/>
      <g data-a="${a}-teeth"><rect x="-8" y="0" width="7.6" height="13" rx="2" fill="#fff" stroke="#c9c0d6" stroke-width="1.6"/><rect x="0.4" y="0" width="7.6" height="13" rx="2" fill="#fff" stroke="#c9c0d6" stroke-width="1.6"/></g>
      <g data-a="${a}-chew" opacity="0"><ellipse cx="0" cy="4" rx="9" ry="6" fill="#6b1f1f"/><rect x="-6" y="-1" width="5.6" height="7" rx="1.5" fill="#fff"/><rect x="0.4" y="-1" width="5.6" height="7" rx="1.5" fill="#fff"/></g>
      <g stroke="#a99bb8" stroke-width="1.6" opacity=".8"><path d="M-30 -10 h-34 M-30 -4 l-32 8 M30 -10 h34 M30 -4 l32 8"/></g>
    </g>`;
  }

  /* ---------- פריטים קטנים ---------- */
  function star(x, y, r, fill = '#ffd34d', cls = '', style = '') {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const ang = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r;
      pts.push(`${f(x + Math.cos(ang) * rr)},${f(y + Math.sin(ang) * rr)}`);
    }
    return `<polygon class="${cls}" style="${style}" points="${pts.join(' ')}" fill="${fill}" stroke-linejoin="round"/>`;
  }
  function sparkle(x, y, r, fill = '#fff', cls = 'twinkle', d = 0) {
    return `<path class="${cls}" style="--d:${f(d)}s" d="M${x} ${y - r} C ${x + r * .18} ${y - r * .18} ${x + r * .18} ${y - r * .18} ${x + r} ${y} C ${x + r * .18} ${y + r * .18} ${x + r * .18} ${y + r * .18} ${x} ${y + r} C ${x - r * .18} ${y + r * .18} ${x - r * .18} ${y + r * .18} ${x - r} ${y} C ${x - r * .18} ${y - r * .18} ${x - r * .18} ${y - r * .18} ${x} ${y - r}Z" fill="${fill}"/>`;
  }
  function heart(x, y, s, fill = '#ff5d7a') {
    return `<path transform="translate(${x} ${y}) scale(${s})" d="M0 8 C -14 -2 -14 -16 -6 -18 C -2 -19 0 -15 0 -13 C 0 -15 2 -19 6 -18 C 14 -16 14 -2 0 8Z" fill="${fill}"/>`;
  }
  function note(x, y, s, fill = '#5b3a8c') {
    return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="-6" cy="10" rx="7" ry="5" fill="${fill}" transform="rotate(-20 -6 10)"/><path d="M0 9 V-16 Q8 -12 12 -4" stroke="${fill}" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
  }
  function dizzyStars(a, cx, cy, rx = 46) {
    let s = '';
    for (let i = 0; i < 4; i++) {
      const ang = i * Math.PI / 2;
      s += star(f(Math.cos(ang) * rx), f(Math.sin(ang) * rx), 9, i % 2 ? '#ffd34d' : '#fff27a');
    }
    return `<g data-a="${a}" opacity="0" transform="translate(${cx} ${cy}) scale(1 .38)"><g class="spin" style="--t:1.4s">${s}</g></g>`;
  }
  function bubble(a, x, y, w, h, inner, o = {}) {
    const tail = o.tail || 'left';
    const tx = tail === 'left' ? -w / 2 + 24 : w / 2 - 24;
    return `<g data-a="${a}" opacity="0" transform="translate(${x} ${y})"><g data-a="${a}-in">
      <path d="M${-w / 2 + 20} ${-h / 2} H${w / 2 - 20} Q${w / 2} ${-h / 2} ${w / 2} ${-h / 2 + 20} V${h / 2 - 20} Q${w / 2} ${h / 2} ${w / 2 - 20} ${h / 2}
        H${tx + 14} L${tx - (tail === 'left' ? 16 : -16)} ${h / 2 + 26} L${tx - 4} ${h / 2} H${-w / 2 + 20} Q${-w / 2} ${h / 2} ${-w / 2} ${h / 2 - 20} V${-h / 2 + 20} Q${-w / 2} ${-h / 2} ${-w / 2 + 20} ${-h / 2}Z"
        fill="#fff" stroke="${o.stroke || '#2b1a12'}" stroke-width="3.5" stroke-linejoin="round"/>
      ${inner}</g></g>`;
  }
  function thought(a, x, y, rx, ry, inner, toward = [-60, 60]) {
    return `<g data-a="${a}" opacity="0" transform="translate(${x} ${y})"><g data-a="${a}-in">
      <circle cx="${toward[0] * .55}" cy="${ry + 16}" r="11" fill="#fff" stroke="#2b1a12" stroke-width="3"/>
      <circle cx="${toward[0] * .85}" cy="${ry + 40}" r="7" fill="#fff" stroke="#2b1a12" stroke-width="3"/>
      <path d="M${-rx} 0 C ${-rx} ${-ry * 1.2} ${-rx * .3} ${-ry * 1.3} 0 ${-ry} C ${rx * .3} ${-ry * 1.4} ${rx} ${-ry * 1.1} ${rx} 0 C ${rx * 1.15} ${ry * .9} ${rx * .3} ${ry * 1.25} 0 ${ry} C ${-rx * .4} ${ry * 1.3} ${-rx * 1.15} ${ry * .9} ${-rx} 0Z"
        fill="#fff" stroke="#2b1a12" stroke-width="3.5"/>
      ${inner}</g></g>`;
  }
  function burst(a, x, y, r, fill = '#ffd34d', text = '', o = {}) {
    const pts = [];
    const n = 14;
    for (let i = 0; i < n * 2; i++) {
      const ang = i * Math.PI / n, rr = i % 2 ? r * .62 : r * (0.9 + (i % 4 === 0 ? .15 : 0));
      pts.push(`${f(Math.cos(ang) * rr)},${f(Math.sin(ang) * rr)}`);
    }
    return `<g data-a="${a}" opacity="0" transform="translate(${x} ${y})"><g data-a="${a}-in">
      <polygon points="${pts.join(' ')}" fill="${fill}" stroke="${o.stroke || '#c2410c'}" stroke-width="4" stroke-linejoin="round"/>
      ${text ? `<text class="fx" x="0" y="${r * .2}" text-anchor="middle" font-size="${o.fs || r * .55}" fill="${o.color || '#c2410c'}">${text}</text>` : ''}
    </g></g>`;
  }

  return { defs, face, drips, carrot, cabbage, tomato, cucumber, onion, eggplant, crown, kingfisher, fishShape, child, cat,
    momBird, chick, nest, tooth, rabbit, star, sparkle, heart, note, dizzyStars, bubble, thought, burst, R, rnd, f, INK };
})();
