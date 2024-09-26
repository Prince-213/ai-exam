import { create } from "zustand";

type Store = {
  regNo: string;
  passCode: string;
  changeRegNo: (value: string) => void;
  changePassCode: (value: string) => void;
};

export const useStore = create<Store>((set) => ({
  regNo: "test",
  passCode: "passTest",
  changeRegNo: (value: string) => set((state) => ({ regNo: value })),

  changePassCode: (value: string) => set((state) => ({ passCode: value })),
}));

export default useStore;
