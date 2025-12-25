export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                background: "hsl(222, 47%, 5%)",
                foreground: "hsl(210, 40%, 98%)",
                card: "hsl(222, 47%, 8%)",
                "card-foreground": "hsl(210, 40%, 98%)",
                primary: "hsl(217, 91%, 60%)",
                "primary-foreground": "hsl(222, 47%, 5%)",
                muted: "hsl(217, 32%, 12%)",
                "muted-foreground": "hsl(215, 20%, 55%)",
                border: "hsl(217, 32%, 18%)",
                destructive: "hsl(0, 84%, 60%)",
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                display: ["Space Grotesk", "sans-serif"],
            },
        },
    },
    plugins: [],
};
