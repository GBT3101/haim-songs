/* =========================================================
   ספר להדפסה — דף A4 לכל שיר, כריכה וגב
   מצלם את רגע השיא של כל שיר מתוך האתר עצמו, בונה את print/book.html
   ומדפיס ממנו קובצי PDF.

   הרצה (מתיקיית השורש של המאגר):
     python3 -m http.server 8765 &
     node tools/make_book.mjs
   ========================================================= */
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); }
catch { ({ chromium } = require(execSync('npm root -g').toString().trim() + '/playwright')); }

const BASE = process.env.SITE_URL || 'http://localhost:8765/';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'print');
const FRAMES = path.join(OUT, 'frames');
const PDFS = path.join(OUT, 'pdf');
[OUT, FRAMES, PDFS].forEach((d) => mkdirSync(d, { recursive: true }));

// A4 ב־96dpi, מצולם פי 3 (~290dpi בהדפסה)
const VIEW = { width: 794, height: 1123 };
const SCALE = 3;

// רגע השיא של כל שיר: [פעימה, שניות מתחילתה]
const PEAK = {
  salad: [7, 9.0],       // הסלט מוכן, אמא מערבבת, נצנוצים
  eggplant: [5, 10.0],   // החציל קופץ לסיר
  kingfisher: [4, 3.0],  // השלדג ממריא עם הדג
  noblebird: [3, 2.1],   // אמא ציפור נועצת מקור — טוק!
  tooth: [4, 11.5],      // קשת, מדליה וקונפטי
  rabbit: [4, 9.5],      // הופ!
};
const BACK = ['rabbit', 4, 21.9];
// היכן מתחיל כרטיס המילים (מ"מ מראש הדף) — מתחת לאיור
const CARD_TOP = { salad: 146, eggplant: 160, kingfisher: 150, noblebird: 156, tooth: 148, rabbit: 160 }; // הווילון יורד — לגב הספר

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: VIEW, deviceScaleFactor: SCALE });
await page.goto(BASE + 'index.html');
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(2500);

/* ---------- מילים וצבעים — ישירות מהאתר ---------- */
const songs = await page.evaluate(() => Array.from(document.querySelectorAll('.song')).map((sec) => {
  const cs = getComputedStyle(sec);
  const v = (n) => cs.getPropertyValue(n).trim();
  return {
    id: sec.id,
    title: sec.querySelector('.card__head').textContent.trim(),
    stanzas: Array.from(sec.querySelectorAll('.stanza')).map((s) =>
      Array.from(s.querySelectorAll('.line')).map((l) => l.textContent.trim())),
    theme: { bg: v('--bg'), accent: v('--accent'), title: v('--title'), sh: v('--title-sh'), sh2: v('--title-sh2'), card: v('--card-bg') },
  };
}));
const icons = await page.evaluate(() => Object.fromEntries(
  Array.from(document.querySelectorAll('.medal')).map((m) => [m.getAttribute('href').slice(1), m.querySelector('.medal__disc').innerHTML])));
const defs = await page.evaluate(() => ART.defs());

/* ---------- צילום הכריכה (השער של האתר) ---------- */
await page.addStyleTag({ content: `
  .play-btn, .hero__scroll, .autoplay, [class*="narr"] { display: none !important; }
  .card, .intro, .song::before { display: none !important; }
  .js .actors { bottom: 45% !important; }
  html { scroll-behavior: auto !important; }` });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(800);
await page.locator('.hero__stage').screenshot({ path: path.join(FRAMES, 'cover.jpg'), type: 'jpeg', quality: 92 });

/* ---------- צילום רגעי השיא ---------- */
await page.evaluate(() => {
  ScrollTrigger.getAll().forEach((s) => s.kill(false, true));
  document.querySelectorAll('.song').forEach((s) => s.classList.add('is-live'));
  document.querySelectorAll('.backdrop').forEach((b) => gsap.set(b, { yPercent: 0 }));
});
const shoot = async (id, beat, off, file) => {
  await page.evaluate(([id, beat, off]) => {
    const r = SONG_TIMELINES.find((x) => x.sec.id === id);
    r.tl.time(r.tl.labels['b' + beat] + off, false);
  }, [id, beat, off]);
  await page.waitForTimeout(250);
  await page.locator(`#${id} .stage`).screenshot({ path: path.join(FRAMES, file), type: 'jpeg', quality: 92 });
};
for (const s of songs) await shoot(s.id, ...PEAK[s.id], s.id + '.jpg');
await shoot(...BACK, 'back.jpg');

/* ---------- בניית הספר ---------- */
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const songPage = (s, i) => {
  const t = s.theme;
    return `
  <section class="page song" id="${s.id}" style="--top:${CARD_TOP[s.id] || 160}mm;--bg:${t.bg};--accent:${t.accent};--title:${t.title};--sh:${t.sh};--sh2:${t.sh2};--card:${t.card}">
    <img class="art" src="frames/${s.id}.jpg" alt="">
    <article class="card">
      <h2 class="card__title">${esc(s.title)}</h2>
      <div class="card__rule"><span></span><i>${icons[s.id] || ''}</i><span></span></div>
      <div class="lyrics"><div class="lyrics__in">
        ${s.stanzas.map((st) => `<p class="stanza">${st.map((l) => `<span class="line">${esc(l)}</span>`).join('')}</p>`).join('\n        ')}
      </div></div>
    </article>
    <div class="folio">${i + 1}</div>
  </section>`;
};

const html = `<!doctype html>
<html lang="he" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>מאת: חיים אביטן — ספר שירים להדפסה</title>
<style>
@font-face { font-family: 'Frank Ruhl Libre'; font-weight: 500; src: url(../assets/fonts/frank-ruhl-libre-hebrew-500-normal.woff2) format('woff2'); unicode-range: U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F; }
@font-face { font-family: 'Frank Ruhl Libre'; font-weight: 500; src: url(../assets/fonts/frank-ruhl-libre-latin-500-normal.woff2) format('woff2'); unicode-range: U+0000-00FF, U+2000-206F; }
@font-face { font-family: 'Frank Ruhl Libre'; font-weight: 700; src: url(../assets/fonts/frank-ruhl-libre-hebrew-700-normal.woff2) format('woff2'); unicode-range: U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F; }
@font-face { font-family: 'Suez One'; src: url(../assets/fonts/suez-one-hebrew-400-normal.woff2) format('woff2'); unicode-range: U+0307-0308, U+0590-05FF, U+200C-2010, U+20AA, U+25CC, U+FB1D-FB4F; }
@font-face { font-family: 'Suez One'; src: url(../assets/fonts/suez-one-latin-400-normal.woff2) format('woff2'); unicode-range: U+0000-00FF, U+2000-206F; }

@page { size: A4; margin: 0; }
:root { --ink: #2b1a10; --serif: 'Frank Ruhl Libre', serif; --display: 'Suez One', serif; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: #8d8478; color: var(--ink); }
body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { position: relative; width: 210mm; height: 297mm; overflow: hidden; margin: 10mm auto; background: var(--bg, #fffaf0);
  box-shadow: 0 10px 40px rgba(0,0,0,.35); break-after: page; page-break-after: always; }
@media print { html, body { background: none; } .page { margin: 0; box-shadow: none; } }
.art { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }

/* ----- דף שיר ----- */
.card { position: absolute; left: 13mm; right: 13mm; bottom: 14mm; top: var(--top, 160mm); z-index: 2;
  display: flex; flex-direction: column; align-items: center;
  padding: 6mm 10mm 7mm; border-radius: 9mm;
  background: radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,.75), transparent 60%), var(--card);
  box-shadow: inset 0 1.5px 0 rgba(255,255,255,.85), 0 9mm 16mm -7mm rgba(30,12,0,.5), 0 3mm 5mm -2mm rgba(30,12,0,.3); }
.card::after { content: ''; position: absolute; inset: 2.6mm; border-radius: 7mm; border: 1.6px dashed var(--accent); opacity: .38; pointer-events: none; }
.card__title { margin: 0; font-family: var(--display); font-weight: 400; line-height: 1.15; text-align: center;
  font-size: 13mm; color: var(--title);
  text-shadow: 0 .04em 0 var(--sh), .03em .03em 0 var(--sh), -.03em .03em 0 var(--sh), 0 .08em 0 var(--sh2), 0 .13em .1em rgba(0,0,0,.22); }
.card__rule { display: flex; align-items: center; gap: 3mm; width: 62%; margin: .5mm 0 2.5mm; color: var(--accent); }
.card__rule span { flex: 1; height: 1.4px; background: linear-gradient(90deg, transparent, var(--accent)); opacity: .6; }
.card__rule span:last-child { transform: scaleX(-1); }
.card__rule i { width: 7.5mm; height: 7.5mm; display: grid; place-items: center; }
.card__rule i svg { width: 100%; height: 100%; }
.lyrics { flex: 1; width: 100%; min-height: 0; display: flex; align-items: center; justify-content: center; overflow: hidden;
  font-family: var(--serif); font-weight: 500; text-align: center; line-height: 1.5; font-size: var(--fs, 6mm); }
.lyrics__in { flex: none; }
.lyrics--two { display: flex; flex-direction: row; align-items: center; gap: 7mm; }
.lyrics--two .col { flex: none; }
.lyrics--two .divider { width: 1.4px; align-self: stretch; background: linear-gradient(transparent, var(--accent), transparent); opacity: .35; }
.stanza { margin: 0 0 .75em; break-inside: avoid; }
.stanza:last-child { margin-bottom: 0; }
.line { display: block; white-space: nowrap; }
.folio { position: absolute; bottom: 5.5mm; left: 0; right: 0; text-align: center; z-index: 3;
  font-family: var(--display); font-size: 4.2mm; color: var(--accent); }
.folio::before, .folio::after { content: '•'; margin: 0 2mm; opacity: .6; }
.folio { color: #fffaf0; text-shadow: 0 .5px 2px rgba(0,0,0,.5); }

/* ----- כריכה ----- */
.cover .art { object-position: 50% 50%; }
.cover__tag { position: absolute; z-index: 2; left: 0; right: 0; top: 183mm; text-align: center;
  font-family: var(--display); font-size: 8mm; color: #8a3a1c; letter-spacing: .02em; }
.cover__tag small { display: block; font-family: var(--serif); font-size: 5mm; color: #7a5a3a; margin-top: 2mm; }

/* ----- גב ----- */
.back__panel { position: absolute; z-index: 2; left: 34mm; right: 34mm; top: 62mm;
  padding: 12mm 12mm 11mm; border-radius: 9mm; text-align: center;
  background: radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,.8), transparent 60%), #fffaf2;
  box-shadow: 0 10mm 20mm -6mm rgba(0,0,0,.6); }
.back__panel::after { content: ''; position: absolute; inset: 2.6mm; border-radius: 7mm; border: 1.6px dashed #b0263a; opacity: .38; }
.back__by { font-family: var(--display); font-size: 12mm; line-height: 1.2; color: #ffe7a3; margin: 0 0 2mm;
  text-shadow: 0 .04em 0 #b0263a, .03em .03em 0 #b0263a, -.03em .03em 0 #b0263a, 0 .08em 0 #4f0b16, 0 .13em .1em rgba(0,0,0,.25); }
.back__sub { font-family: var(--serif); font-size: 5.2mm; color: #6b3a2a; margin: 0 0 7mm; }
.toc { list-style: none; margin: 0; padding: 0; font-family: var(--serif); font-weight: 500; font-size: 6.4mm; }
.toc li { display: flex; align-items: center; gap: 4mm; padding: 2.1mm 0; border-bottom: 1px dotted rgba(176,38,58,.3); }
.toc li:last-child { border-bottom: 0; }
.toc .ic { width: 11mm; height: 11mm; flex: none; }
.toc .ic svg { width: 100%; height: 100%; }
.toc .nm { flex: 1; text-align: right; }
.toc .pg { font-family: var(--display); color: #b0263a; font-size: 5.2mm; }
</style>
</head>
<body>
${defs}
  <section class="page cover" id="cover" style="--bg:#f7ecd6">
    <img class="art" src="frames/cover.jpg" alt="">
    <div class="cover__tag">שִׁירֵי יְלָדִים<small>שִׁשָּׁה שִׁירִים מְאֻיָּרִים</small></div>
  </section>
${songs.map(songPage).join('\n')}
  <section class="page back" id="back" style="--bg:#1d1030">
    <img class="art" src="frames/back.jpg" alt="">
    <div class="back__panel">
      <p class="back__by">מאת: חיים אביטן</p>
      <p class="back__sub">שִׁירֵי יְלָדִים</p>
      <ol class="toc">
        ${songs.map((s, i) => `<li><span class="ic">${icons[s.id] || ''}</span><span class="nm">${esc(s.title)}</span><span class="pg">${i + 1}</span></li>`).join('\n        ')}
      </ol>
    </div>
  </section>
<script>
  // מכווץ את גודל המילים עד שכל השיר נכנס בכרטיס
  (async () => {
    await document.fonts.ready;
    document.querySelectorAll('.lyrics').forEach((ly) => {
      const inn = ly.firstElementChild;
      const st = Array.from(inn.children);
      const fit = () => {
        let lo = 3, hi = 8.5;
        for (let k = 0; k < 18; k++) {
          const mid = (lo + hi) / 2;
          ly.style.setProperty('--fs', mid + 'mm');
          if (inn.offsetHeight <= ly.clientHeight && inn.offsetWidth <= ly.clientWidth) lo = mid; else hi = mid;
        }
        return lo;
      };
      const one = fit();
      // ניסיון בשני טורים (הימני קודם), מחולקים לפי מספר השורות
      const total = st.reduce((n, s) => n + s.children.length, 0);
      const a = document.createElement('div'), b = document.createElement('div'), d = document.createElement('div');
      a.className = b.className = 'col'; d.className = 'divider';
      let n = 0;
      st.forEach((s) => { (n + s.children.length / 2 <= total / 2 ? a : b).appendChild(s); n += s.children.length; });
      inn.append(a, d, b); inn.classList.add('lyrics--two');
      const two = fit();
      if (two < one * 1.12) { inn.classList.remove('lyrics--two'); inn.replaceChildren(...st); }
      ly.style.setProperty('--fs', (Math.max(one, two < one * 1.12 ? 0 : two) * .97).toFixed(2) + 'mm');
    });
    document.body.dataset.ready = '1';
  })();
</script>
</body>
</html>
`;
writeFileSync(path.join(OUT, 'book.html'), html);

/* ---------- הדפסה ל־PDF ---------- */
const pdfPage = await browser.newPage();
await pdfPage.goto(BASE + 'print/book.html');
await pdfPage.waitForSelector('body[data-ready="1"]');
await pdfPage.emulateMedia({ media: 'print' });
const opts = { format: 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 }, preferCSSPageSize: true };
await pdfPage.pdf({ ...opts, path: path.join(OUT, 'haim-songs-book.pdf') });
const ids = ['cover', ...songs.map((s) => s.id), 'back'];
for (let i = 0; i < ids.length; i++) {
  await pdfPage.pdf({ ...opts, pageRanges: String(i + 1), path: path.join(PDFS, `${String(i).padStart(2, '0')}-${ids[i]}.pdf`) });
}
await browser.close();
console.log('done:', ids.length, 'pages');
