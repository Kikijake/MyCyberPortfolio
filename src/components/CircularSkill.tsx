// src/components/CircularSkill.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { motion, useInView, animate } from "framer-motion";

interface CircularSkillProps {
  name: string;
  percentage: number;
}

function CircularSkill({ name, percentage }: CircularSkillProps) {
  const theme = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // ==========================================================
  // CONTROL PANEL: These values define the component's largest size (desktop)
  // ==========================================================
  const size = 60;
  const strokeWidth = 2;
  // ==========================================================

  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeColor = theme.palette.secondary.main;

  useEffect(() => {
    if (isInView) {
      animate(0, percentage / 100, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            const circle = (ref.current as SVGSVGElement).querySelector(
              ".progress-circle"
            );
            if (circle) {
              const offset = circumference * (1 - latest);
              circle.setAttribute("stroke-dashoffset", offset.toString());
            }
          }
        },
      });
    }
  }, [isInView, circumference, percentage]);

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 0.5, md: 1 }, // Smaller gap on mobile
        // 1. ADD THIS: This scales the entire component down on mobile screens
        transform: {
          xs: "scale(1)", // On mobile, render at 80% of the original size
          md: "scale(1)", // On medium screens and up, render at full size
        },
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <Box sx={{ position: "relative", width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke={theme.palette.background.paper}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            className="progress-circle"
            cx={center}
            cy={center}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
          />
        </svg>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            component="span"
            fontWeight="bold"
            color="primary"
          >
            {`${percentage}%`}
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="body1"
        component="p"
        color="text.primary"
        fontWeight="bold"
        fontSize={{ xs: "0.8rem", md: "1rem" }}
      >
        {name}
      </Typography>
    </Box>
  );
}

export default CircularSkill;
