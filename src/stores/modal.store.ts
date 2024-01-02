import { create } from 'zustand';

type Modal = {
  isModalOpen: boolean;
  toggleModal: (arg: boolean) => void;
};

const useModalStore = create<Modal>((set) => ({
  isModalOpen: false,
  toggleModal: (arg: boolean) =>
    set((state) => ({ ...state, isModalOpen: arg })),
}));

export { useModalStore };
