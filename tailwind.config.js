module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '0 20px 27px 0 rgba(0,0,0,.05)',
        'custom-shadow-icon': '0 .3125rem .625rem 0 rgba(0, 0, 0, .12)',
      },
      backgroundImage: {
        'custom-gradient-linear': 'linear-gradient(90deg, transparent, rgba(0, 0, 0, .2), transparent)',
        'custom-gradient-icon-active': 'linear-gradient(135deg, #eb6b48, #f58d71)',
        'custom-gradient-icon': 'linear-gradient(310deg,#e9ecef,#e9ecef)',
        'custom-gradient-dark': 'linear-gradient(310deg, #141727, #3a416f)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
