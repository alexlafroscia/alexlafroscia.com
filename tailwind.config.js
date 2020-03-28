module.exports = {
  theme: {
    darkSelector: '.dark-mode',
    colors: {
      'dark-blue': '#011627',
      frost: 'rgb(178, 204, 214)',
      gold: 'rgb(255, 203, 139)',
      green: 'rgb(173, 219, 103)',
      lavender: 'rgb(199, 146, 234)',
      orange: 'rgb(247, 140, 108)',
      pink: 'rgb(199, 146, 234)',
      red: 'rgb(255, 88, 116)',
      rust: 'rgba(239, 83, 80, 0.56)',
      steel: 'rgb(214, 222, 235)',
      teal: 'rgb(128, 203, 196)',
      black: 'black',
      white: 'white',
      blue: {
        default: 'rgb(130, 170, 255)',
        dark: 'rgb(11, 41, 66)',
      },
      gray: {
        light: '#f5f6f7',
        default: '#5d6469',
        dark: '#3d4449',
      },
    },
    extend: {
      borderColor: {
        current: 'currentColor',
      },
      fontFamily: {
        mono: 'dm',
      },
      maxWidth: {
        readable: '80ch',
        screen: '100vw',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'dark'],
    borderColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover'],
    textColor: ['responsive', 'hover', 'focus', 'dark', 'dark-hover'],
    padding: ['responsive', 'odd', 'even'],
  },
  plugins: [require('tailwindcss-dark-mode')()],
};
