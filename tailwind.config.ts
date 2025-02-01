import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "regal-blue": "#243c5a",
        "nft-dark": "#24252D",
        "nft-gray-1": "#E3E1E3",
        "nft-gray-2": "#888888",
        "nft-gray-3": "#4F4F4F",
        "nft-black-1": "#2D2E36",
        "nft-black-2": "#1B1A21",
        "nft-black-3": "#2A2D3A",
        "nft-black-4": "#24252D",
        "nft-red-violet": "#DA18A3",
        "file-active": "#2196f3",
        "file-accept": "#00e676",
        "file-reject": "#ff1744",
        "overlay-black": "rgba(0, 0, 0, 0.8)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      width: {
        "215": "215px",
        "357": "357px",
        "557": "557px",
      },
      minWidth: {
        "155": "155px",
        "190": "190px",
        "215": "215px",
        "240": "240px",
        "256": "256px",
        "327": "327px",
      },
      height: {
        "300": "300px",
        "557": "557px",
      },
      inset: {
        "45": "45%",
        "65": "65px",
      },
      spacing: {
        "65": "65px",
      },
      flex: {
        "2": "2 2 0%",
      },
      lineHeight: {
        "70": "70px",
      },
      zIndex: {
        "0": "0",
        "-5": "-5",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    screens: {
      lg: {
        max: "1800px",
      },
      md: {
        max: "990px",
      },
      sm: {
        max: "600px",
      },
      xs: {
        max: "400px",
      },
      minmd: "1700px",
      minlg: "2100px",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
