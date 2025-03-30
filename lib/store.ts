import { create } from 'zustand';

interface User {
  id: string;
  name: string;
}

interface QnaStore {
  // User state
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  // UI state
  isCreatingLink: boolean;
  setIsCreatingLink: (isCreating: boolean) => void;
  
  // Navigation state
  currentLinkSlug: string | null;
  setCurrentLinkSlug: (slug: string | null) => void;
}

export const useQnaStore = create<QnaStore>((set) => ({
  // User state
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  
  // UI state
  isCreatingLink: false,
  setIsCreatingLink: (isCreating) => set({ isCreatingLink: isCreating }),
  
  // Navigation state
  currentLinkSlug: null,
  setCurrentLinkSlug: (slug) => set({ currentLinkSlug: slug }),
})); 