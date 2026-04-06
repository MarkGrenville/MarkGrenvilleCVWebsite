#!/bin/bash
set -euo pipefail

EXPECTED_PROJECT="cv-mark-grenville"
CURRENT_PROJECT=$(firebase use --json 2>/dev/null | grep -o '"result":"[^"]*"' | cut -d'"' -f4)

if [ "$CURRENT_PROJECT" != "$EXPECTED_PROJECT" ]; then
  echo "ERROR: Active Firebase project is '$CURRENT_PROJECT', expected '$EXPECTED_PROJECT'"
  echo "Run: firebase use $EXPECTED_PROJECT"
  exit 1
fi

echo "Building SvelteKit..."
pnpm build

echo "Deploying to Firebase ($EXPECTED_PROJECT)..."
firebase deploy --project "$EXPECTED_PROJECT"

echo "Deploy complete."
