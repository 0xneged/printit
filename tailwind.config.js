/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */

const flowbite = require('flowbite-react/tailwind')

module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './index.html',
    './src/**/!(tailwind).{ts,tsx}',
    flowbite.content(),
  ],
  plugins: [require('@tailwindcss/typography'), flowbite.plugin()],
  theme: {
    extend: {
      keyframes: {
        rotate3d: {
          '0%, 100%': { transform: 'rotate3d(0, 1, 0, 0)' },
          '50%': { transform: 'rotate3d(0, 1, 0, 360deg)' },
        },
      },
      animation: {
        rotate3d: 'rotate3d 3s ease-in-out infinite',
      },
      rotate: {
        360: '360deg',
      },
      screens: {
        se: '375px',
        xs: '440px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        script: ['"Nanum Pen Script"', 'cursive'],
      },
      boxShadow: {
        card: '0 0 0.75rem 0 var(--tw-shadow-color)',
      },
      colors: {
        primary: '#ffffff',
        'primary-bright': '#c997b0',
        'primary-dark': '#ab4774',
        'primary-bg': '#230516',
        hat: '#7e1b52',
        'hat-alt': '#873362',
        'pale-purple': '#904e73',
        neged: '#1E293B',
        secondary: '#f4b862',
        'roulette-box': '#211741',
      },
    },
  },
}
