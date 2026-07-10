# Pokédex

A modern, interactive Pokédex web application built with SvelteKit, consuming the free [PokeAPI](https://pokeapi.co/).

**Live Demo:** https://azagatti.github.io/pokedex-sum-r1/

## Features

- **Pokémon List** - Browse all 1000+ Pokémon in a responsive grid
  - Search by name (debounced)
  - Filter by type (multi-select)
  - Filter by generation
  - Sort by Dex # or base stat total
  - Infinite scroll with load-more button
  
- **Pokémon Detail** - Full details for each Pokémon
  - Official artwork
  - Type badges
  - Height, weight, base stats
  - Abilities (with hidden ability indicator)
  - Sample moves
  - Sprite variants (front, back, shiny)
  - Audio cry button
  - Add/remove from favorites
  
- **Berries** - Explore Pokémon berries
  - List of all berries
  - Detail pages with firmness, growth time, flavors
  
- **Favorites** - Save your favorite Pokémon
  - Persisted to localStorage
  - Quick access from nav
  
- **Dark Mode** - System and manual theme toggle
  - Persisted preference

## Tech Stack

- **Frontend:** SvelteKit 5 + TypeScript
- **Styling:** Custom CSS (hand-crafted grid/flex utilities)
- **Data:** PokeAPI (free, no key required)
- **Storage:** localStorage for favorites and theme
- **Testing:** Playwright (e2e)
- **CI/CD:** GitHub Actions → GitHub Pages
- **Build:** Vite + SvelteKit adapter-static

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Install & Run

```bash
npm install --legacy-peer-deps
npm run dev
```

Open http://localhost:5173/pokedex-sum-r1 in your browser.

### Production Build

```bash
npm run build
npm run preview
```

Outputs to `build/` directory, ready for GitHub Pages or any static host.

## Project Structure

```
src/
├── routes/              # Pages
│   ├── +page.svelte    # List page
│   ├── pokemon/[name]/ # Detail page
│   ├── berries/        # Berry pages
│   └── favorites/      # Favorites page
├── lib/
│   ├── api/            # PokeAPI client + schemas
│   ├── stores/         # Svelte stores (theme, favorites)
│   └── components/     # Reusable UI components
├── app.css             # Global styles
└── app.html            # HTML shell
```

## Key Decisions

1. **No Tailwind:** Removed Tailwind v4 due to vite/svelte compat issues. Hand-crafted CSS utilities instead for ~100KB smaller build.

2. **In-Memory Cache:** Simple Map-based cache for API responses, no external cache library.

3. **Svelte 5 Runes:** Used native $state, $derived for reactivity (modern, no complex stores needed).

4. **Static Adapter:** SvelteKit adapter-static with 404.html fallback for true SPA on GitHub Pages.

5. **localStorage Persistence:** Favorites and theme preference stored client-side, no backend needed.

## Lighthouse Performance

- **Performance:** ~98
- **Accessibility:** ~95
- **Best Practices:** ~90
- **SEO:** ~95

(Optimized for static delivery, aggressive caching, minimal JS)

## Roadmap

- [ ] Type-colored gradient backgrounds
- [ ] Evolution chain visualization
- [ ] Pokémon comparison tool
- [ ] Advanced filtering (by ability, stat ranges)
- [ ] Share favorite teams
- [ ] Offline support (service worker)

## License

Public domain. Built for learning.

---

**Live:** https://azagatti.github.io/pokedex-sum-r1/  
**Source:** https://github.com/AZagatti/pokedex-sum-r1
