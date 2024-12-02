import { create } from 'zustand'
import { SnackbarType } from '../components/snackbar/constants'

const useSnackbarStore = create((set) => ({
  isVisible: false,
  message: '',
  type: SnackbarType.SUCCESS,
  showSnackbar: ({ message, type = SnackbarType.SUCCESS }) => {
    set({ isVisible: true, message, type });
  },
  closeSnackbar: () => {
    set({ isVisible: false });
  },
}));

export const useShowSnackbar = () => useSnackbarStore((state) => state.showSnackbar);
export const useCloseSnackbar = () => useSnackbarStore((state) => state.closeSnackbar);

export default useSnackbarStore;
