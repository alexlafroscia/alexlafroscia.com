import { browser } from "$app/env";
import { writable } from "svelte/store";

const SERVER_MATCH_MEDIA = {
  // default to dark mode
  // dark -> light transition is less jarring than light -> dark
  matches: true,

  // stub event listener API
  addEventListener() {
    // no-op
  },
  removeEventListener() {
    // no-op
  },
};

// If the `matchMedia` APU is not available, fall back to dark mode
const prefersDarkScheme = browser
  ? window?.matchMedia?.("(prefers-color-scheme: dark)")
  : SERVER_MATCH_MEDIA;

export const isDarkMode = writable(prefersDarkScheme.matches, (setDarkMode) => {
  function handlePreferenceChange(change: MediaQueryListEvent) {
    setDarkMode(change.matches);
  }

  prefersDarkScheme.addEventListener("change", handlePreferenceChange);

  return () => {
    prefersDarkScheme.removeEventListener("change", handlePreferenceChange);
  };
});
