/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  screens: {
    tablet: "640px",
    // => @media (min-width: 640px) { ... }

    laptop: "1024px",
    // => @media (min-width: 1024px) { ... }

    desktop: "1280px",
    // => @media (min-width: 1280px) { ... }
  },
  theme: {
    extend: {
      colors: {
        primary: "#1c2130",
        primaryLight: "#272f45",
        secondary: "#028f76",
        secondaryLight: "#009c80",
        third: "#ffeaad",
        white: "#ffffff",
        error1: "rgba(255, 102, 51, 1)",
        error: "rgba(255, 102, 51, 0.8)",
        errorLight: "rgba(255, 102, 51, 0.5)",
        greyRgba: "rgba(0,0,0,0.3)",
        global: "rgb(43, 42, 51)",
      },
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "95v": "95vh",
        "100v": "100vh",
      },
    },
  },
  plugins: [],
};
