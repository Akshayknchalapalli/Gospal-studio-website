# Suresh Live Medias

A React and Vite website for a Bhimavaram media studio and event-production business. The event explorer uses Chart.js to show the distribution of suggested services for each event type. The numbers are service counts, not pricing or past-event statistics.

## Develop and build

Use Node.js 22.12 or later.

```sh
npm ci
npm run dev
npm run build
npm run preview
```

Vercel builds with the Vite preset and publishes `dist/`. No environment variables are required.

## Maintain the site

- Edit business details, services, event recommendations and asset references in `src/content.js`.
- Define palette values and semantic color roles in `src/styles/tokens.css`. The page and the chart share these tokens.
- Replace illustrative event imagery in `public/media/` with approved client work when it is available.
- The booking form opens a prefilled WhatsApp draft. Confirm the destination number with the business before announcing the site.
- The site follows the visitor’s system color scheme until they choose light or dark mode. Set theme overrides in the same token file. Motion honors the system reduced-motion preference.
