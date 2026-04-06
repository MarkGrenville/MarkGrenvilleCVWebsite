#!/bin/bash
set -euo pipefail

PROJECT="cv-mark-grenville"
SITE_URL="https://${PROJECT}.web.app"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$ROOT_DIR"

echo ""
echo "╔═══════════════════════════════════════════╗"
echo "║   CV Mark Grenville — Deploy to Firebase  ║"
echo "╚═══════════════════════════════════════════╝"
echo ""

# ── 1. Verify Firebase project ──────────────────────────────
echo "→ Selecting Firebase project: $PROJECT"
firebase use "$PROJECT"
echo ""

# ── 2. Sync secrets from .env ────────────────────────────────
if [ -f .env ]; then
  echo "→ Syncing secrets from .env …"
  while IFS= read -r line || [ -n "$line" ]; do
    [[ -z "$line" || "$line" =~ ^[[:space:]]*# ]] && continue
    key="${line%%=*}"
    value="${line#*=}"
    [ -z "$key" ] && continue
    echo "  • $key"
    printf '%s' "$value" | firebase functions:secrets:set "$key" \
      --project "$PROJECT" --data-file - --force || {
      echo "    ⚠ Could not set $key automatically."
      echo "    Run manually: firebase functions:secrets:set $key --project $PROJECT"
    }
  done < .env
  echo ""
else
  echo "→ No .env file found — skipping secrets."
  echo "  To set secrets, create a .env file or run:"
  echo "  firebase functions:secrets:set ANTHROPIC_API_KEY --project $PROJECT"
  echo ""
fi

# ── 3. Build SvelteKit ──────────────────────────────────────
echo "→ Building SvelteKit …"
pnpm build
echo ""

# ── 4. Merge prerendered pages into hosting public dir ──────
if [ -d build/prerendered ]; then
  echo "→ Copying prerendered pages to hosting …"
  cp -r build/prerendered/* build/client/ 2>/dev/null || true
  echo ""
fi

# ── 5. Prepare Cloud Function ────────────────────────────────
echo "→ Preparing Cloud Function …"
rm -rf functions/build
cp -r build functions/build
(cd functions && npm install --omit=dev --silent)
echo ""

# ── 6. Deploy to Firebase ───────────────────────────────────
echo "→ Deploying hosting + functions + firestore rules …"
firebase deploy --project "$PROJECT"
echo ""

# ── 7. Done — print URL ─────────────────────────────────────
echo "╔═══════════════════════════════════════════╗"
echo "║            Deploy complete!               ║"
echo "╠═══════════════════════════════════════════╣"
echo "║                                           ║"
echo "║  $SITE_URL  ║"
echo "║                                           ║"
echo "╚═══════════════════════════════════════════╝"
echo ""
