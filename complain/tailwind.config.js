module.exports = {
  purge: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      ringWidth: {
        '5': '5px',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      textColor: ['disabled'],
      cursor: ['disabled'],
      fontWeight: ['dark'],
    },
  },
  plugins: [],
}
