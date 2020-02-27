'use strict';

const isProduction = process.env.NODE_ENV === 'production';

const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: ['./src/**/*.tsx', './src/**/*.css'],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],

  whitelistPatterns: [
    // Ensure that the icon classes are not stripped
    /^icon/
  ]
});

module.exports = () => ({
  plugins: [require('tailwindcss'), ...(isProduction || process.env.PURGE_CSS ? [purgecss] : [])]
});
