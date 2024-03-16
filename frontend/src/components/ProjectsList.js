import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Project from "./Project"; // Adjust this path according to your directory structure

const ProjectsList = ({ projects }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        padding: isMobile ? "10px" : "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: isMobile ? "10px" : "50px",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Your Projects:
      </Typography>
      {projects.length > 0 ? (
        projects.map((project) => (
          <Box key={project._id} sx={{ alignItems: "100px" }}>
            <Project project={project} />
          </Box>
        ))
      ) : (
        <Typography variant="body1">You have no projects.</Typography>
      )}
    </Box>
  );
};

export default ProjectsList;
