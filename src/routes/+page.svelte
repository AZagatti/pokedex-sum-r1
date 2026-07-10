<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { Search, Filter, RotateCcw } from 'lucide-svelte';
  import PokemonCard from '$lib/components/PokemonCard.svelte';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import { getPokemonList, getPokemonDetail, getGeneration, getType } from '$lib/api';
  import type { PokemonDetail } from '$lib/api/schemas';

  let pokemon: PokemonDetail[] = $state([]);
  let loading = $state(true);
  let error = $state('');

  let searchQuery = $state('');
  let selectedTypes = $state<Set<string>>(new Set());
  let selectedGeneration = $state<number | null>(null);
  let sortBy = $state<'id' | 'name' | 'bst'>('id');

  let offset = $state(0);
  const limit = 30;

  let filteredPokemon = $derived.by(() => {
    let results = pokemon;

    // Search by name
    if (searchQuery) {
      results = results.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Filter by types
    if (selectedTypes.size > 0) {
      results = results.filter((p) =>
        p.types.some((t) => selectedTypes.has(t.type.name))
      );
    }

    // Sort
    if (sortBy === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'bst') {
      results.sort((a, b) => {
        const aBst = a.stats.reduce((sum, s) => sum + s.base_stat, 0);
        const bBst = b.stats.reduce((sum, s) => sum + s.base_stat, 0);
        return bBst - aBst;
      });
    }

    return results;
  });

  async function loadMore() {
    try {
      const list = await getPokemonList(limit, offset);
      const details = await Promise.all(
        list.results.map((p) => getPokemonDetail(p.name))
      );
      pokemon = [...pokemon, ...details];
      offset += limit;
    } catch (e) {
      error = String(e);
    }
  }

  function clearFilters() {
    searchQuery = '';
    selectedTypes.clear();
    selectedGeneration = null;
    sortBy = 'id';
  }

  onMount(async () => {
    loading = true;
    try {
      await loadMore();
    } catch (e) {
      error = String(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Pokédex</title>
</svelte:head>

<div class="px-4 py-6 max-w-7xl mx-auto space-y-6">
  <!-- Toolbar -->
  <div class="sticky top-20 z-40 bg-white dark:bg-slate-950 p-4 rounded-lg shadow-md space-y-4 border border-slate-200 dark:border-slate-800">
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Search -->
      <div class="flex-1 relative">
        <Search class="absolute left-3 top-3 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search Pokémon..."
          bind:value={searchQuery}
          class="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <!-- Sort -->
      <select
        bind:value={sortBy}
        class="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        <option value="id">Dex #</option>
        <option value="name">Name</option>
        <option value="bst">Base Stat Total</option>
      </select>

      <!-- Clear -->
      {#if searchQuery || selectedTypes.size > 0 || selectedGeneration}
        <button
          onclick={clearFilters}
          class="flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition"
        >
          <RotateCcw class="w-4 h-4" />
          Clear
        </button>
      {/if}
    </div>

    <!-- Type filters -->
    <div class="flex flex-wrap gap-2">
      {#each ['fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'] as type}
        <button
          onclick={() => {
            if (selectedTypes.has(type)) {
              selectedTypes.delete(type);
              selectedTypes = new Set(selectedTypes);
            } else {
              selectedTypes.add(type);
              selectedTypes = new Set(selectedTypes);
            }
          }}
          class={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition ${
            selectedTypes.has(type)
              ? 'bg-red-600 text-white'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600'
          }`}
        >
          {type}
        </button>
      {/each}
    </div>
  </div>

  {#if error}
    <div class="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
      Error: {error}
    </div>
  {/if}

  {#if loading && pokemon.length === 0}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {#each Array(12) as _}
        <Skeleton width={200} height={240} />
      {/each}
    </div>
  {:else if filteredPokemon.length === 0}
    <div class="text-center py-12">
      <p class="text-slate-500 dark:text-slate-400 mb-2">No Pokémon found</p>
      <button
        onclick={clearFilters}
        class="text-red-600 dark:text-red-400 hover:underline"
      >
        Clear filters
      </button>
    </div>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {#each filteredPokemon as poke (poke.id)}
        <div class="animate-in fade-in" transition:fade={{ duration: 200 }}>
          <PokemonCard pokemon={poke} />
        </div>
      {/each}
    </div>

    {#if pokemon.length < 1000}
      <div class="text-center pt-8">
        <button
          onclick={loadMore}
          disabled={loading}
          class="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white rounded-lg font-semibold transition"
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    {/if}
  {/if}
</div>