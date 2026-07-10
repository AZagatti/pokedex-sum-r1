<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { ArrowLeft } from 'lucide-svelte';
  import { getBerryDetail } from '$lib/api';
  import type { Berry } from '$lib/api/schemas';

  let berry: Berry | null = $state(null);
  let loading = $state(true);
  let error = $state('');

  onMount(async () => {
    try {
      const name = $page.params.name;
      berry = await getBerryDetail(name);
    } catch (e) {
      error = String(e);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{berry ? berry.name : 'Loading'} - Berries - Pokédex</title>
</svelte:head>

<div class="space-y-8">
  <a href="/berries" class="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold">
    <ArrowLeft class="w-4 h-4" />
    Back to Berries
  </a>

  {#if error}
    <div class="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
      Error: {error}
    </div>
  {/if}

  {#if loading}
    <div class="text-center py-12">Loading...</div>
  {:else if berry}
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-gradient-to-br from-red-100 to-purple-100 dark:from-red-900 dark:to-purple-900 rounded-lg aspect-square flex items-center justify-center">
        <svg class="w-32 h-32 text-red-600 dark:text-red-400" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="40" r="20" opacity="0.8" />
          <path d="M 45 35 Q 50 25 55 35 Z" />
        </svg>
      </div>

      <div class="space-y-6">
        <div>
          <h1 class="text-4xl font-bold capitalize mb-2">{berry.name}</h1>
          <p class="text-slate-600 dark:text-slate-400">Berry #{berry.id}</p>
        </div>

        <div class="space-y-4">
          <div class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
            <h2 class="text-lg font-bold mb-2">Properties</h2>
            <dl class="space-y-2">
              <div>
                <dt class="text-sm text-slate-600 dark:text-slate-400">Firmness</dt>
                <dd class="font-semibold capitalize">{berry.firmness?.name || 'N/A'}</dd>
              </div>
              <div>
                <dt class="text-sm text-slate-600 dark:text-slate-400">Growth Time</dt>
                <dd class="font-semibold">{berry.growth_time} hours</dd>
              </div>
              <div>
                <dt class="text-sm text-slate-600 dark:text-slate-400">Natural Gift Power</dt>
                <dd class="font-semibold">{berry.natural_gift_power || 'N/A'}</dd>
              </div>
              <div>
                <dt class="text-sm text-slate-600 dark:text-slate-400">Natural Gift Type</dt>
                <dd class="font-semibold capitalize">{berry.natural_gift_type?.name || 'N/A'}</dd>
              </div>
              <div>
                <dt class="text-sm text-slate-600 dark:text-slate-400">Size (mm)</dt>
                <dd class="font-semibold">{berry.size}</dd>
              </div>
              <div>
                <dt class="text-sm text-slate-600 dark:text-slate-400">Smoothness</dt>
                <dd class="font-semibold">{berry.smoothness}</dd>
              </div>
            </dl>
          </div>

          {#if berry.flavors.length > 0}
            <div class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg">
              <h2 class="text-lg font-bold mb-2">Flavors</h2>
              <div class="space-y-2">
                {#each berry.flavors as flavor}
                  <div class="flex justify-between">
                    <span class="capitalize">{flavor.flavor.name}</span>
                    <span class="font-semibold">{flavor.potency}</span>
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/if}
</div>