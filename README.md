This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

## Contact form configuration

The contact form requires these server-side environment variables:

- `GOOGLE_SHEETS_WEB_APP_URL` mirrors durably stored submissions to the existing Google Sheet.
- `RESEND_API_KEY` enables confirmation and internal alert emails.
- `CONTACT_FROM_EMAIL` is the verified sender address for those emails.
- `CONTACT_INTERNAL_ALERT_EMAIL` receives an alert when saving to Google Sheets fails. It defaults to `articog.media.01@gmail.com` and can be overridden for deployment.

Public form APIs use Upstash Redis for shared serverless rate limiting and durable lead storage. Configure:

- `UPSTASH_REDIS_REST_URL` is the Upstash Redis REST endpoint.
- `UPSTASH_REDIS_REST_TOKEN` authenticates rate-limit requests.

Requests are limited per platform-provided client IP and route. Lead records are stored under the `articog:lead:` keyspace with a generated ID, lead type, source, submission timestamp, and validated form fields. Google Sheets is a secondary mirror. If the shared store is unavailable or not configured, form APIs fail closed with a temporary-unavailable response rather than falling back to process-local memory.

Form retries use route-scoped HMAC fingerprints in the `articog:idempotency:` keyspace. Processing leases expire after 2 minutes; completed submissions are retained for 24 hours. Durable-storage failures release the lease so clients can retry, while successful durable writes prevent duplicate mirrors and notifications.

Server-side API and integration failures are emitted as JSON logs with safe event names, route/operation labels, request IDs, result/status fields, and bounded durations. Request bodies, credentials, provider response bodies, email addresses, and stack traces are excluded. No external error-monitoring provider is configured; Vercel/runtime log collection is the current observability target.

## Production monitoring

Implemented in code: structured operational logs, request IDs, generic API errors, and failure events for rate limits, Redis/storage, idempotency, Sheets, and Resend. Vercel runtime logs are the current production log destination; no Vercel alert rules or external incident integration are configured in this repository. Configure production alerts manually in the Vercel project for repeated API 5xx responses, Redis/storage failures, privacy notification failures, elevated 429 responses, and failed deployments. Configure GitHub notifications or repository rules separately for failed CI runs. Uptime monitoring and external error tracking are not currently configured.

GitHub Actions runs `npm ci`, installs the Playwright Chromium browser, `npm run test:e2e`, TypeScript checks, `npx eslint .`, `npm test`, and `npm run build` for pull requests and pushes to `main`. The workflow uses mocked test integrations and does not require production credentials.

The site-wide GA4 page-view and interaction tracking uses:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` enables Google Analytics 4 and should be set in the deployment environment when analytics are required.

## Google Search Console

After deploying to `https://articog.com`:

1. Add the production domain or URL-prefix property in Google Search Console.
2. Verify ownership using a Google-supported method configured for the production environment.
3. Submit `https://articog.com/sitemap.xml` under Sitemaps.
4. Use URL Inspection for the homepage and key canonical pages, then request indexing where appropriate.

Search Console verification is a production-account task and is not configured in this repository.

Repository readiness includes `app/sitemap.ts`, `app/robots.ts`, route metadata with canonical URLs, founder profile static params, and structured data. Dynamic `/services/[slug]` pages are not discovered by the filesystem sitemap collector; the static service category pages are included. Decide separately whether those dynamic service pages should become sitemap entries before adding them.

## Bing Webmaster Tools and IndexNow

After deploying the current production build:

1. Add `https://articog.com` to Bing Webmaster Tools.
2. Verify ownership using a supported Bing verification method.
3. Submit `https://articog.com/sitemap.xml` and use URL Inspection for important canonical pages.
4. To enable IndexNow later, generate a real production key, host the key at the required public URL, and submit changed canonical URLs to the IndexNow endpoint.
5. Verify IndexNow responses and the public key URL after deployment.

No Bing verification value, IndexNow key, or IndexNow integration is configured in this repository. Do not add one until the production key is generated and securely managed.

Bing verification, sitemap submission, URL inspection, and any IndexNow key hosting or submission remain manual production-account tasks.


You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
