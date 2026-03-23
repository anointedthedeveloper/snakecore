/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        mono: ['"Share Tech Mono"', "monospace"],
      },
      colors: {
        neon: {
          green: "#39ff14",
          purple: "#bf5fff",
          blue: "#00f0ff",
          pink: "#ff2d78",
        },
      },
      boxShadow: {
        neon: "0 0 8px #39ff14, 0 0 20px #39ff14",
        "neon-purple": "0 0 8px #bf5fff, 0 0 20px #bf5fff",
      },
    },
  },
  plugins: [],
};
