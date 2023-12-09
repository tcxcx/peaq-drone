import type { Config } from 'tailwindcss'
const plugin = require("tailwindcss/plugin")
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette")
const svgToDataUri = require("mini-svg-data-uri")

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gray-bg': '#303334',
        'basement-green': '#00ff6a',
        'basement-purple': '#4c09f6',
        'basement-indigo': '#a370ff',
        'basement-tone-purple': '#5e22f7',
        'black-tr': 'rgba(0, 0, 0, 0.95)',
      },

      opacity: {
        2.5: "0.025",
        15: "0.15",
      },

      animation: {
        marquee: "marquee 30s linear infinite",
      },

      keyframes: {
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
      },
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        ribbon: ['RibbonFa', 'sans-serif'],
        ribbon_hvy: ['RibbonFaHeavy', 'sans-serif'],
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }: { matchUtilities: any, theme: any }) {
      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" stroke="${value}" fill="none"><path d="M64 0H0V64"/></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme("backgroundColor")),
          type: ["color"],
        },
      )

      matchUtilities(
        {
          "bg-grid": (value: any) => ({
            backgroundSize: value,
          }),
        },
        {
          values: theme("spacing"),
          type: ["number", "length", "any"],
        },
      )
    }),
  ],
}
export default config
