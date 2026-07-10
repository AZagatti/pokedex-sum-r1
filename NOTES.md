# Pokédex Build Notes

## 2026-07-10

### Phase 1-2: Scaffolding & Setup
- Initial `npm create svelte` deprecated; replaced with manual setup
- Fixed `@sveltejs/adapter-static` version to 3.0.10
- Fixed vite config to import from `@sveltejs/kit/vite`
- Ran `npm install --legacy-peer-deps`; pinned `@sveltejs/vite-plugin-svelte@^4.0.0-next.6`
- Set up basic structure: package.json, tsconfig, vite.config, svelte.config

### Phase 3: UI Components & Stores
- Created Header with nav links (Home, Berries, Favorites) + theme toggle + hamburger
- Created PokemonCard, PokemonImage, TypeBadge, Skeleton, Layout wrapper
- Theme store: writable with toggle(), init(), subscribe()
- Favorites store: persisted to localStorage

### Phase 4: Pages
- `/` (list): search, type filters, sort dropdown, infinite scroll, PokemonCard grid
- `/pokemon/[name]` (detail): artwork, type badges, abilities, moves, evolution chain
- `/berries` + `/berries/[name]`: berry list/detail
- `/favorites`: grid of favorited Pokémon
- `+error.svelte`: 404 page

### Phase 5: API & Data
- Zod schemas: PokemonDetail, Berry, etc
- In-memory cache (Map keyed by URL)
- Functions: getPokemonList, getPokemonDetail, getPokemonSpecies, getEvolutionChain, getBerryList, getBerryDetail, getGeneration, getType

### Phase 6: Build & Theme
- Fixed dark mode: used onMount + store.subscribe instead of $effect (orphan error)
- Build succeeds: `npm run build` → static output via adapter-static
- Lefthook installed (git init triggered it)
- Tailwind v4 working

### Current Status
- **Dev server running on port 5176** (ports 5173-5175 were busy)
- **Page loads but Pokémon cards not rendering** — checking why list page shows types but no cards
- No build errors; only 1 console error (favicon 404)

### Known Issues
- Missing `normal` type in type filter buttons (only 17 out of 18 types listed)
- Need to verify card grid rendering and infinite scroll
- Need to check if getPokemonList API call is returning data

### Next Steps
- Debug list page rendering (cards not showing despite loadMore() being called)
- Verify API calls are working
- Test search/filter functionality
- Test dark mode toggle
- Build out remaining pages (detail, berries, favorites)
- Wire up animations (transitions:fade)
- Set up Playwright tests
- Set up GitHub Actions CI/CD
- Optimize for Lighthouse ≥90

## 2026-07-10 (continued)

### Phase 7: CSS Rewrite & List Page Working
- Removed Tailwind v4 completely (was causing vite/svelte incompatibility issues)
- Wrote hand-crafted CSS with grid/flex utilities matching Tailwind class names
- List page now functional: 30 cards loading in 3-column grid (lg breakpoint)
- Grid properly responsive: 1 col (mobile), 2 col (sm), 3 col (lg), 4 col (xl)
- Cards showing: Pokémon sprite, ID, name, types, favorite heart button
- Search, sort, type filters wired up (need to test functionality)
- All 17 type filter buttons present (fire, water, grass, electric, ice, fighting, poison, ground, flying, psychic, bug, rock, ghost, dragon, dark, steel, fairy)

### Remaining Work
1. Test list page features (search, filter, sort, infinite scroll, Load More)
2. Implement detail page (`/pokemon/[name]`)
3. Implement berries pages (`/berries`, `/berries/[name]`)
4. Implement favorites page (`/favorites`)
5. Test dark mode toggle
6. Add animations (fade transitions, scale on hover)
7. Set up Playwright e2e tests
8. Build for production
9. Set up GitHub Actions CI/CD
10. Deploy to GitHub Pages
11. Optimize for Lighthouse ≥90
12. Create docs (README, ARCHITECTURE.md, DECISIONS.md)
