# Bot and abuse protection

The site is static on Vercel, so most requests are cheap, but a bot flood still
consumes bandwidth, edge invocations, and (for `/_next/image`) image-optimisation
work. Protection is layered:

1. **Application edge rules** in `proxy.ts` — active now, no external account.
2. **Vercel Firewall** — best option if the project is on Pro or higher.
3. **Cloudflare in front of Vercel** — best free option for volumetric floods.

`robots.txt` is not a defence: malicious bots ignore it.

## 1. What `proxy.ts` does

`proxy.ts` runs at the edge before the CDN cache, on every route except
`/_next/static`. It blocks a request when any of these is true:

| Check | Default | Result |
| --- | --- | --- |
| Country (`cf-ipcountry`, then `x-vercel-ip-country`) | `CN,SG` | `403` |
| Scanner path (`/.env`, `/wp-admin`, `/xmlrpc.php`, `/vendor/`, …) | always | `404` |
| Script/scraper user agent (`python-requests`, `curl`, `scrapy`, `SemrushBot`, `Bytespider`, …) or empty UA | always | `403` |
| Method other than `GET`/`HEAD`/`POST`/`OPTIONS`, or `POST` outside `/api/*` | always | `405` |
| Per-IP rate limit | disabled (`0`) | `429` + `Retry-After` |

Search engine crawlers (`Googlebot`, `Bingbot`, `YandexBot`, `Applebot`,
`DuckDuckBot`, `Baiduspider`) bypass the country and rate-limit checks so that a
crawler node geolocating to a blocked country cannot hurt indexing.

### Configuration

Set these in Vercel → Project → Settings → Environment Variables, then redeploy:

```env
# Comma-separated ISO codes. Empty string disables country blocking.
BLOCKED_COUNTRIES=CN,SG

# Requests per minute per IP. 0 disables the limiter.
RATE_LIMIT_PER_MINUTE=0
```

Notes:

- Singapore hosts many legitimate businesses and cloud NAT gateways. If real
  Singapore readers matter, remove `SG` and rely on Cloudflare rate limiting for
  that region instead: `BLOCKED_COUNTRIES=CN`.
- Country detection uses the client IP. VPN and proxy users are classified by
  their exit node.
- The per-IP limiter is intentionally off by default: a shared corporate IP or a
  full-site QA crawl can legitimately exceed a low limit. If you enable it, start
  at `600` and watch for false positives.
- Edge instances are short-lived, so the in-memory counter is best-effort. Use
  Cloudflare or Vercel Firewall for enforceable rate limits.

### Local verification

```powershell
npm run build
npm start

# blocked country
curl.exe -i -H "x-vercel-ip-country: CN" http://localhost:3000/
# expect 403

# allowed country
curl.exe -i -H "x-vercel-ip-country: US" http://localhost:3000/
# expect 200

# scanner path
curl.exe -i http://localhost:3000/.env
# expect 404

# scraper user agent
curl.exe -i -A "python-requests/2.31" http://localhost:3000/
# expect 403

# normal browser
curl.exe -i -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" http://localhost:3000/
# expect 200
```

In production Vercel overwrites `x-vercel-ip-country` with the real client
country, so the header cannot be spoofed for testing there. Test the logic
locally and watch Vercel → Observability → Logs for `403` responses after deploy.

## 2. Vercel Firewall (Pro and above)

If the project is on a paid plan, this is the cleanest option because it runs
before the edge function:

1. Open Vercel → Project → **Firewall**.
2. **Custom rules** → add:
   - `Country` is `China` or `Singapore` → **Deny** (or **Challenge**).
   - `Path` starts with `/.env`, `/.git`, `/wp-`, `/xmlrpc.php` → **Deny**.
   - `User Agent` contains `python-requests`, `curl`, `scrapy` → **Deny**.
3. **Rate limiting** → add a rule: 60 requests per minute per IP → Deny for 10
   minutes. Apply it to HTML paths only, not to `/_next/static`.
4. Enable **Bot Protection** / managed rules if your plan includes it.
5. During an active flood, use **Attack Challenge Mode** in the Firewall
   dashboard. It challenges every visitor with JavaScript and is the fastest
   emergency switch.

Custom WAF rules and Attack Challenge Mode are not available on the Hobby plan.

## 3. Cloudflare in front of Vercel (free, recommended for floods)

This is the durable fix for a sustained L7 flood. It requires access to the
domain registrar, because the nameservers must change.

### Setup

1. Create a Cloudflare account and add `b2bleadgenerationtools.com`.
2. Copy the Vercel DNS records into Cloudflare:
   - `www` → `CNAME cname.vercel-dns.com` (proxied, orange cloud).
   - apex `@` → the A record Vercel shows in Project → Settings → Domains.
3. At the registrar, replace the nameservers with the two Cloudflare ones.
4. Cloudflare → SSL/TLS → **Full (strict)**.
5. Cloudflare → Security → Bots → enable **Bot Fight Mode**.
6. Security → WAF → **Custom rules** (free plan allows 5):

   | Rule | Expression | Action |
   | --- | --- | --- |
   | Block flood countries | `(ip.geoip.country in {"CN" "SG"} and not cf.client.bot)` | Block |
   | Block scanner paths | `(http.request.uri.path contains "/wp-" or http.request.uri.path contains "/.env" or http.request.uri.path contains "/xmlrpc.php")` | Block |
   | Block script UAs | `(http.user_agent contains "python-requests" or http.user_agent contains "scrapy" or http.user_agent contains "curl/")` | Block |

   `cf.client.bot` matches Cloudflare-verified good bots, so Googlebot is not
   blocked by the country rule.
7. Security → WAF → **Rate limiting rules** (free plan: one rule):
   100 requests per 1 minute per IP → Block for 10 minutes.
8. If the flood is active, enable **Under Attack Mode** (Security → Settings).
9. Optional: Cache Rules → cache `http.request.uri.path` not starting with
   `/api/` to offload static HTML from Vercel. Keep `/api/*` and `/_next/image`
   out of that rule.

### Important: country detection behind Cloudflare

Cloudflare sends `CF-IPCountry` to the origin, while Vercel's
`x-vercel-ip-country` would only see Cloudflare's edge IP. `src/lib/geo.ts`
therefore uses `cf-ipcountry` **only when a valid `cf-ray` header is present**;
otherwise it uses the Vercel header. This keeps analytics consent and country
blocking accurate behind Cloudflare, while preventing a direct client from
flipping the Cloudflare branch with a forged `cf-ipcountry` header. Do not
enable a Cloudflare transform rule that removes visitor IP headers.

The application-level country block remains best-effort: a determined client can
forge `cf-ray`/`cf-ipcountry`. Use Cloudflare WAF or Vercel Firewall when the
block must be enforceable.

## 4. Monitoring

- Vercel → Observability → Logs: filter by status `403`, `404`, `429` and by
  path to see what bots are probing.
- Vercel → Usage: watch bandwidth and edge requests during an attack.
- GA4 realtime only shows bots that execute JavaScript. A flood can therefore be
  invisible in GA while still hitting Vercel; use Vercel logs as the source of
  truth.

## 5. Emergency checklist

1. Add the attacking country to `BLOCKED_COUNTRIES` and redeploy (≈1 minute).
2. In Cloudflare, turn on **Under Attack Mode**.
3. In Cloudflare/Vercel, lower the rate-limit threshold to 30 requests/minute.
4. Check Vercel logs to confirm `403` responses for the flood source.
5. After the flood, relax the rules: remove `SG` first, then raise the rate
   limit.
