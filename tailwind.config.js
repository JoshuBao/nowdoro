import { Config } from "tailwindcss";

const config = {
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
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#a000ff",
          "secondary": "#0033ff",
          "accent": "#00b9ff",
          "neutral": "#001419",
          "base-100": "#162d2f",
          "info": "#1590ff",
          "success": "#67e700",
          "warning": "#c68700",
          "error": "#ff3d78",
        },
      },
      "light", 
      "dark",
      "nord",
    ],
  },
};

export default config;
