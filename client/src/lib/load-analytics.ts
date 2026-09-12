export function loadAnalytics() {
  const analyticsWindow = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  if (document.getElementById("google-analytics")) return;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag = function () { analyticsWindow.dataLayer!.push(arguments); };
  analyticsWindow.gtag("js", new Date());
  analyticsWindow.gtag("config", "G-6T2T1YX836");
  analyticsWindow.gtag("config", "AW-17872176537");
  const script = document.createElement("script");
  script.id = "google-analytics";
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-6T2T1YX836";
  document.head.appendChild(script);
}
