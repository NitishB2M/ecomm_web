/** @type {import('tailwindcss').Config} */

import { keepTheme } from "keep-react/keepTheme";
const config = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#153043',       // Indigo 600 - modern primary
        secondary: '#6B7280',     // Gray 500 - neutral secondary
        accent: '#F59E0B',        // Amber 500 - energetic accent
        background: '#FFFFFF',    // Light background
        surface: '#F9FAFB',       // Light surface (cards, inputs)
        text: '#111827',          // Gray 900 - strong dark text
        muted: '#9CA3AF',         // Gray 400 - muted text or borders
        border: '#E5E7EB',        // Gray 200 - standard borders
        danger: '#EF4444',        // Red 500 - error/danger
        success: '#10B981',       // Emerald 500 - success/positive
        warning: '#F97316',       // Orange 500 - warning
        info: '#3bb1f6',          // Blue 500 - info/highlight
        hover: '#4338CA',         // Indigo 700 - hover effect
        cta: '#2563EB',           // Blue 600 - call to action button
        ctaText: '#FFFFFF',       // CTA text
        box: '#E8EAEC',           // Gray 400

        dark: {
          background: '#0F172A',    // Slate 900 - dark bg
          surface: '#1E293B',       // Slate 800 - dark surface
          text: '#F8FAFC',          // Light text
          muted: '#64748B',         // Slate 500
          border: '#334155',        // Slate 700
          primary: '#BAC6BC',       // Indigo 400 - softer primary
          accent: '#FBBF24',        // Amber 400
          hover: '#6366F1',         // Indigo 500
          cta: '#3B82F6',           // Blue 500
          ctaText: '#FFFFFF',
          info: '#3bb1f6',
          box: '#374151',
        }
      },
      backdropBlur: {
        'glass': '8px',
      },
      fontFamily: {
        'poppins': ['Poppins'],
      },
    },
  },
  plugins: [],
}

export default keepTheme(config);