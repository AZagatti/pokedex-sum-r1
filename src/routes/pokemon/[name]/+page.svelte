<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { ArrowLeft, Volume2 } from 'lucide-svelte';
  import TypeBadge from '$lib/components/ui/TypeBadge.svelte';
  import PokemonImage from '$lib/components/ui/PokemonImage.svelte';
  import { getPokemonDetail, getSpecies, getEvolutionChain } from '$lib/api';
  import { favorites } from '$lib/stores/favorites';
  import type { PokemonDetail } from '$lib/api/schemas';

  let pokemon: PokemonDetail | null = $state(null);
  let loading = $state(true);
  let error = $state('');
  let spriteVariant = $state<'front' | 'back' | 'shiny'>('front');

  onMount(async () => {
    try {
      const name = $page.params.name;
      pokemon = await getPokemonDetail(name);
    } catch (e) {
      error = String(e);
    } finally {
      loading = false;
    }
  });

  function toggleFavorite() {
    if (pokemon) {
      favorites.toggle(pokemon.id);
    }
  }

  let isFavorited = $derived(pokemon ? $favorites.includes(pokemon.id) : false);

  let spriteUrl = $derived.by(() => {
    if (!pokemon) return '';
    if (spriteVariant === 'front') {
      return pokemon.sprites.other?.official_artwork?.front_default || pokemon.sprites.front_default || '';
    } else if (spriteVariant === 'back') {
      return pokemon.sprites.back_default || '';
    } else {
      return pokemon.sprites.front_shiny || '';
    }
  });

  function playCry() {
    if (pokemon?.cries?.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.play();
    }
  }
</script>

<svelte:head>
  <title>{pokemon ? pokemon.name : 'Loading'} - Pokédex</title>
</svelte:head>

<div class="space-y-8">
  <a href="/" class="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold">
    <ArrowLeft class="w-4 h-4" />
    Back to Pokédex
  </a>

  {#if error}
    <div class="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
      Error: {error}
    </div>
  {/if}

  {#if loading}
    <div class="text-center py-12">Loading...</div>
  {:else if pokemon}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Left: Image & Sprites -->
      <div class="space-y-4">
        <div class="bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
          <PokemonImage
            src={spriteUrl}
            alt={pokemon.name}
          />
        </div>

        <div class="flex gap-2">
          <button
            onclick={() => (spriteVariant = 'front')}
            class={`flex-1 py-2 rounded-lg font-semibold transition ${
              spriteVariant === 'front'
                ? 'bg-red-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700'
            }`}
          >
            Front
          </button>
          <button
            onclick={() => (spriteVariant = 'back')}
            class={`flex-1 py-2 rounded-lg font-semibold transition ${
              spriteVariant === 'back'
                ? 'bg-red-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700'
            }`}
          >
            Back
          </button>
          <button
            onclick={() => (spriteVariant = 'shiny')}
            class={`flex-1 py-2 rounded-lg font-semibold transition ${
              spriteVariant === 'shiny'
                ? 'bg-red-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700'
            }`}
          >
            Shiny
          </button>
        </div>

        {#if pokemon.cries?.latest}
          <button
            onclick={playCry}
            class="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            <Volume2 class="w-5 h-5" />
            Play Cry
          </button>
        {/if}
      </div>

      <!-- Right: Details -->
      <div class="space-y-6">
        <div>
          <p class="text-sm text-slate-500 dark:text-slate-400">#{String(pokemon.id).padStart(4, '0')}</p>
          <div class="flex items-center justify-between mb-2">
            <h1 class="text-4xl font-bold capitalize">{pokemon.name}</h1>
            <button
              onclick={toggleFavorite}
              class="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg
                class="w-6 h-6 {isFavorited ? 'fill-red-600 text-red-600' : ''}"
                viewBox="0 0 24 24"
                fill={isFavorited ? 'currentColor' : 'none'}
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Types -->
        <div>
          <h2 class="text-lg font-bold mb-2">Type</h2>
          <div class="flex flex-wrap gap-2">
            {#each pokemon.types as { type }}
              <TypeBadge type={type.name} />
            {/each}
          </div>
        </div>

        <!-- Size -->
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Height</p>
            <p class="text-2xl font-bold">{(pokemon.height / 10).toFixed(1)} m</p>
          </div>
          <div class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">Weight</p>
            <p class="text-2xl font-bold">{(pokemon.weight / 10).toFixed(1)} kg</p>
          </div>
        </div>

        <!-- Base Stats -->
        <div>
          <h2 class="text-lg font-bold mb-4">Base Stats</h2>
          <div class="space-y-3">
            {#each pokemon.stats as { stat, base_stat }}
              <div>
                <div class="flex justify-between mb-1">
                  <span class="text-sm font-semibold capitalize">{stat.name}</span>
                  <span class="text-sm font-bold">{base_stat}</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    class="bg-gradient-to-r from-red-500 to-orange-500 h-full transition-all duration-500"
                    style="width: {(base_stat / 255) * 100}%"
                  />
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Abilities -->
        {#if pokemon.abilities.length > 0}
          <div>
            <h2 class="text-lg font-bold mb-2">Abilities</h2>
            <div class="space-y-1">
              {#each pokemon.abilities as { ability, is_hidden }}
                <div class="flex items-center justify-between p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <span class="capitalize">{ability.name}</span>
                  {#if is_hidden}
                    <span class="text-xs bg-yellow-200 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-200 px-2 py-1 rounded">
                      Hidden
                    </span>
                  {/if}
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Moves -->
        {#if pokemon.moves.length > 0}
          <div>
            <h2 class="text-lg font-bold mb-2">Sample Moves</h2>
            <div class="grid grid-cols-2 gap-2">
              {#each pokemon.moves.slice(0, 8) as { move }}
                <div class="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg capitalize text-sm">
                  {move.name}
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>