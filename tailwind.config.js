module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      width: {
        4.5: '18px'
      },
      height: {
        4.5: '18px'
      },
      colors: {
        optic: {
          purple: '#4F46E5',
          violet: '#F0F3FE',
          black: '#27272A',
          gray: '#D4D4D8'
        }
      }
    }
  },
  plugins: [require('windicss/plugin/forms')]
}
