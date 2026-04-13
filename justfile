set windows-shell := ["powershell.exe", "-NoLogo", "-Command"]

# Pre-pack: sync root VERSION -> install-root + package.json, verify payload, run npm test.
pack-prep:
  node lib/pack-prep.mjs
