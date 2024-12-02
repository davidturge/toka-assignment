import { create } from 'zustand';
import { searchProjectsApi } from '../services/projects'
import { EntityType } from '../constants'

const useNavigationStore = create((set) => ({
  searchOptions: {
    type: EntityType.PROJECT,
    api: searchProjectsApi,
    handler: () => false
  },
  createItemHandler: null,
  showBackButton: false,
  setCreateItemHandler: (handler) => set({ createItemHandler: handler }),
  setShowBackButton: (isBackButtonVisible) => set({ showBackButton: isBackButtonVisible }),
  setSearchOptions: (options) => set({ searchOptions: options })
}));

export const useShowBackButton = () => useNavigationStore((state) => state.showBackButton);
export const useCreateItemHandler = () => useNavigationStore((state) => state.createItemHandler);
export const useSearchOptions = () => useNavigationStore((state) => state.searchOptions);
export const useSetShowBackButton = () => useNavigationStore((state) => state.setShowBackButton);
export const useSetCreateItemHandler = () => useNavigationStore((state) => state.setCreateItemHandler);
export const useSetSearchOptions = () => useNavigationStore((state) => state.setSearchOptions);

export default useNavigationStore;
