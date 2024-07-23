import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screen: {
        tablet: "48rem",
        desktop: "80rem",
      },
      pseudoElements: {
        before: "before",
        after: "after",
      },
      spacing: {
        "mobile-spacing": "1rem",
        "desktop-spacing": "1.5rem",
        "dynamic-vh": "calc(100dvh - 3.5rem)",
      },
      colors: {},
      fontSize: {},
    },
  },
  plugins: [],
};
export default config;
