module.exports = {
  plugins: [
    // Tailwind has their own nesting compat later that must be used
    require("tailwindcss/nesting"),

    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
