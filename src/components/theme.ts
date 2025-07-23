"use client";
// 1. Import the new font from 'next/font/google'
import { Share_Tech_Mono } from "next/font/google";
import { createTheme } from "@mui/material/styles";

// 2. Configure the new font
const shareTechMono = Share_Tech_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  // 3. Apply the new font to all typography
  typography: {
    fontFamily: shareTechMono.style.fontFamily,
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#F000B8",
    },
    secondary: {
      main: "#00F0FF",
    },
    error: {
      main: "#FFD300",
    },
    success: {
      main: "#00FF41",
    },
    background: {
      default: "#0A041C",
      paper: "#1A113C",
    },
    text: {
      primary: "#EAEAEA",
      secondary: "#A0A0A0",
    },
  },
});

export default theme;
