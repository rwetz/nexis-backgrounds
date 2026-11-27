#!/usr/bin/env bash
# Re-encode occult-dioramas loops for the library: 1600x1000, H.264 CRF 30,
# faststart, no audio, plus a 480x300 poster. Usage:
#   scripts/encode.sh <occult-dioramas/videos> <id> <version>
set -euo pipefail
src="$1/$2.mp4"; out="backgrounds/$2/$3"
mkdir -p "$out"
ffmpeg -v error -y -i "$src" -vf scale=1600:1000:flags=lanczos -c:v libx264 -preset slow -crf 30 \
  -pix_fmt yuv420p -profile:v high -movflags +faststart -an "$out/loop.mp4"
ffmpeg -v error -y -ss 12 -i "$src" -frames:v 1 -vf scale=480:300:flags=lanczos -q:v 4 "$out/poster.jpg"
