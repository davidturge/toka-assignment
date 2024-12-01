import { create } from 'zustand';

const useModalStore = create((set) => ({
  isOpen: false,
  modalContent: null,
  openModal: (content = null) => set({ isOpen: true, modalContent: content }),
  closeModal: () => set({ isOpen: false, modalContent: null }),
}));

export const useOpenModal = () => useModalStore((state) => state.openModal);
export const useCloseModal = () => useModalStore((state) => state.closeModal);

export default useModalStore;
