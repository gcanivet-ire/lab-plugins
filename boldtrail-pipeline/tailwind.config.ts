import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#05205E',
          dark: '#0f0e17',
          pink: '#f00069',
          purple: '#CD00FC',
          blue: '#364C7E',
          muted: '#99A4BD',
          'gray-light': '#F3F5F7',
          'gray-mid': '#DADEE7',
        },
      },
      borderRadius: {
        pill: '50px',
        card: '16px',
      },
      boxShadow: {
        card: '0 2px 20px rgba(153, 153, 153, 0.2)',
        'card-hover': '0 4px 32px rgba(153, 153, 153, 0.35)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #DC00F9 0%, #FE0007 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
