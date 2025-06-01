"use client";

import { MantineProvider } from "@mantine/core";
import { theme } from "@/mantine-theme";
import { useSetAtom } from "jotai";
import { initializeThemeAtom, initializeFavoriteJobsAtom } from "@/lib/store";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const initializeTheme = useSetAtom(initializeThemeAtom);
  const initializeFavoriteJobs = useSetAtom(initializeFavoriteJobsAtom);

  useEffect(() => {
    initializeTheme();
    initializeFavoriteJobs();
  }, [initializeTheme, initializeFavoriteJobs]);

  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
