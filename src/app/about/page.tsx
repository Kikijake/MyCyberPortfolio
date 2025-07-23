// src/app/about/page.tsx
"use client";
import React from "react";
import { Container, Box, Typography, Grid, Chip } from "@mui/material";
import { motion, Variants } from "framer-motion";
import Skills from "@/components/Skills";

// 1. We store your experience in a structured array. This makes it easy to manage.
const experienceData = [
  {
    role: "Full Stack Developer (Mid)",
    company: "Planet Hub",
    date: "06/2025 - 07/2025",
    technologies: [
      "React.js",
      "Laravel",
      "OAuth2",
      "Nginx",
      "DigitalOcean",
      "MySQL",
      "MUI",
      "Swiper.js",
    ],
    description: [
      "Designed and developed a Hotel Booking Management System with interconnected customer, admin, and client interfaces.",
      "Implemented features including secure OAuth2 authentication, geo-based hotel discovery, and multi-language support.",
      "Built scalable backend architecture and RESTful APIs to support real-time interactions and data synchronization.",
      "Deployed the entire system on a secure DigitalOcean Linux droplet using Nginx.",
    ],
  },
  {
    role: "Full Stack Developer (Junior)",
    company: "Blue Ocean Operating Management",
    date: "05/2025 - 06/2025",
    technologies: [
      "React.js",
      "Nest.js",
      "MySQL",
      "AWS EC2",
      "Nginx",
      "DigitalOcean",
    ],
    description: [
      "Contributed to an SMS service platform by integrating Telco services using NestJS.",
      "Collaborated on delivering SMS services integrated with Viber to enhance communication capabilities for clients.",
      "Worked on ATOM's VAS project, delivering gold exchange rates, healthcare info, and more, based on user subscriptions.",
      "Maintained and supported live production systems on AWS EC2 and managed applications on MCloud servers.",
    ],
  },
  {
    role: "Full Stack Developer (Junior)",
    company: "Zote By Focus Innovation",
    date: "04/2024 - 04/2025",
    technologies: [
      "React.js",
      "Laravel",
      "MySQL",
      "CoreUI",
      "Bootstrap",
      "AWS S3",
    ],
    description: [
      "Designed and implemented scalable APIs for an agent-driven product distribution platform.",
      "Handled complex backend sales logic involving transactions, discounts, bonuses and FOCs.",
      "Designed relational databases and implemented a probability-based lucky draw system.",
      "Created APIs to generate detailed reports for tracking agent activities, product movement, and transaction trends.",
      "Created dynamic image generation features on the frontend utilizing API data.",
    ],
  },
];

// 2. Define animation variants for the container and items
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3, // Each card will appear 0.3s after the previous one
    },
  },
};

const cardVariants: Variants = {
  hiddenLeft: { x: -100, opacity: 0 },
  hiddenRight: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

// This is the glassmorphism style you provided, converted to a reusable object
const glassmorphismStyle = {
  backgroundImage:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%)",
  backdropFilter: "blur(10px)",
  border: "1px solid",
  borderColor: "primary.main",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  padding: "1.5rem",
  borderRadius: "1rem",
};

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 15 }, pb: 3 }}>
      <Skills />
      <Typography
        variant="h3"
        component="h2"
        align="center"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Work Experience
      </Typography>

      {/* Experience Cards Container */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Grid container spacing={4}>
          {experienceData.map((job, index) => (
            <Grid size={12} key={job.company}>
              <motion.div
                // 3. Apply the alternating animation based on the item's index
                custom={index}
                initial={index % 2 === 0 ? "hiddenLeft" : "hiddenRight"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={cardVariants}
                style={glassmorphismStyle}
              >
                <Box>
                  <Typography variant="h5" component="h3" fontWeight="bold">
                    {job.role}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 1 }}
                  >
                    {job.company}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {job.date}
                  </Typography>
                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                  >
                    {job.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        variant="outlined"
                        color="secondary"
                        size="small"
                      />
                    ))}
                  </Box>
                  <ul>
                    {job.description.map((point, i) => (
                      <li key={i}>
                        <Typography variant="body1" color="text.secondary">
                          {point}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Container>
  );
}
