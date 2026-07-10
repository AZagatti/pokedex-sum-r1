<script lang="ts">
  interface Props {
    type: string;
  }

  let { type }: Props = $props();

  const typeColors: Record<string, { bg: string; text: string }> = {
    normal: { bg: 'bg-gray-400', text: 'text-gray-900' },
    fire: { bg: 'bg-red-500', text: 'text-white' },
    water: { bg: 'bg-blue-500', text: 'text-white' },
    electric: { bg: 'bg-yellow-400', text: 'text-gray-900' },
    grass: { bg: 'bg-green-500', text: 'text-white' },
    ice: { bg: 'bg-cyan-400', text: 'text-gray-900' },
    fighting: { bg: 'bg-red-700', text: 'text-white' },
    poison: { bg: 'bg-purple-500', text: 'text-white' },
    ground: { bg: 'bg-yellow-600', text: 'text-white' },
    flying: { bg: 'bg-blue-400', text: 'text-white' },
    psychic: { bg: 'bg-pink-500', text: 'text-white' },
    bug: { bg: 'bg-green-600', text: 'text-white' },
    rock: { bg: 'bg-gray-600', text: 'text-white' },
    ghost: { bg: 'bg-purple-600', text: 'text-white' },
    dragon: { bg: 'bg-indigo-600', text: 'text-white' },
    dark: { bg: 'bg-gray-800', text: 'text-white' },
    steel: { bg: 'bg-slate-400', text: 'text-gray-900' },
    fairy: { bg: 'bg-pink-400', text: 'text-white' },
  };

  const typeLower = type.toLowerCase();
  const colors = typeColors[typeLower] || typeColors.normal;
</script>

<span class={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${colors.bg} ${colors.text}`}>
  {type}
</span>