import { createContext } from "react";

export function toggle(mode) {
  return mode === "dark" ? "light" : "dark";
}

const DarkMode = createContext({
  mode: "light",
  toggle
});

export default DarkMode;
