import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { STORAGE_KEYS } from '../constants/app';

export function useTheme() {
  const [theme, setTheme] = useLocalStorage(STORAGE_KEYS.theme, 'light');
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  return [theme, () => setTheme((current) => current === 'dark' ? 'light' : 'dark')];
}
