<script lang="ts">
  import { onMount } from 'svelte';
  import { Heart } from 'lucide-svelte';
  import PokemonCard from '$lib/components/PokemonCard.svelte';
  import { favorites } from '$lib/stores/favorites';
  import { getPokemonDetail } from '$lib/api';
  import type { PokemonDetail } from '$lib/api/schemas';

  let pokemon: PokemonDetail[] = $state([]);
  let loading = $state(true);

  onMount(async () => {
    loading = true;
    try {
      const fav = Array.from($favorites);
      const details = await Promise.all(
        fav.map((name) => getPokemonDetail(name))
      );
      pokemon = details;
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Favorites - Pokédex</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-4xl font-bold mb-2">Favorite Pokémon</h1>
    <p class="text-slate-600 dark:text-slate-400">Your saved Pokémon collection</p>
  </div>

  {#if loading}
    <div class="text-center py-12">Loading...</div>
  {:else if pokemon.length === 0}
    <div class="text-center py-12">
      <Heart class="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-4" />
      <p class="text-slate-500 dark:text-slate-400 mb-4">No favorites yet</p>
      <a href="/" class="text-red-600 hover:text-red-700 font-semibold">
        Add some from the Pokédex
      </a>
    </div>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {#each pokemon as poke (poke.id)}
        <PokemonCard pokemon={poke} />
      {/each}
    </div>
  {/if}
</div>