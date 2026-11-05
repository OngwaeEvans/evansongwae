/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: { xs: '360px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    extend: {
      colors: {
        bg: v('bg'), bg2: v('bg2'), panel: v('panel'), surface: v('surface'), line: v('line'),
        ink: v('ink'), mute: v('mute'), hi: v('hi'), cobalt: v('cobalt'),
      },
      fontFamily: {
        display: ['Kanit', 'sans-serif'],
        head: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      maxWidth: { app: '1440px' },
      borderRadius: { DEFAULT: '2px' },
    },
  },
  plugins: [],
};
