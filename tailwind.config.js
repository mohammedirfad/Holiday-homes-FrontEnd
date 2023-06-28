/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
    "./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary:'#F5385D',
        'regal-blue' : "#ffe1bc",
        'regal-blue1': "#ffcfd1",
        'regal-blue2': "#f3c6f1",
        'black-rgba': 'rgba(225, 225, 225, 0.54)',
        "seco":"E31C5F",
        "button":"#e41d57",
        "irfad":'rgba(230, 229, 229, 0.54)',
       "buttonBg": "linear-gradient(98.63deg, #f9a225 0%, #f95f35 100%)",
       "sender":"linear-gradient(98.63deg, #24e4f0 0%, #358ff9 100%);"

      },
      height:{
        "3rem":"3rem",
        "27rem":"27rem",
        "28rem":"500px"
      },
      width:{
        "682":"642px"
      },

      fontsize:{
        "3xl":"1.953rem"
      },
      fontfamily:{
        'sans' :['Inter','sans-serif']

      },
      backgroundImage:{
        "login" :"url('/public/    se/Login-bg.jpeg')",
        "host"  :"url('/public/images/host.jpg')"
      }
    },
  },
  plugins: [ ],
}
