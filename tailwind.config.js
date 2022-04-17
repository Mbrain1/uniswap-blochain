module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
       colors: {
        'blue': {
            100: '#00B4C9',
            200: '#CCF0F4',
            700: '#092C39',
            900: '#0B0E16'
          },
       }
    },
  },
  plugins: [],
}
