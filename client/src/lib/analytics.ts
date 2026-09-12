type IntentEvent = "contact_intent" | "music_open" | "reviews_open";
export function trackIntent(event: IntentEvent, method: string) {
  try {
    const analytics = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    analytics?.("event", event, { method });
  } catch { /* Tracking must never interrupt navigation or contact. */ }
}
