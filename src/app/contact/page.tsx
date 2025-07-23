// src/app/contact/page.tsx
"use client";
import React, { useState, useRef } from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Link,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const glassmorphismStyle = {
  backgroundImage:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%)",
  backdropFilter: "blur(10px)",
  border: "1px solid",
  borderColor: "rgba(240, 0, 184, 0.3)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  padding: { xs: "1.5rem", md: "2.5rem" },
  borderRadius: "1rem",
};

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!form.current) return;

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

    emailjs.sendForm(serviceID, templateID, form.current, publicKey).then(
      () => {
        setStatus("success");
        form.current?.reset();
      },
      (error) => {
        setStatus("error");
        setErrorMessage(
          error.text ||
            "Failed to send message. Please check your EmailJS configuration."
        );
      }
    );
  };

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: 2, md: 15 }, pb: 4 }}>
      <Typography variant="h3" component="h2" align="center" gutterBottom>
        Get In Touch
      </Typography>
      <Grid container spacing={6} sx={{ mt: 4 }} alignItems="flex-start">
        {/* Left Column: Contact Info */}
        <Grid size={{ xs: 12, md: 5 }}>
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={glassmorphismStyle}>
              <Typography variant="h4" component="h2" gutterBottom>
                Contact Info
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Typography>yehtetsan295814@gmail.com</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <PhoneIcon color="primary" sx={{ mr: 2 }} />
                <Typography>+959776945055</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <FacebookIcon color="primary" sx={{ mr: 2 }} />
                <Link
                  href="https://www.facebook.com/ye.htet.san.659918"
                  target="_blank"
                  rel="noopener"
                >
                  Ye Htet San
                </Link>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <LinkedInIcon color="primary" sx={{ mr: 2 }} />
                <Link
                  href="https://www.linkedin.com/in/ye-htet-san-97335b271/"
                  target="_blank"
                  rel="noopener"
                >
                  Ye Htet San
                </Link>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                <GitHubIcon color="primary" sx={{ mr: 2 }} />
                <Link
                  href="https://github.com/Kikijake"
                  target="_blank"
                  rel="noopener"
                >
                  Kikijake
                </Link>
              </Box>
              <Divider
                sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.2)" }}
              />
              <Typography variant="h6" color="text.primary" sx={{ mb: 1 }}>
                Open to Opportunities
              </Typography>
              <Typography variant="body1" color="text.secondary">
                I&apos;m currently available for freelance projects and open to
                discussing full-time positions. Let&apos;s build something
                amazing together!
              </Typography>
            </Box>
          </motion.div>
        </Grid>

        {/* Right Column: Contact Form */}
        <Grid size={{ xs: 12, md: 7 }}>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={glassmorphismStyle}>
              <Typography variant="h4" component="h2" gutterBottom>
                Send Me a Message
              </Typography>
              <Box
                component="form"
                ref={form}
                onSubmit={handleSubmit}
                sx={{ mt: 2 }}
              >
                <TextField
                  fullWidth
                  required
                  label="Your Email"
                  name="from_email" // name must match template variable
                  type="email"
                  margin="normal"
                  variant="filled"
                />
                <TextField
                  fullWidth
                  required
                  label="Your Message"
                  name="message" // name must match template variable
                  multiline
                  rows={6}
                  margin="normal"
                  variant="filled"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={status === "loading"}
                  sx={{ mt: 2 }}
                  startIcon={
                    status === "loading" ? <CircularProgress size={20} /> : null
                  }
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
                {status === "success" && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    Message sent successfully!
                  </Alert>
                )}
                {status === "error" && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errorMessage}
                  </Alert>
                )}
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}
