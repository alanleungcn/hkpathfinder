module.exports = {
  importOrder: [
    "^pages/(.*)$",
    "^components/(.*)$",
    "^hooks/(.*)$",
    "^store/(.*)$",
    "^utils/(.*)$",
    "^commons/(.*)$",
    "^styles/(.*)$",
    "^[./]",
  ],
  plugins: [require("prettier-plugin-tailwindcss")],
};
