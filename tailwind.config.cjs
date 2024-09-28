/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Racing Sans One", ...defaultTheme.fontFamily.sans],
      },
      screens: {
        touch: { raw: "(pointer: coarse)" },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
