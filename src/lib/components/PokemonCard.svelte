<script lang="ts">
  import { Heart } from 'lucide-svelte';
  import TypeBadge from './ui/TypeBadge.svelte';
  import PokemonImage from './ui/PokemonImage.svelte';
  import { favorites } from '$lib/stores/favorites';
  import type { PokemonDetail } from '$lib/api/schemas';

  interface Props {
    pokemon: PokemonDetail;
  }

  let { pokemon }: Props = $props();

  function toggleFavorite(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    favorites.toggle(pokemon.id);
  }

  let isFavorited = $derived($favorites.includes(pokemon.id));
</script>

<a
  href="/pokemon/{pokemon.name}"
  class="group relative bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:scale-105 active:scale-95"
>
  <div class="aspect-square overflow-hidden bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900">
    <PokemonImage
      src={pokemon.sprites.other?.official_artwork?.front_default || pokemon.sprites.front_default || ''}
      alt={pokemon.name}
    />
  </div>

  <div class="p-4">
    <div class="flex items-start justify-between mb-2">
      <div>
        <p class="text-xs text-slate-500 dark:text-slate-400">#{String(pokemon.id).padStart(4, '0')}</p>
        <h3 class="font-bold text-lg capitalize text-slate-900 dark:text-white group-hover:text-red-600 transition">
          {pokemon.name}
        </h3>
      </div>
      <button
        onclick={toggleFavorite}
        class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart
          class="w-5 h-5 transition"
          fill={isFavorited ? 'currentColor' : 'none'}
          color={isFavorited ? 'rgb(220, 38, 38)' : 'currentColor'}
        />
      </button>
    </div>

    <div class="flex flex-wrap gap-1">
      {#each pokemon.types as { type }}
        <TypeBadge type={type.name} />
      {/each}
    </div>
  </div>
</a>