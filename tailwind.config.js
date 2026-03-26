/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#04111f',
        mist: '#dff7ff',
        cyan: '#74f2ff',
        coral: '#ff8a6c',
        sun: '#ffd36a',
        slate: '#6f89a6',
      },
      boxShadow: {
        glow: '0 0 60px rgba(116, 242, 255, 0.22)',
      },
      backgroundImage: {
        grain:
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Sora"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
