import { atom } from "jotai";
import { Job, JobFilterType } from "./types";

export const jobFilterAtom = atom<JobFilterType>({
  search: "",
  jobType: "",
  remote: false,
});

export const favoriteJobsAtom = atom<Job[]>([]);

export const initializeFavoriteJobsAtom = atom(null, (get, set) => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("favoriteJobs");
    if (saved) {
      set(favoriteJobsAtom, JSON.parse(saved));
    }
  }
});

export const toggleFavoriteAtom = atom(null, (get, set, job: Job) => {
  const current = get(favoriteJobsAtom);
  const exists = current.some((fav) => fav.slug === job.slug);
  const newFavorites = exists
    ? current.filter((fav) => fav.slug !== job.slug)
    : [...current, job];
  set(favoriteJobsAtom, newFavorites);
  if (typeof window !== "undefined") {
    localStorage.setItem("favoriteJobs", JSON.stringify(newFavorites));
  }
});

export const themeAtom = atom<"light" | "dark">("light");

export const initializeThemeAtom = atom(null, (get, set) => {
  if (typeof window !== "undefined") {
    const savedTheme =
      localStorage.getItem("theme") === "dark" ? "dark" : "light";
    set(themeAtom, savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }
});
