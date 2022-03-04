module.exports = {
    darkMode: 'class',
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                loadSpin: { 
                    '0%': { strokeDashoffset: '0' },
                    '5%': { strokeDashoffset: '0' },
                    '50%': { strokeDashoffset: '300' },
                    '95%': { strokeDashoffset: '600' },
                    '100%': { strokeDashoffset: '600' },
                },
                loadRotate: {
                    'from': { transform: 'rotate(0turn)' },
                    'to': { transform: 'rotate(-1turn)'}
                }
            },
            animation: {
                loadSpin: 'loadSpin 2s cubic-bezier(0.77,0,0.18,1) infinite',
                loadRotate: 'loadRotate 3.4s linear infinite'
            }
        },
    },
    plugins: [],
}