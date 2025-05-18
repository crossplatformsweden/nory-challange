/** @type {import('tailwindcss').Config} */
import sharedConfig from "@repo/tailwind-config/tailwind.config.js";

export default {
  ...sharedConfig,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
};
