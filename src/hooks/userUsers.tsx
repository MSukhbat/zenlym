import { users } from "@prisma/client";
import { create } from "zustand";

type UseUserStore = {
  user: users | null;
  setUser: (user: users | null) => void;
};

export const useUsers = create<UseUserStore>((set) => ({
  user: null,
  setUser: (user: users | null) => set((state) => ({ ...state, user })),
}));
