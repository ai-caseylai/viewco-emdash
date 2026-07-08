#!/bin/bash
# Export all VIEWCO CMS data to JSON files
# Usage: EMDASH_TOKEN="ec_pat_..." ./export.sh
URL="https://viewco-cms.ai-caseylai.workers.dev"
OUT="./export"
mkdir -p "$OUT"

echo "Exporting VIEWCO CMS data..."

EMDASH_TOKEN="${EMDASH_TOKEN}" npx emdash content list pages --url "$URL" --json > "$OUT/pages_list.json"
for slug in about-us our-services our-clients join-us partners contacts; do
  EMDASH_TOKEN="${EMDASH_TOKEN}" npx emdash content get pages "$slug" --url "$URL" --json > "$OUT/page_${slug}.json"
done

EMDASH_TOKEN="${EMDASH_TOKEN}" npx emdash menu list --url "$URL" --json > "$OUT/menus.json"
EMDASH_TOKEN="${EMDASH_TOKEN}" npx emdash schema list --url "$URL" --json > "$OUT/schema.json"

echo "Export complete: $OUT/"
ls -la "$OUT/"
