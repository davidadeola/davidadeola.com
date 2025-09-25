"use client";

import { SearchProvider } from "@/hooks/useSearchQuery";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      <SearchProvider>{children}</SearchProvider>
    </ThemeProvider>
  );
}
