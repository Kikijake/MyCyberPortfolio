// src/components/Navbar.tsx
"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
import { ListItemText, Divider } from "@mui/material"; // 1. Import Divider
import { usePathname } from "next/navigation";

// 2. Import the required Icons
import MenuIcon from "@mui/icons-material/Menu";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Contact", path: "/contact" },
];

function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{
        textAlign: "center",
        backgroundColor: "background.default",
        height: "100%",
        display: "flex", // Use flexbox for layout
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        Ye Htet San
      </Typography>
      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
      <List sx={{ flexGrow: 1 }}>
        {" "}
        {/* Allow list to take up available space */}
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              sx={{ textAlign: "center" }}
              selected={pathname === item.path}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* 3. Add this section for social media icons */}
      <Box sx={{ p: 2 }}>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)", mb: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton
            component="a"
            href="https://github.com/Kikijake"
            target="_blank"
            aria-label="GitHub"
            sx={{ color: "text.secondary" }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/ye-htet-san-97335b271/"
            target="_blank"
            aria-label="LinkedIn"
            sx={{ color: "text.secondary" }}
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.facebook.com/ye.htet.san.659918"
            target="_blank"
            aria-label="Facebook"
            sx={{ color: "text.secondary" }}
          >
            <FacebookIcon />
          </IconButton>
        </Box>
      </Box>
      {/* --- END OF SECTION --- */}
    </Box>
  );

  return (
    <Box
      sx={{
        position: "fixed",
        top: { xs: 0, md: 16 },
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: (theme) => theme.breakpoints.values.md,
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <AppBar
        position="static"
        sx={{
          clipPath:
            "polygon(30px 0%, 100% 0%, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0% 100%, 0% 30px)",
          backgroundColor: "rgba(26, 17, 60, 0.8)",
          backdropFilter: "blur(8px)",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link
              href="/"
              passHref
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Ye Htet San
            </Link>
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                color={pathname === item.path ? "primary" : "inherit"}
                component={Link}
                href={item.path}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon color="primary" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navbar;
