module.exports = {
  content: [
    './App.js',
    './Pages.js',
    './src/**/**/*.{tsx,jsx,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
