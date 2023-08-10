import { useEffect } from 'react';
import { create } from 'zustand';

interface OfflineStore {
  offline: boolean;
  setOffline: () => void;
}

export default function useOfflineMode() {
  const { offline, setOffline } = offlineStore();

  useEffect(() => {
    offline
      ? localStorage.setItem('offline', '')
      : localStorage.removeItem('offline');
  }, [offline]);

  return [offline, setOffline] as const;
}

export const offlineStore = create<OfflineStore>((set) => ({
  offline: localStorage.getItem('offline') !== null ? true : false,
  setOffline: () =>
    set((state) => ({
      offline: !state.offline,
    })),
}));
