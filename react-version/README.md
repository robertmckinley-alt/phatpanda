# Phat Panda — React version

Single-file component that mirrors the static HTML build, ready to drop into Next.js, Vite, or Create React App.

## Use in Next.js (App Router)

```bash
npx create-next-app@latest phatpanda --tailwind --app
# Copy PhatPandaSite.jsx into app/components/
```

```jsx
// app/page.jsx
import PhatPandaSite from "./components/PhatPandaSite";
export default function Page() { return <PhatPandaSite />; }
```

Add Termina + Early Sans Variable through your Adobe Fonts kit in `app/layout.jsx`:

```jsx
<link rel="stylesheet" href="https://use.typekit.net/YOUR_KIT.css" />
```

## Use in Vite + React

```bash
npm create vite@latest phatpanda -- --template react
cd phatpanda
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then drop the component into `src/`:

```jsx
// src/App.jsx
import PhatPandaSite from "./PhatPandaSite";
export default function App() { return <PhatPandaSite />; }
```

## Tailwind config

```js
// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: { colors: { "pp-green": "#72BC44", "pp-green-dark": "#5DA035" } } },
};
```

## Deploy

- **Vercel:** `vercel deploy` (zero config for Next.js / Vite)
- **Netlify / Cloudflare Pages:** point at the build output

## What's included

- Age gate with localStorage memory + proper off-site redirect on "No"
- Sticky responsive header with mobile menu
- Hero with rotating tagline
- Stats band
- House-of-brands grid with category filters
- Awards strip + press grid (all 9 verified press hits)
- Schema-friendly footer with full compliance copy

## What's NOT included

- Real backend for the contact form (use Formspree, Netlify Forms, or a Next.js route handler)
- Full sub-page routing (the static build has `/careers.html`, `/contact.html`, `/brand-guide.html` — port if you want them in React)
