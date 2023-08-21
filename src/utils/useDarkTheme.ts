import { useEffect } from 'react';
import { create } from 'zustand';

interface ThemeStore {
  darkTheme: boolean;
  setDarkTheme: () => void;
}

export default function useDarkTheme() {
  const { darkTheme, setDarkTheme } = darkThemeStore();

  useEffect(() => {
    darkTheme ? (localStorage.theme = 'dark') : (localStorage.theme = 'light');

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkTheme]);

  return [darkTheme, setDarkTheme] as const;
}

export const darkThemeStore = create<ThemeStore>((set) => ({
  darkTheme: localStorage.theme === 'dark',
  setDarkTheme: () =>
    set((state) => ({
      darkTheme: !state.darkTheme
    })),
}));
