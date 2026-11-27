// Writes index.json from scenes.json (names, collections, blurbs) and the
// newest backgrounds/<id>/<version>/loop.mp4 on disk, with each loop's byte
// count and SHA-256. Nexis refuses a download that doesn't match both.
//
//   node scripts/build-index.mjs
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const cmp = (a, b) => {
  const pa = a.split(".").map(Number), pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
};

const scenes = JSON.parse(readFileSync("scenes.json", "utf8"));
const backgrounds = [];
for (const col of scenes.collections) {
  for (const s of col.scenes) {
    const dir = join("backgrounds", s.id);
    if (!existsSync(dir)) {
      console.warn(`skip ${s.id}: no backgrounds/${s.id}`);
      continue;
    }
    const versions = readdirSync(dir).filter((v) => /^\d+\.\d+\.\d+$/.test(v)).sort(cmp);
    const version = versions.at(-1);
    const path = `backgrounds/${s.id}/${version}`;
    const loop = join(path, "loop.mp4");
    if (!existsSync(loop) || !existsSync(join(path, "poster.jpg"))) throw new Error(`${path}: loop.mp4 or poster.jpg missing`);
    const buf = readFileSync(loop);
    backgrounds.push({
      id: s.id,
      name: s.title,
      version,
      collection: col.title,
      description: s.blurb,
      kind: "video",
      path,
      bytes: statSync(loop).size,
      sha256: createHash("sha256").update(buf).digest("hex"),
    });
  }
}
writeFileSync("index.json", `${JSON.stringify({ format: 1, backgrounds }, null, 2)}\n`);
console.log(`index.json: ${backgrounds.length} backgrounds`);
