import { type Metric, onCLS, onFCP, onFID, onLCP, onTTFB } from "web-vitals";

const VITALS_URL = "https://vitals.vercel-analytics.com/v1/vitals";

interface Options {
  params: { [s: string]: any } | ArrayLike<any>;
  path: string;
  analyticsId: string;
  debug: boolean;
}

function sendToAnalytics(metric: Metric, options: Options) {
  const page = Object.entries(options.params).reduce(
    (acc, [key, value]) => acc.replace(value, `[${key}]`),
    options.path
  );

  const body = {
    dsn: options.analyticsId,
    id: metric.id,
    page,
    href: location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: "",
  };

  if (options.debug) {
    console.log("[Analytics]", metric.name, JSON.stringify(body, null, 2));
  }

  const blob = new Blob([new URLSearchParams(body).toString()], {
    // This content type is necessary for `sendBeacon`
    type: "application/x-www-form-urlencoded",
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(VITALS_URL, blob);
  } else
    fetch(VITALS_URL, {
      body: blob,
      method: "POST",
      credentials: "omit",
      keepalive: true,
    });
}

export function webVitals(options: Options) {
  try {
    onFCP((metric) => sendToAnalytics(metric, options));
    onTTFB((metric) => sendToAnalytics(metric, options));
    onLCP((metric) => sendToAnalytics(metric, options));
    onCLS((metric) => sendToAnalytics(metric, options));
    onFID((metric) => sendToAnalytics(metric, options));
  } catch (err) {
    console.error("[Analytics]", err);
  }
}
