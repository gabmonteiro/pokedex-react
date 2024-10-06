/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        bug: 'rgb(163 230 53)',          // bg-lime-400
        dark: 'rgb(23 23 23)',           // bg-neutral-900
        dragon: 'rgb(55 48 163)',        // bg-indigo-700
        electric: 'rgb(234 179 8)',      // bg-yellow-500
        fairy: 'rgb(244 194 194)',       // bg-pink-300
        fighting: 'rgb(120 42 42)',      // bg-orange-950
        fire: 'rgb(220 38 38)',          // bg-red-600
        flying: 'rgb(125 211 252)',      // bg-sky-300
        ghost: 'rgb(49 46 129)',         // bg-indigo-950
        grass: 'rgb(34 197 94)',         // bg-green-500
        ground: 'rgb(251 191 36)',       // bg-orange-300
        ice: 'rgb(165 243 252)',         // bg-cyan-300
        normal: 'rgb(128 128 128)',      // bg-neutral-50
        poison: 'rgb(134 25 143)',       // bg-fuchsia-800
        psychic: 'rgb(236 72 153)',      // bg-pink-600
        rock: 'rgb(251 146 60)',         // bg-orange-400
        steel: 'rgb(161 161 170)',       // bg-zinc-400
        water: 'rgb(59 130 246)',        // bg-blue-500
      },
    },
  },
  plugins: [],
}