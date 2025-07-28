// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // enable class-based dark mode
  content: ['./src/**/*.{ts,tsx,js,jsx,html}'],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
