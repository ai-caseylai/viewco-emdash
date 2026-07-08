---
name: viewco-cms
description: Manage the VIEWCO Engineering website CMS (emdash + Cloudflare D1 + Astro). Use for deploying, content management, i18n, and database operations.
---

# VIEWCO CMS Management

## Quick Reference

| Item | Value |
|------|-------|
| Site | `https://viewco.techforliving.net` |
| Admin | `https://viewco-cms.ai-caseylai.workers.dev/_emdash/admin` |
| Token Login | `https://viewco-cms.ai-caseylai.workers.dev/token-login` |
| API Token | `<YOUR_API_TOKEN>` |
| GitHub | `https://github.com/ai-caseylai/viewco-emdash` |
| D1 Database | `viewco-cms-db` |
| Worker | `viewco-cms` |

## CLI Auth

```bash
EMDASH_TOKEN="<YOUR_API_TOKEN>" \
  npx emdash whoami --url https://viewco-cms.ai-caseylai.workers.dev
```

## Deploy

```bash
cd /Users/perry/Documents/viewco
CLOUDFLARE_API_TOKEN=<YOUR_CF_TOKEN> npm run deploy
```

⚠️ **FTS is disabled** — do NOT re-enable `search` in collection supports. D1 FTS corrupts with Chinese Portable Text.

## Content Management

```bash
# List pages
EMDASH_TOKEN="ec_pat_..." npx emdash content list pages --url $URL

# Get page
EMDASH_TOKEN="ec_pat_..." npx emdash content get pages about-us --url $URL

# Update page (requires --rev)
EMDASH_TOKEN="ec_pat_..." npx emdash content update pages about-us --url $URL --rev $REV --data '{"content":[...]}'

# Create page
EMDASH_TOKEN="ec_pat_..." npx emdash content create pages --url $URL --slug new-page --data '{"title":"Title","content":[...]}'
```

## Database Operations

```bash
# Query D1 (OAuth — unset API token)
unset CLOUDFLARE_API_TOKEN
npx wrangler d1 execute viewco-cms-db --remote --command "SELECT * FROM ec_pages LIMIT 5"

# Export all content
cd /Users/perry/Documents/viewco
./export.sh  # or manually run emdash CLI commands
```

## Locale Structure

| Locale | URL Prefix | Example |
|--------|-----------|---------|
| zh-Hant | `/` | `/about-us/` |
| zh-Hans | `/cn/` | `/cn/about-us/` |
| en | `/en/` | `/en/about-us/` |

## Page Slugs

`about-us`, `our-services`, `our-clients`, `join-us`, `partners`, `contacts`

## Architecture

- **CMS**: emdash (Astro + D1 + R2 + KV)
- **Hosting**: Cloudflare Workers
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (media)
- **Sessions**: Cloudflare KV
- **Frontend**: Astro + custom CSS (from original static site)

## Common Tasks

### Add new page
1. Create via CLI: `emdash content create pages --slug new-slug --data '{"title":"...","content":[...]}'`
2. Add to menus: INSERT into `_emdash_menu_items`

### Update English content
```bash
EMDASH_TOKEN="ec_pat_..." npx emdash content get pages about-us --url $URL --json | jq '._rev'
# Then update with --rev
```

### Fix custom domain routing
```bash
CLOUDFLARE_API_TOKEN=<YOUR_CF_TOKEN> \
curl -X POST "https://api.cloudflare.com/client/v4/zones/ZONE_ID/workers/routes" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"pattern":"viewco.techforliving.net/*","script":"viewco-cms"}'
```
