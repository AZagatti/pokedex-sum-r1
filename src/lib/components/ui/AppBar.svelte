<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { Sun, Moon, Heart } from 'lucide-svelte';
</script>

<header
  class="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
>
  <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
    <a href="/" class="text-2xl font-bold text-red-600">Pokédex</a>
    <nav class="flex gap-6 items-center">
      <a href="/" class="hover:text-red-600 transition-colors">Home</a>
      <a href="/berries" class="hover:text-red-600 transition-colors">Berries</a>
      <a href="/favorites" class="hover:text-red-600 transition-colors">
        <Heart size={20} class="inline" />
      </a>
      <button
        on:click={() => theme.toggle()}
        class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Toggle theme"
      >
        {#if $theme === 'dark'}
          <Sun size={20} />
        {:else}
          <Moon size={20} />
        {/if}
      </button>
    </nav>
  </div>
</header>
