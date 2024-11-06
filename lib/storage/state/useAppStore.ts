// lib/storage/state/useAppStore.ts
import { create } from 'zustand';

interface AppState {
  isSettingsOpen: boolean;
  settingsTab: 'appearance' | 'userProfile';
  openSettings: () => void;
  closeSettings: () => void;
  setSettingsTab: (tab: 'appearance' | 'userProfile') => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSettingsOpen: false,
  settingsTab: 'appearance',
  openSettings: () => set({ isSettingsOpen: true }),
  closeSettings: () => set({ isSettingsOpen: false }),
  setSettingsTab: (tab) => set({ settingsTab: tab }),
}));
