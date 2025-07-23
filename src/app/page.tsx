// src/app/page.tsx
"use client";
import React from "react"; // <-- ADD THIS LINE
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Grid, useTheme } from "@mui/material";
import { keyframes } from "@mui/system";
import Image from "next/image";
import Link from "next/link"; // <-- THIS WAS ALSO MISSING
import { motion, Variants } from "framer-motion";

// Image slide-in animation
const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// Define the keyframes for the rotating border line
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Animation variants for Framer Motion text
const loopingContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      duration: 2,
      staggerChildren: 0.1,
    },
  },
};

const textVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: [0, 1, 1, 1, 0],
    transition: {
      duration: 3,
      times: [0, 0.2, 0.7, 0.8, 1],
      repeat: Infinity,
      repeatDelay: 3,
    },
  },
};

const buttonContainerVariants: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: 0.8,
    },
  },
};

// Helper component for the typewriter effect
const AnimatedText = ({
  text,
  el: Wrapper = "p",
  className,
}: {
  text: string;
  el?: React.ElementType;
  className?: string;
}) => {
  const words = text.split(" ");
  return (
    <Wrapper className={className}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: "inline-block" }}>
          {Array.from(word).map((letter, letterIndex) => (
            <motion.span key={letterIndex} variants={textVariants}>
              {letter}
            </motion.span>
          ))}
          <span>&nbsp;</span>
        </span>
      ))}
    </Wrapper>
  );
};

export default function HomePage() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 6 } }}>
      <Grid
        container
        spacing={4}
        alignItems="center"
        sx={{ minHeight: "80vh" }}
      >
        <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
          <Box
            sx={{
              width: { xs: 250, md: 300 },
              height: { xs: 250, md: 300 },
              mx: "auto",
              borderRadius: "50%",
              overflow: "hidden",
              boxShadow: 3,
              animation: `${slideInFromLeft} 1.2s ease-out`,
              position: "relative",
              p: "5px",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: "50%",
                background: `conic-gradient(from 180deg, transparent 0%, ${theme.palette.secondary.main} 30%, transparent 10%)`,
                animation: `${rotate} 4s linear infinite`,
              },
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                src="/profile.jpg"
                alt="My Profile Picture"
                width={300}
                height={300}
                className="cyber-image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ textAlign: "center" }}>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={loopingContainerVariants}
            >
              <Typography
                variant="h2"
                component="h1"
                sx={{ fontSize: { xs: "3rem", md: "4rem" } }}
                gutterBottom
              >
                <AnimatedText text="Welcome to My Portfolio" el="span" />
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid ",
                borderColor: "primary.main",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                padding: "1rem",
                borderRadius: "1rem",
              }}
            >
              <Typography
                fontSize={{ xs: "1rem", md: "1.2rem" }}
                color="text.secondary"
                paragraph
              >
                I’m a passionate Full-Stack Developer crafting modern,
                responsive web applications — from front-end interfaces to
                back-end systems. Explore my work and let’s connect!
              </Typography>
            </motion.div>

            <motion.div
              variants={buttonContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <Box sx={{ my: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  href="/projects"
                  size="large"
                  sx={{ mr: 2 }}
                >
                  View My Projects
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  href="/contact"
                  size="large"
                >
                  Contact Me
                </Button>
              </Box>
            </motion.div>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
