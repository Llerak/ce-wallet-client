module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '0 20px 27px 0 rgba(0,0,0,.05)',
        'custom-gray': '-6px -6px 12px #F0F0F0, 6px 6px 12px #D9D9D9',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
