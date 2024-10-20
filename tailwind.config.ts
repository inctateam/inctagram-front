import type { Config } from 'tailwindcss'

import tailwindcss_animate from 'tailwindcss-animate'

import { palette } from './src/styles/palette'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [tailwindcss_animate],
  theme: {
    extend: {
      colors: {
        ...palette,
      },
      fontSize: {
        '2.5xl': ['1.625rem', '2.25rem'],
        lg: ['1.125rem', '1.5rem'],
        sm: ['0.875rem', '1.5rem'],
        xl: ['1.25rem', '2.25rem'],
      },
      keyframes: {
        rotation: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
}

export default config
