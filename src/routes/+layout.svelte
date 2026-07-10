<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';
  import Header from '$lib/components/ui/Header.svelte';
  import { theme } from '$lib/stores/theme';

  theme.init();

  onMount(() => {
    const unsubscribe = theme.subscribe((value) => {
      document.documentElement.classList.toggle('dark', value === 'dark');
    });
    return unsubscribe;
  });
</script>

<Header />
<main class="min-h-screen">
  <slot />
</main>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    @apply bg-white dark:bg-slate-950 text-slate-950 dark:text-white transition-colors duration-200;
  }
</style>
