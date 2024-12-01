import { create } from 'zustand';

const useNavigationStore = create((set) => ({
  showBackButton: false,
  setShowBackButton: (isBackButtonVisible) => set({ showBackButton: isBackButtonVisible }),
}));

export const useShowBackButton = () => useNavigationStore((state) => state.showBackButton);
export const useSetShowBackButton = () => useNavigationStore((state) => state.setShowBackButton);
