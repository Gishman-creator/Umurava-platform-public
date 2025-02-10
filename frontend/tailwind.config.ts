import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			'primary': 'rgba(43, 113, 240, 1)',
			'secondary': 'rgba(4, 23, 56, 1)',
			'third': 'rgba(0, 26, 64, 1)',
      'light-gray': 'rgba(241, 241, 241, 1)',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
