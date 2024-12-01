import { create } from 'zustand'

const useSnackbarStore = create((set) => ({
  isVisible: false,
  message: '',
  type: 'success',
  showSnackbar: ({ message, type = 'success', duration = 3000 }) => {
    set({ isVisible: true, message, type });
  },
  closeSnackbar: () => {
    set({ isVisible: false });
  },
}));

export const useShowSnackbar = () => useSnackbarStore((state) => state.showSnackbar);
export const useCloseSnackbar = () => useSnackbarStore((state) => state.useCloseSnackbar);

export default useSnackbarStore;
