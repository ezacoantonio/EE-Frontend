import React from "react";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const getStatusStyles = (status) => {
  status = status.toLowerCase(); // Normalize the status to lowercase for comparison
  switch (status) {
    case "pending":
      return { fontWeight: "bold", color: "red" };
    case "in progress":
      return { fontWeight: "bold", color: "orange" };
    case "complete":
      return { fontWeight: "bold", color: "green" };
    default:
      return {};
  }
};

const Project = ({ project }) => {
  return (
    <Box sx={{ mb: 2, textAlign: "left" }}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ fontWeight: "bold", color: "navy" }}
      >
        <PlayArrowIcon /> {project.name}
      </Typography>
      <Typography variant="body1" sx={{ ml: 2 }}>
        {project.description}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
        Features:
      </Typography>
      {project.features && project.features.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="features table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {project.features.map((feature) => (
                <TableRow key={feature._id}>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ fontWeight: "bold" }}
                  >
                    {feature.title}
                  </TableCell>
                  <TableCell>{feature.description}</TableCell>
                  <TableCell sx={getStatusStyles(feature.status)}>
                    {feature.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body2" sx={{ ml: 4 }}>
          No features for this project.
        </Typography>
      )}
    </Box>
  );
};

export default Project;
