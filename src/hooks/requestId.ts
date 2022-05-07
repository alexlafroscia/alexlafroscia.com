import type { Handle } from "@sveltejs/kit";
import { randomUUID } from "node:crypto";

export const requestId: Handle = async ({ event, resolve }) => {
  event.locals.requestId = randomUUID();

  const response = await resolve(event);

  response.headers.set("x-request-id", event.locals.requestId);

  return response;
};
