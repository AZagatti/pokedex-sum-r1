import { writable } from 'svelte/store';

function createFavoritesStore() {
  const storedFavorites = typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('favorites') || '[]') : [];
  const { subscribe, set, update } = writable<number[]>(storedFavorites);

  return {
    subscribe,
    toggle(id: number) {
      update((current) => {
        const next = current.includes(id) ? current.filter((fav) => fav !== id) : [...current, id];
        if (typeof localStorage !== 'undefined') localStorage.setItem('favorites', JSON.stringify(next));
        return next;
      });
    },
    isFavorite(id: number, favorites: number[]) {
      return favorites.includes(id);
    },
  };
}

export const favorites = createFavoritesStore();
