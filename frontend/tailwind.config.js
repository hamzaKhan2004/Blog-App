/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite/plugin";
import tailwindScrollbar from "tailwind-scrollbar";
// import lineClamp from "@tailwindcss/line-clamp";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite,
    tailwindScrollbar,
    // lineClamp, // Import and include line-clamp as a plugin
  ],
};
