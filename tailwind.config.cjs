module.exports = {
  mode: "jit",
  content: ["src/**/*.css", "src/**/*.html", "src/**/*.svelte"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        readable: "80ch",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
