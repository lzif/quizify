import type { Config } from "tailwindcss";
import { addDynamicIconSelectors } from "@iconify/tailwind"
export default {
  darkMode: "class",
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    addDynamicIconSelectors()
  ],
} satisfies Config;
