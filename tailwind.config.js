/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          100:'#48216326',
          500:'#482163',

        },
        background:'#F8F8F8',
        dark:{
          100:'#606060',
          200:'#EAEAEA',
          400:'#2A2A2A',
          500:'#393939',
          600:'#4B4B4B'
          },
        
          light:{
            200:"#F2F2F2",
            500:"#FAFAFA"
          }
      },
    },
  },
  plugins: [],
}