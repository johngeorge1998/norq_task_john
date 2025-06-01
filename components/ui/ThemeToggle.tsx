"use client";

import { useAtom } from "jotai";
import { themeAtom } from "@/lib/store";
import { ActionIcon } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <ActionIcon
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      variant="outline"
      color={theme === "light" ? "indigo" : "yellow"}
      size="lg"
      radius="md"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <IconMoon size={20} /> : <IconSun size={20} />}
    </ActionIcon>
  );
}
