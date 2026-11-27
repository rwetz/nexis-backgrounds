<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/brand/heptagram-white.svg">
    <img src="docs/brand/heptagram-black.svg" alt="heptagram" width="96">
  </picture>
</p>

<h1 align="center">Nexis backgrounds</h1>

<p align="center">
  The welcome-screen background library for <a href="https://github.com/rwetz/Nexis">Nexis</a>: backgrounds are video, not code.
</p>

Nexis reads `index.json` from this repository's `main` branch. In Nexis,
**Settings → Themes → Welcome screen → Browse more backgrounds** lists what is
here, and downloads, updates and removes backgrounds on this computer. Ward
and Dark Veil ship inside Nexis, so the welcome screen works offline.

Every background here is a seamless loop of a tilt-shift ASCII diorama: a
small 3D world drawn entirely as coloured monospace glyphs, with the camera
sweeping slowly across it.

| Collection | Backgrounds |
|---|---|
| Rites & Thresholds | The Red Circle, Witch Hollow, Crossroads, Fairy Ring, Fox Gates |
| Graves & Barrows | Ossuary Hill, Winter Barrow, Black Abbey |
| Drowned Places | Wisp Fen, Drowned Light, Sunken Idol |
| Visitations | Fallen Star, Plague Pyre |
| Heptagram | Hepta Monolith, Hepta Sigil |

## A background is data

A background is `loop.mp4` (1600x1000, H.264, no audio, about 10 MB) plus
`poster.jpg` (480x300). Nexis plays the loop in a muted `<video>`; nothing in
this repository runs as code. Before Nexis keeps a download it checks the
byte count and SHA-256 that `index.json` lists for it, and that the file is
an MP4.

## Layout

```
index.json                         every background, its newest version and where it is
scenes.json                        names, collections and blurbs (from occult-dioramas)
backgrounds/<id>/<version>/
  loop.mp4                         the loop
  poster.jpg                       the picker's thumbnail
scripts/encode.sh                  re-encodes a rendered loop and cuts its poster
scripts/build-index.mjs            writes index.json, with sizes and checksums
```

Each version gets its own folder and is never edited after it's published,
so the checksum in the index always describes the file at that path.

## index.json

```json
{
  "format": 1,
  "backgrounds": [
    { "id": "wisp-fen", "name": "Wisp Fen", "version": "1.0.0", "collection": "Drowned Places",
      "description": "…", "kind": "video", "path": "backgrounds/wisp-fen/1.0.0",
      "bytes": 22672919, "sha256": "…" }
  ]
}
```

## Adding or updating a background

1. Render the loop in occult-dioramas: `npm run loops -- <scene>` writes `videos/<scene>.mp4`.
2. Here: `scripts/encode.sh ../occult-dioramas/videos <scene> <version>`. A new version of
   an existing background gets a new version folder.
3. Add the scene to `scenes.json` if it's new, then `node scripts/build-index.mjs`.
4. Commit. Pushing `main` publishes to every Nexis.

## Credits

The dioramas are built on the [ascii-diorama](https://github.com/JDhruv14/ascii-diorama)
starter (MIT, JDhruv14). Textures are from [Poly Haven](https://polyhaven.com), CC0. No
models are used: figures, stones and buildings are generated geometry.
