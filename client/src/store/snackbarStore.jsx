import { create } from 'zustand'

const useSnackbarStore = create((set) => ({
  isVisible: false,
  message: '',
  type: 'success',
  showSnackbar: ({ message, type = 'success' }) => {
    set({ isVisible: true, message, type });
  },
  closeSnackbar: () => {
    set({ isVisible: false });
  },
}));

export const useShowSnackbar = () => useSnackbarStore((state) => state.showSnackbar);
export const useCloseSnackbar = () => useSnackbarStore((state) => state.closeSnackbar);

export default useSnackbarStore;
