set windows-shell := ["powershell.exe", "-NoLogo", "-Command"]

# Pre-pack: sync root VERSION -> install-root + package.json, verify payload, run npm test.
pack-prep:
  node lib/pack-prep.mjs

# Manual Beta1 install into the sparkitTest sandbox repo (persistent path).
sparkittest:
  node bin/spar-kit.mjs install C:/Users/jedde/GithubRepos/sparkitTest
