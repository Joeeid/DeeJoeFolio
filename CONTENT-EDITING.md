# Updating DeeJoe's website

Use Node.js 24 (also selected by `.nvmrc` and the deployment workflow). Run `npm ci` once, then `npm run dev`. The development site opens at http://127.0.0.1:5173. On Windows PowerShell, use `npm.cmd` if script execution is disabled.

## Content

- `client/src/content/site.ts` contains contact details, the Anghami profile, FAQs, service-page copy, venue history, page metadata, and structured data. Keep venue dates current and only add services you actually offer.
- `client/src/pages/home.tsx` contains the homepage introduction and service summaries. `client/src/components/about.tsx` contains the biography.
- `client/src/lib/booking.ts` contains event choices, validation, and the WhatsApp/email message format. The form is an enquiry handoff: it does not submit a booking, reserve a date, or store visitor details on a server.

## Photos and music

Original JPG photos remain in `client/public/assets`. `scripts/optimize-images.mjs` creates 480, 800, and 1200px WebP versions when you start development or build. These generated images are ignored by Git; keep the originals. GitHub Actions runs `npm run build`, which imports the optimizer before Vite copies the generated files into `dist/public/assets/optimized/`. That directory is included in the uploaded Pages artifact. `npm run check:build` validates every local responsive `srcset` candidate before deployment. Image descriptions live beside the image components.

The music section defers Anghami's official dark song widget until the section is within 400px of the viewport, matching the reviews section. A player-shaped skeleton reserves the 600px height until the iframe loads; after a 15-second timeout, a fallback message appears, and a late load can still reveal the player. The iframe load event confirms its document loaded, not that Anghami successfully provided playable audio. The section uses the official dark song widget for “Arabic X English Fusion Mix Vol. 1” (`1146922507`), with autoplay disabled. No click is required to load the embed. The direct song link and artist profile link remain available independently of the widget. Update `site.featuredMix` (title, public URL, and embed URL) in `client/src/content/site.ts` to feature another release; `site.anghami` retains the artist profile. The component is `client/src/components/music.tsx`.

Local playback check: the artist widget loaded, but Anghami's public page for “Arabic X English Fusion Mix Vol. 1” reported that the song was no longer available due to licenses. Audio playback could not be confirmed. Check the release's availability in Anghami before publishing; the website cannot resolve a provider catalog restriction.

Google reviews use the existing Elfsight widget and load automatically as the review section approaches the viewport. Responsive skeleton cards stay visible until actual review links appear, rather than disappearing as soon as the platform script downloads. After a script error or 15 seconds without reviews, the skeleton gives way to a Google fallback message; late-arriving reviews can still appear. Update its identifier and the external review link in `site.ts` if your provider changes. No review text or rating is fabricated or copied into structured data.

`hideElfsightLink()` in `client/src/components/reviews.tsx` hides Elfsight credit links inside the reviews section. A MutationObserver handles links and inline styles added after loading, and disconnects when the component unmounts. The CSS rule in `index.css` provides an additional fallback.

## Brand wordmark

The header, mobile navigation, footer, and portrait wordmark use the supplied `client/public/assets/fonts/DeeJoe_Brand_Font.ttf`. The `@font-face` rule in `client/src/index.css` registers it as `DeeJoe Brand` with `font-display: swap`, keeping Arial/Helvetica visible while it downloads or if it fails. `font-synthesis: none` preserves the regular brand face without artificial bolding. The custom font applies only to these wordmarks. To replace it, update the font URL and format in that rule, then check the wordmark spacing on desktop and mobile.

## Verify and preview

1. `npm run check` — TypeScript.
2. `npm test` — enquiry validation, international text, URL encoding, route metadata, and analytics failure handling.
3. `npm run build` — optimize photos, build assets, and render all pages into HTML.
4. `npm run check:build` — verify metadata, internal anchors, assets, structured data, and removed legacy content.
5. `npm run preview` — inspect production output at http://127.0.0.1:4173. Rebuild after edits before refreshing this preview.

The static build includes `/`, `/weddings/`, `/private-events/`, `/experience/`, a genuine `404.html`, a generated sitemap, robots.txt, and CNAME. Existing `/experience` links resolve to the directory route. All section links work with ordinary browser navigation. Invalid URLs display the 404 page instead of redirecting to the homepage.

## Publishing later

This delivery is local only. Nothing was deployed. The existing GitHub Pages workflow still publishes pushes to `main`; it now checks the committed dependency lockfile, types, tests, and generated pages before uploading `dist/public`. Only push when you intend to release. The manual `npm run deploy` command targets the same output directory.

Canonical URLs use `https://www.deejoelb.com`. Existing social images and the Search Console verification tag are preserved. After a future release, submit the generated sitemap in Search Console and monitor indexing and real contact enquiries. Metadata improvements do not guarantee a search position.

Google Analytics and Google Ads share one loader and run only on the production domain. `contact_intent` records the contact method; it does not include form contents or count a confirmed booking. `music_open` and `reviews_open` record those actions. Review conversion definitions in your analytics account after deployment if you want these intent events counted as conversions.

## Dependency maintenance

`package.json` contains the packages used by the site, its build, tests, and manual GitHub Pages deployment. The retired Express server, database command, and unused generated UI components have been removed.

Tailwind stays on the latest 3.4 release, with `tailwind-merge` 2.6 to match. Tailwind 4 needs a separate stylesheet migration and changes the supported browser baseline. React DayPicker 10 uses the updated calendar class names and focus/navigation props in `ui/calendar.tsx` and `booking-date-picker.tsx`. The calendar is downloaded only when the date popover opens.

After dependency changes, run `npm run check`, `npm test`, `npm run build`, `npm run check:build`, and `npm audit`. Check the booking date picker and mobile navigation in `npm run preview`. The typecheck also covers the tests and Vite/Tailwind configuration.
