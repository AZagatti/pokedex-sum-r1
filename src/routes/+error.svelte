<script>
  import { ArrowLeft } from 'lucide-svelte';
</script>

<svelte:head>
  <title>404 - Page Not Found</title>
</svelte:head>

<div class="flex flex-col items-center justify-center min-h-screen text-center">
  <h1 class="text-6xl font-bold text-red-600 mb-4">404</h1>
  <p class="text-xl text-slate-600 dark:text-slate-400 mb-8">This Pokémon fled!</p>
  <a
    href="/"
    class="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
  >
    <ArrowLeft class="w-5 h-5" />
    Return to Pokédex
  </a>
</div>