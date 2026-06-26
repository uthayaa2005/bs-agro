# Deploy BS Agro Equipments to bsagroequipments.com

Production site: **https://bsagroequipments.com**

## 1. Build locally

```powershell
cd "D:\bs agro\bs-agro"
npm install
npm run build
```

The `prebuild` script generates `public/sitemap.xml` automatically. Output goes to the `build/` folder.

Preview the production build:

```powershell
npx serve -s build
```

## 2. Deploy with Vercel (recommended)

1. Push this project to a **GitHub** repository.
2. Sign in at [vercel.com](https://vercel.com) → **Add New Project** → import the repo.
3. Vercel auto-detects Create React App:
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. Click **Deploy**. You get a preview URL (e.g. `bs-agro.vercel.app`).

### Connect GoDaddy domain (Vercel)

1. In Vercel → Project → **Settings** → **Domains** → add:
   - `bsagroequipments.com`
   - `www.bsagroequipments.com`
2. In **GoDaddy** → **My Products** → `bsagroequipments.com` → **DNS**, add:

| Type  | Name | Value                    | TTL  |
|-------|------|--------------------------|------|
| A     | `@`  | `76.76.21.21`            | 600  |
| CNAME | `www`| `cname.vercel-dns.com`   | 600  |

3. Remove conflicting **Domain Forwarding** or old **A** records in GoDaddy.
4. Wait 15 minutes–48 hours. Vercel issues **HTTPS** automatically.

## 3. Deploy with Netlify (alternative)

1. Sign in at [netlify.com](https://netlify.com) → **Add new site** → import from GitHub.
2. Settings are in `netlify.toml` (build: `npm run build`, publish: `build`).
3. **Domain settings** → add `bsagroequipments.com` and `www.bsagroequipments.com`.
4. In GoDaddy DNS, use the records Netlify shows (usually a Netlify load balancer **A** record and **CNAME** for `www`).

## 4. After go-live checklist

- [ ] Open https://bsagroequipments.com and test all pages on mobile
- [ ] Test **Call**, **WhatsApp**, and enquiry form links
- [ ] Submit sitemap in [Google Search Console](https://search.google.com/search-console):
  - Add property: `https://www.bsagroequipments.com` (preferred) and/or `https://bsagroequipments.com`
  - **Sitemaps** → submit `https://www.bsagroequipments.com/sitemap.xml`
  - **URL Inspection** → test `https://www.bsagroequipments.com/products` → **Request indexing**
  - Repeat for home page and top product URLs
- [ ] Create/update **Google Business Profile** with the new website URL
- [ ] Optional: set up `info@bsagroequipments.com` via Google Workspace or Zoho Mail

## 5. Updating the live site

After code changes:

```powershell
cd "D:\bs agro\bs-agro"
npm run build
git add .
git commit -m "Update site"
git push
```

Vercel/Netlify redeploy automatically on push to your main branch.

## Files added for deployment & SEO

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel build settings + SPA routing |
| `netlify.toml` | Netlify build settings + SPA routing |
| `public/robots.txt` | Search engine crawl rules |
| `public/sitemap.xml` | Auto-generated URL list for Google |
| `public/manifest.json` | PWA / mobile browser metadata |
| `src/constants/site.js` | Canonical domain configuration |
| `src/utils/seo.js` | Per-page title, meta, Open Graph |
