import { useEffect, useState } from 'react';

export function useTheme() {
  const root = document.documentElement;
  const [theme, setTheme] = useState(() => root.dataset.theme);
  const [hasPreference, setHasPreference] = useState(() => Boolean(root.dataset.themePreference));

  useEffect(() => {
    if (hasPreference) return;
    const system = window.matchMedia('(prefers-color-scheme: dark)');
    function sync() {
      const next = system.matches ? 'dark' : 'light';
      root.dataset.theme = next;
      setTheme(next);
    }
    sync();
    system.addEventListener('change', sync);
    return () => system.removeEventListener('change', sync);
  }, [hasPreference, root]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    root.dataset.themePreference = next;
    try {
      localStorage.setItem('slm-theme', next);
    } catch {
      // The current page still supports theme switching when storage is unavailable.
    }
    setHasPreference(true);
    setTheme(next);
  }

  return { theme, toggleTheme };
}
