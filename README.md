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

The site-wide GA4 page-view and interaction tracking uses:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` enables Google Analytics 4 and should be set in the deployment environment when analytics are required.


You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
