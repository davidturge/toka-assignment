import { create } from 'zustand';

const useModalStore = create((set) => ({
  isOpen: false,
  isModalLoading: false,
  modalContent: null,
  openModal: (content = null) => set({ isOpen: true, modalContent: content }),
  closeModal: () => set({ isOpen: false, modalContent: null,  isModalLoading: false}),
  setIsModalLoading: (isLoading) => set({ isModalLoading: isLoading }),
}));

export const useIsModalLoading = () => useModalStore((state) => state.isModalLoading);
export const useOpenModal = () => useModalStore((state) => state.openModal);
export const useCloseModal = () => useModalStore((state) => state.closeModal);
export const useSetIsModalLoading = () => useModalStore((state) => state.setIsModalLoading);

export default useModalStore;
