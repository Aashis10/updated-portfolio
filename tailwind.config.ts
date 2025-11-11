import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./styles/**/*.{css}", "./data/**/*.{json}"],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: "#3b82f6" }
      }
    }
  },
  plugins: []
} satisfies Config;