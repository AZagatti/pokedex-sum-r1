<script lang="ts">
  interface Props {
    width?: number;
    height?: number;
  }

  let { width = 200, height = 200 }: Props = $props();
</script>

<div
  class="animate-pulse bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-lg"
  style="width: {width}px; height: {height}px;"
></div>