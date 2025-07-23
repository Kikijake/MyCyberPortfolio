// src/components/Footer.tsx
"use client";
import React from "react";
import { Box, Typography, IconButton, Link } from "@mui/material";

// 1. Import the icons you need
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" sx={{pb:2}}>
      {/* 2. Add a Box to contain and center the icons */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 1 }}>
        <IconButton
          component={Link}
          href="https://github.com/Kikijake" // <-- IMPORTANT: Replace with your link
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.linkedin.com/in/ye-htet-san-97335b271/" // <-- IMPORTANT: Replace with your link
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.facebook.com/ye.htet.san.659918" // <-- IMPORTANT: Replace with your link
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          sx={{ color: "text.secondary", "&:hover": { color: "primary.main" } }}
        >
          <FacebookIcon />
        </IconButton>
      </Box>

      <Typography variant="body2" color="text.secondary" align="center">
        {`© ${currentYear} Ye Htet San. All Rights Reserved.`}
      </Typography>
    </Box>
  );
}

export default Footer;
