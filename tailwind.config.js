/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mintOrange: '#FF9215',
      },
      fontFamily: {
        'capsules': ['Capsules-500', 'sans-serif'],
      },
    }

  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}