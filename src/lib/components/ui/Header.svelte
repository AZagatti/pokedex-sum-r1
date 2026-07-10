<script lang="ts">
  import { Moon, Sun, Menu, X } from 'lucide-svelte';
  import { theme } from '$lib/stores/theme';
  import { page } from '$app/stores';

  let menuOpen = $state(false);

  function toggleTheme() {
    theme.toggle();
  }
</script>

<header class="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 shadow-sm">
  <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
    <a href="/" class="font-bold text-2xl text-red-600">Pokédex</a>

    <ul class="hidden md:flex items-center gap-6">
      <li><a href="/" class="hover:text-red-600 transition">Home</a></li>
      <li><a href="/berries" class="hover:text-red-600 transition">Berries</a></li>
      <li><a href="/favorites" class="hover:text-red-600 transition">Favorites</a></li>
    </ul>

    <div class="flex items-center gap-4">
      <button
        onclick={toggleTheme}
        class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
        aria-label="Toggle theme"
      >
        {#if $theme === 'light'}
          <Moon class="w-5 h-5" />
        {:else}
          <Sun class="w-5 h-5" />
        {/if}
      </button>

      <button
        onclick={() => (menuOpen = !menuOpen)}
        class="md:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
        aria-label="Toggle menu"
      >
        {#if menuOpen}
          <X class="w-5 h-5" />
        {:else}
          <Menu class="w-5 h-5" />
        {/if}
      </button>
    </div>
  </nav>

  {#if menuOpen}
    <nav class="md:hidden bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 p-4">
      <ul class="flex flex-col gap-4">
        <li><a href="/" onclick={() => (menuOpen = false)} class="hover:text-red-600 transition">Home</a></li>
        <li><a href="/berries" onclick={() => (menuOpen = false)} class="hover:text-red-600 transition">Berries</a></li>
        <li><a href="/favorites" onclick={() => (menuOpen = false)} class="hover:text-red-600 transition">Favorites</a></li>
      </ul>
    </nav>
  {/if}
</header>