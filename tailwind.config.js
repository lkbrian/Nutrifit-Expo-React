/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "*.{jsx,tsx,ts,js}",
    "./components/**/*.{js,tsx,ts,jsx}",
    "./screens/**/*.{js,tsx,ts,jsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        outfitregular: ["OutfitRegular", "Trebuchet MS"],
        outfitmedium: ["OutfitMedium", "Trebuchet MS"],
        outfitsemibold: ["OutfitSemibold", "Trebuchet MS"],
        outfitbold: ["OutfitBold", "Trebuchet MS"],
        outfitlight: ["OutfitLight", "Trebuchet MS"],
      },
    },
  },
  plugins: [],
};
