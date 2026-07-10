import { writable } from 'svelte/store';

type Theme = 'light' | 'dark';

function createThemeStore() {
  const storedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
  const initialTheme: Theme = (storedTheme as Theme) || 'light';

  const { subscribe, update, set } = writable<Theme>(initialTheme);

  function init() {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', initialTheme === 'dark');
    }
  }

  function toggle() {
    update((current) => {
      const next = current === 'light' ? 'dark' : 'light';
      if (typeof localStorage !== 'undefined') localStorage.setItem('theme', next);
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', next === 'dark');
      }
      return next;
    });
  }

  return {
    subscribe,
    init,
    toggle,
  };
}

export const theme = createThemeStore();
