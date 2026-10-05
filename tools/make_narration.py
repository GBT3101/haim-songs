#!/usr/bin/env python3
"""Generate the storyteller narration for the site (Microsoft "Hila" voice).

Reads every song title and stanza straight from index.html and writes one
MP3 per clip to assets/audio/, plus assets/audio/narration.json, which the
player uses to know each clip's length.

    pip install edge-tts
    python3 tools/make_narration.py

Re-running regenerates everything; edit VOICE / RATE / SPEAK below to tune.
"""
import asyncio
import html
import json
import os
import pathlib
import re

import certifi

# Behind a TLS-inspecting proxy, trust the CA bundle given in SSL_CERT_FILE.
if os.environ.get('SSL_CERT_FILE'):
    certifi.where = lambda: os.environ['SSL_CERT_FILE']

import edge_tts  # noqa: E402  (must come after the certifi override)

VOICE = 'he-IL-HilaNeural'
RATE = '-10%'          # a little slower than default — storyteller pace
PITCH = '+0Hz'
BITRATE = 48_000       # edge-tts default: audio-24khz-48kbitrate-mono-mp3 (CBR)

# Words the voice should say differently from how they are written.
SPEAK = {
    'אממ אָאמ אממ': 'אַם... אָאַם... אַם...',
    'שְׁשְׁשְׁשְׁשְׁ': 'שְׁשְׁשְׁשְׁשְׁשְׁ...',
    'הָדוּר. אוֹ': 'הָדוּר, אוֹ',        # a breath, not a full stop, mid-sentence
    'רֶגַע. שֶׁל': 'רֶגַע, שֶׁל',
}

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'audio'


def clean(text):
    return html.unescape(re.sub(r'<[^>]+>', '', text)).strip()


def speakable(lines):
    """Join a stanza's lines into one sentence with a short pause per line."""
    parts = []
    for line in lines:
        line = re.sub(r'(?<!\.)\.\.(?!\.)', '…', line.replace('"', '').strip())
        for written, said in SPEAK.items():
            line = line.replace(written, said)
        if line[-1] not in '.!?,…':
            line += ','
        parts.append(line)
    parts[-1] = parts[-1].rstrip(',') + ('' if parts[-1][-1] in '.!?…' else '.')
    return ' '.join(parts)


def clips_from_page():
    page = (ROOT / 'index.html').read_text(encoding='utf-8')
    clips = [('hero', 'מֵאֵת חַיִּים אָבִיטָן.')]
    for sec in re.finditer(r'<section class="song" id="(\w+)".*?</section>', page, re.S):
        song_id, body = sec.group(1), sec.group(0)
        title = clean(re.search(r'<h2 class="intro__title"[^>]*>(.*?)</h2>', body, re.S).group(1))
        clips.append((f'{song_id}-0', title + '.'))
        for n, stanza in enumerate(re.findall(r'<p class="stanza">(.*?)</p>', body, re.S), start=1):
            lines = [clean(l) for l in re.findall(r'<span class="line">(.*?)</span>', stanza, re.S)]
            clips.append((f'{song_id}-{n}', speakable(lines)))
    return clips


async def main():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = {'voice': VOICE, 'rate': RATE, 'clips': {}}
    for clip_id, text in clips_from_page():
        path = OUT / f'{clip_id}.mp3'
        await edge_tts.Communicate(text, VOICE, rate=RATE, pitch=PITCH).save(str(path))
        dur = round(path.stat().st_size * 8 / BITRATE, 2)
        manifest['clips'][clip_id] = {'file': path.name, 'dur': dur, 'text': text}
        print(f'{clip_id:14} {dur:5.1f}s  {text}')
    (OUT / 'narration.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=1), encoding='utf-8')
    print(f'\n{len(manifest["clips"])} clips written to {OUT}')


if __name__ == '__main__':
    asyncio.run(main())
