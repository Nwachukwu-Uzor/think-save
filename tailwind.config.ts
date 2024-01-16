import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "main-blue": "#0E12A2",
        "main-red": "#FE3032",
        "main-red-accent": "#FFC8C8",
        "accent-blue": "#EDF1FC",
        black: "#1E1E1E",
        fade: "#B7B7B7",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
export default config;
