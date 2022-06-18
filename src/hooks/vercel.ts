import type { Handle } from "@sveltejs/kit";

const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

function daysToSeconds(days: number): number {
  return days * HOURS_IN_DAY * MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
}

const CACHE_CONTROL_VALUE = `s-maxage=${daysToSeconds(10)}`;

export const handle: Handle = async ({ event, resolve }) => {
  const response = await resolve(event);

  // Vercel only caches response from serverless functions when they have a `Cache-Control`
  // setting that they understand
  response.headers.set("Cache-Control", CACHE_CONTROL_VALUE);

  return response;
};
