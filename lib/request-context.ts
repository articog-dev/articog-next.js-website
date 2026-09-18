const REQUEST_ID_PATTERN = /^[A-Za-z0-9._:-]{1,128}$/;

export function getRequestId(request: Request): string {
  const platformRequestId = request.headers.get("x-vercel-id");
  return platformRequestId && REQUEST_ID_PATTERN.test(platformRequestId)
    ? platformRequestId
    : crypto.randomUUID();
}

export function withRequestId(
  requestId: string,
  body: unknown,
  init?: ResponseInit,
): Response {
  const headers = new Headers(init?.headers);
  headers.set("X-Request-ID", requestId);
  return Response.json(body, { ...init, headers });
}

export function isValidIdempotencyKey(value: string | null): value is string {
  return value !== null && /^[A-Za-z0-9._~-]{1,128}$/.test(value);
}