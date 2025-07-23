// src/app/projects/page.tsx
"use client";
import React, { useState } from "react"; // 1. Import useState
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  Modal,
  IconButton,
} from "@mui/material"; // 1. Import Modal and IconButton
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import LanguageIcon from "@mui/icons-material/Language";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close"; // 1. Import CloseIcon

const projectsData = [
  {
    title: "Easy Card",
    description:
      "A web-based image customization tool that empowers users to design personalized backgrounds with ease. Key features include adjustable background ratios, the ability to change background colors or upload custom images, sticker placement, undo/redo functionality, and image export for download. Designed with user-friendly controls for a smooth and interactive editing experience.",
    image: "/projects/EasyCard.png",
    technologies: ["React", "html-to-image", "Bootstrap", "SCSS"],
    demoLink: "https://easy-card.onrender.com/",
    githubLink: "https://github.com/Kikijake/Easy-Card",
  },
  {
    title: "KiKiToDoList",
    description:
      "A simple and efficient task management web app deployed on Render, built to reinforce Redux state management skills. Users can create, read, update, and delete tasks with changes persisted using a JSON-based backend (JSON Server). The app demonstrates strong front-end architecture with Redux for predictable state flow and clean component logic.",
    image: "/projects/kikitodolist.jpg",
    technologies: ["React", "json-db", "Bootstrap", "lottiefiles", "SCSS"],
    demoLink: "https://kikitodolist.onrender.com",
    githubLink: "https://github.com/Kikijake/TodolistWithReactRedux",
  },
  {
    title: "Ye Htet Loves Phoo Phoo",
    description:
      "A personalized puzzle and quiz platform created as a fun and interactive gift. The site features a point-based system that rewards correct answers, with a mix of logic puzzles and trivia challenges. Built with love and creativity, this project blends gamification elements with a playful user experience.",
    image: "/projects/phoophoo.jpg",
    technologies: ["React", "BootStrap", "LottieFiles", "SCSS"],
    demoLink: "https://yeyelovesphoophoo.onrender.com",
    githubLink: "https://github.com/Kikijake/For_my_love",
  },
  {
    title: "Lian Za Biak Portfolio",
    description:
      "A responsive and visually appealing website designed for a professional bakery chef. Tailored specifically for the baking industry, it showcases products, services, and culinary expertise with an elegant layout. Special attention was given to mobile responsiveness, image presentation, and user-friendly navigation to enhance both branding and customer engagement.",
    image: "/projects/LiamZaBiak.jpg",
    technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    demoLink: "https://kikijake.github.io/LianZaBiak-Portfolio",
    githubLink: "https://github.com/Kikijake/LianZaBiak-Portfolio",
  },
  {
    title: "Htet Htet Oo Lwin Portfolio",
    description:
      "A personal portfolio site built for a teacher friend, using a customized Bootstrap template. The site highlights professional background, teaching philosophy, and achievements in a clean, responsive layout. Focused on clear content presentation and ease of use, with minimal design adjustments to fit the educational profile.",
    image: "/projects/HtetHtetOoOoLwin.jpg",
    technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
    demoLink: "https://htet-htet-oo-lwin-portfolio.netlify.app",
    githubLink: "https://github.com/Kikijake/Portfolio_HtetHtetOoLwin",
  },
  {
    title: "Pizza Order System",
    description:
      "A formal and fully functional web-based pizza ordering system designed to streamline the ordering process. Users can browse menus, customize pizzas with various toppings and sizes, add items to cart, and place orders efficiently. The system emphasizes usability, structured layout, and responsiveness—ideal for small to mid-sized pizza businesses looking to digitize their service.",
    image: "/projects/POS_pj.png",
    technologies: ["Vue", "Laravel", "MySQL"],
    demoLink: null,
    githubLink: null,
  },
  {
    title: "Kiki's Pet Store",
    description:
      "A comprehensive pet store platform featuring both a user-facing site and an admin dashboard. The user site allows customers to browse and purchase pet food and care products, while also providing pet care tips and articles. The admin panel enables easy product management, order tracking, and content updates. Designed for responsiveness and scalability, the system supports smooth e-commerce operations for pet-related businesses.",
    image: "/projects/PetStore_pj.png",
    technologies: ["Blade", "Laravel", "Bootstrap", "SCSS"],
    demoLink: null,
    githubLink: "https://github.com/Kikijake/kiki-s_petstore",
  },
];

// ... (Animation variants remain the same)
const containerVariants: Variants = {
  /* ... */
};
const cardVariants: Variants = {
  /* ... */
};

const glassmorphismStyle = {
  backgroundImage:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%)",
  backdropFilter: "blur(15px)",
  padding: { xs: "4rem 4rem 2rem 4rem" },
  height: "100%",
  borderLeft: "1px solid white",
  borderRight: "1px solid white",
  boxShadow:
    "inset -10px 0 10px -10px rgba(0, 0, 0, 0.5), inset 10px 0 10px -10px rgba(0, 0, 0, 0.5)",
  clipPath:
    "polygon(80px 0%, 100% 0%, 100% calc(100% - 80px), calc(100% - 80px) 100%, 0% 100%, 0% 80px)",
  filter: "drop-shadow(0 0 1px #F000B8)",
};

// Style for the modal content box
const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", md: "60%" },
  maxWidth: "900px",
  bgcolor: "background.paper",
  border: "2px solid #F000B8",
  boxShadow: 24,
  p: 1,
};

export default function ProjectsPage() {
  // 2. Add state and handlers for the modal
  const [openModal, setOpenModal] = useState<string | null>(null);

  const handleOpenModal = (imageUrl: string) => {
    setOpenModal(imageUrl);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 15 }, pb: 4 }}>
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        My Projects
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        align="center"
        sx={{ mb: 6 }}
      >
        A selection of projects I&apos;ve worked on.
      </Typography>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Grid container spacing={5}>
          {projectsData.map((project) => (
            <Grid size={12} key={project.title}>
              <motion.div variants={cardVariants}>
                <Box sx={glassmorphismStyle}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid size={{ xs: 12, md: 7 }}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                        }}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="h4"
                            component="h2"
                            fontWeight="bold"
                            gutterBottom
                          >
                            {project.title}
                          </Typography>
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                          >
                            {project.technologies.map((tech) => (
                              <Chip
                                key={tech}
                                label={tech}
                                variant="outlined"
                                color="secondary"
                                size="small"
                              />
                            ))}
                          </Box>
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ my: 2 }}
                          >
                            {project.description}
                          </Typography>
                        </Box>
                        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                          {project.demoLink && (
                            <Button
                              variant="contained"
                              color="secondary"
                              startIcon={<LanguageIcon />}
                              href={project.demoLink}
                              target="_blank"
                            >
                              Demo
                            </Button>
                          )}
                          {project.githubLink && (
                            <Button
                              variant="outlined"
                              color="primary"
                              startIcon={<GitHubIcon />}
                              href={project.githubLink}
                              target="_blank"
                            >
                              GitHub
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 5 }}>
                      {/* 4. Add onClick handler and cursor style to the image Box */}
                      <Box
                        onClick={() => handleOpenModal(project.image)}
                        sx={{
                          width: "100%",
                          height: 250,
                          position: "relative",
                          overflow: "hidden",
                          cursor: "pointer",
                          clipPath:
                            "polygon(60px 0%, 100% 0%, 100% calc(100% - 60px), calc(100% - 60px) 100%, 0% 100%, 0% 60px)",
                        }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          layout="fill"
                          objectFit="cover"
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* 3. Add the Modal component */}
      <Modal
        open={!!openModal}
        onClose={handleCloseModal}
        aria-labelledby="project-image-modal"
        aria-describedby="larger-view-of-project-image"
      >
        <Box sx={modalStyle}>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "grey.500",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          {openModal && (
            <Image
              src={openModal}
              alt="Enlarged project view"
              width={1600}
              height={900}
              style={{ width: "100%", height: "auto" }}
            />
          )}
        </Box>
      </Modal>
    </Container>
  );
}
