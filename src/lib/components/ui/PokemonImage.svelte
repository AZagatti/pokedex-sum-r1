<script lang="ts">
  interface Props {
    src: string;
    alt: string;
  }

  let { src, alt }: Props = $props();
</script>

<img
  {src}
  {alt}
  class="w-full h-full object-contain bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900"
  loading="lazy"
/>