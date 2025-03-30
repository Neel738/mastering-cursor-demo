import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
}

interface QnaStore {
  // User state
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  
  // UI state
  isCreatingLink: boolean;
  setIsCreatingLink: (isCreating: boolean) => void;
  
  // Navigation state
  currentLinkSlug: string | null;
  setCurrentLinkSlug: (slug: string | null) => void;
}

export const useQnaStore = create<QnaStore>()(
  persist(
    (set, get) => ({
      // User state
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null }),
      isAuthenticated: () => get().currentUser !== null,
      
      // UI state
      isCreatingLink: false,
      setIsCreatingLink: (isCreating) => set({ isCreatingLink: isCreating }),
      
      // Navigation state
      currentLinkSlug: null,
      setCurrentLinkSlug: (slug) => set({ currentLinkSlug: slug }),
    }),
    {
      name: 'qna-store', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ currentUser: state.currentUser }), // only persist the user state
    }
  )
); 