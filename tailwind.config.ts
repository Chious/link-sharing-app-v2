import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#633CFF",
        purple: "#BEADFF",
        "light-purple": "#EFEBFF",
        black: "#333333",
        "dark-gray": "#737373",
        gray: "#D9D9D9",
        "light-gray": "#FAFAFA",
        white: "#FFFFFF",
        red: "#FF3939",
      },
    },
  },
  plugins: [],
};
export default config;
