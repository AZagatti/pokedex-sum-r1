<script lang="ts">
  import Header from './Header.svelte';

  interface Props {
    children: any;
  }

  let { children }: Props = $props();
</script>

<Header />
<main class="container mx-auto px-4 py-8">
  {@render children?.()}
</main>