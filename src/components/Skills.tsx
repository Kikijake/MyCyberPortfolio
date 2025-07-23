// src/components/Skills.tsx
"use client";
import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { motion, Variants } from "framer-motion";
import CircularSkill from "./CircularSkill"; // Import the new component

// 1. Update your data to include percentages for each skill.
const skillsData = [
  { name: "React.js", percentage: 80 },
  { name: "Laravel", percentage: 70 },
  { name: "MySQL", percentage: 70 },
  { name: "Nginx", percentage: 50 },
  { name: "Bootstrap", percentage: 70 },
  { name: "MaterialUI", percentage: 70 },
  { name: "JavaScript", percentage: 70 },
  { name: "PHP", percentage: 30 },
  { name: "Node.js", percentage: 60 },
  { name: "Next.js", percentage: 40 },
  { name: "Nest.js", percentage: 50 },
  { name: "Express.js", percentage: 50 },
  { name: "TypeScript", percentage: 35 },
  { name: "MongoDB", percentage: 30 },
  { name: "AWS", percentage: 25 },
  {name: "Linux", percentage: 50 },
];

// Animation variants for staggering the appearance of each skill
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function Skills() {
  return (
    <Box sx={{ pb: 6 }}>
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        Technical Skills
      </Typography>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <Grid container justifyContent="center" spacing={4} sx={{ mt: 4 }}>
          {skillsData.map((skill) => (
            <Grid key={skill.name} size={{ xs: 3, sm: 1.5 }}>
              <motion.div variants={itemVariants}>
                <CircularSkill
                  name={skill.name}
                  percentage={skill.percentage}
                />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
}

export default Skills;
