// src/components/ThemeRegistry.tsx
"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import theme from "./theme"; // We will create this file next
import { Box } from "@mui/material";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstarts an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            width: "100%",
            pt: { xs: 8, sm: 0 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflowX: "hidden",
          }}
        >
          {children}
        </Box>
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
