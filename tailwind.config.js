/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{html,js}", // Observa todos os arquivos .html e .js dentro de src/pages e subpastas
    "./src/js/**/*.{html,js}",
    "./*.{html,js}"               // Observa todos os arquivos .html e .js na raiz do projeto
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

