/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { 950: '#06070A', 900: '#0A0C11', 850: '#0E1118', 800: '#131722', 700: '#1C2130', 600: '#2A3142' },
        fog: { 100: '#E8ECF4', 300: '#B4BCCD', 400: '#8A93A8', 500: '#646D82' },
        signal: { cyan: '#5EE6F0', blue: '#5B8CFF', violet: '#9D7BFF', green: '#4ADE9B', amber: '#F5B54A' },
      },
      fontFamily: {
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: { page: '1180px' },
      keyframes: {
        pulseDot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '.35' } },
      },
      animation: { pulseDot: 'pulseDot 2.4s ease-in-out infinite' },
    },
  },
  plugins: [],
}
