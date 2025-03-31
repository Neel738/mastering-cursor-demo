'use client';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useQnaStore } from "@/lib/store";

// Create a component to initialize Zustand store
// This is necessary because localStorage is only available in the browser
function StoreInitializer() {
  useEffect(() => {
    // The store will automatically hydrate from localStorage due to our persist middleware
    // This component ensures this happens in a React lifecycle rather than during SSR
  }, []);
  
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <StoreInitializer />
      {children}
    </QueryClientProvider>
  );
} 