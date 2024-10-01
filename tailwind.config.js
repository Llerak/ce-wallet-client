module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'custom-light':
          '-6px -6px 12px rgba(255, 161, 129, 0.2), 6px 6px 12px rgba(211, 121, 97, 1)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
