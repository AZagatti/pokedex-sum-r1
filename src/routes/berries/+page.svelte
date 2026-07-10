<script lang="ts">
  import { onMount } from 'svelte';
  import { Link } from 'lucide-svelte';
  import { getBerryList, getBerryDetail } from '$lib/api';
  import Skeleton from '$lib/components/ui/Skeleton.svelte';
  import type { Berry } from '$lib/api/schemas';

  let berries: Berry[] = $state([]);
  let loading = $state(true);
  let error = $state('');

  onMount(async () => {
    try {
      const list = await getBerryList(50, 0);
      berries = await Promise.all(
        list.results.map((b) => getBerryDetail(b.name))
      );
    } catch (e) {
      error = String(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Berries - Pokédex</title>
</svelte:head>

<div class="space-y-6">
  <div>
    <h1 class="text-4xl font-bold mb-2">Berries</h1>
    <p class="text-slate-600 dark:text-slate-400">Explore all Pokémon berries and their effects</p>
  </div>

  {#if error}
    <div class="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
      Error: {error}
    </div>
  {/if}

  {#if loading}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {#each Array(12) as _}
        <Skeleton width={200} height={240} />
      {/each}
    </div>
  {:else if berries.length === 0}
    <div class="text-center py-12">
      <p class="text-slate-500 dark:text-slate-400">No berries found</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {#each berries as berry (berry.id)}
        <a
          href="/berries/{berry.name}"
          class="group bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 p-4"
        >
          <div class="aspect-square bg-gradient-to-br from-red-100 to-purple-100 dark:from-red-900 dark:to-purple-900 rounded-lg flex items-center justify-center mb-4 group-hover:text-red-600 transition">
            <svg class="w-16 h-16" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="40" r="20" opacity="0.8" />
              <path d="M 45 35 Q 50 25 55 35 Z" />
            </svg>
          </div>
          <h3 class="font-bold text-lg capitalize mb-2 group-hover:text-red-600 transition">{berry.name}</h3>
          <div class="text-sm text-slate-600 dark:text-slate-400 space-y-1">
            <p><strong>Firmness:</strong> {berry.firmness?.name || 'N/A'}</p>
            <p><strong>Growth Time:</strong> {berry.growth_time}h</p>
          </div>
        </a>
      {/each}
    </div>
  {/if}
</div>