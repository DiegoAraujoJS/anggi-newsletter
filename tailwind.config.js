/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'palette-1': "#D6D46D",
        'palette-2': "#F4DFB6",
        'palette-3': "#DE8F5F",
        'palette-4': "#9A4444",
      },
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        anggi: {
          "primary": "#D6D46D",
          "secondary": "#9A4444",
          "accent": "#DE8F5F",
          "base-100": "#F2EAD3"
        }
      },
      'dark',
    ]
  }
}

