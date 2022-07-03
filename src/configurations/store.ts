import auth from "firebase/auth";

import create, { StateCreator } from "zustand";

interface AuthSlice {
  user: auth.User | null;
  authenticated: (user: auth.User) => void;
  unauthorized: () => void;
}

const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  user: null,
  authenticated: (user) => set(() => ({ user: user })),
  unauthorized: () => set(() => ({ user: null })),
});

interface HydrationSlice {
  hydrated: boolean;
  hydrate: () => void;
}

const createHydrationSlice: StateCreator<HydrationSlice> = (set) => ({
  hydrated: false,
  hydrate: () => set({ hydrated: true }),
});

const useStore = create<AuthSlice & HydrationSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createHydrationSlice(...a),
}));

export default useStore;
