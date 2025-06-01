"use client";

import { useAtom } from "jotai";
import { themeAtom } from "@/lib/store";
import {
  ActionIcon,
  Container,
  Group,
  Title,
  Button,
  Divider,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import Link from "next/link";

export default function Header() {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      console.log(
        "Theme toggled to:",
        newTheme,
        "HTML class:",
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    }
  };

  return (
    <Container size="xl">
      <Group justify="space-between">
        <Group>
          <Link href="/">
            <Title order={2} c="indigo">
              Job Board
            </Title>
          </Link>

          <Divider size="sm" orientation="vertical" color="dark" />
          <Link href="/favorites">
            <Title order={3} c="indigo">
              Favourites
            </Title>
          </Link>
        </Group>
        <ActionIcon
          onClick={toggleTheme}
          variant="subtle"
          size="lg"
          radius="md"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <IconMoon size={20} /> : <IconSun size={20} />}
        </ActionIcon>
      </Group>
    </Container>
  );
}
