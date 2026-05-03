# eo-template-v1-smoke

Tiny Next.js 14 app used to verify the [EO MicroSaaS dashboard](https://server.entrepreneursoasis.me)'s **V1.0 bring-your-own-GitHub-repo** flow end-to-end.

## What it tests

| | |
|-|-|
| Bring-your-own-GitHub-repo provisioning | The dashboard accepts this URL, validates it, and wires it through to Coolify |
| Multi-stage Dockerfile build via Coolify | Coolify auto-detects the Dockerfile and runs the standalone build |
| Live URL serves student code | Home route renders "V1.0 user-repo smoke", not the EO starter template |
| Push-to-redeploy | Bump `VERSION` in `app/page.tsx`, push, watch the URL update in ~90s |
| Failed-deploy UX | Break the Dockerfile (e.g. `RUN exit 1`), push, see the dashboard surface the build-log link |

## Stack

- **Next.js 14.2** (App Router, server components)
- **React 18.3**
- **TypeScript 5.5**
- **Multi-stage Dockerfile** with `output: 'standalone'` — small runtime image, fits the Free Pilot 512 MB tier
- **Zero env vars** — runs on a fresh container with no config

## How to deploy via the EO dashboard

1. Sign in at https://server.entrepreneursoasis.me
2. **Deploy new** → **Free Pilot** → toggle **My GitHub repo**
3. Paste `https://github.com/smorchestraai-code/eo-template-v1-smoke`
4. Branch: `main` (default)
5. Click **Deploy free pilot** — wait ~2-3 min for the build
6. Live URL renders "V1.0 user-repo smoke"

## How to verify push-to-redeploy

```bash
git clone https://github.com/smorchestraai-code/eo-template-v1-smoke
cd eo-template-v1-smoke
# bump the VERSION string in app/page.tsx, e.g. 'v2 — push-to-redeploy works'
git commit -am 'test: bump version'
git push origin main
# Wait ~90s, refresh your live URL — should now say v2.
```

No Coolify config or webhook setup needed — Coolify's `applications/public` create call configures the GitHub push webhook automatically.

## How to verify the failed-deploy UX

```bash
# Edit Dockerfile, add RUN exit 1 anywhere mid-build, commit, push.
# Wait 7-10 min. The dashboard reconciler flips status to failed_deploy.
# Apps page surfaces 'View build logs in Coolify →' — click it, see the exit code.
```

## Why this exists

Real student repos (SaaSfast, Stripe-backed apps) need MongoDB, NextAuth, Stripe, etc. — env-var-heavy and impossible to smoke-test the dashboard's plumbing with. This repo strips all of that away so the dashboard's V1.0 contract is testable in isolation.

License: MIT.
