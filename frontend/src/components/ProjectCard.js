// ProjectCard.js
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ProjectCard = ({ project }) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardMedia component="img" alt={project.projectName} height="140" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {project.projectName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Owner: {project.clientName}
        </Typography>
        {/* Include more project details here */}
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
        {/* Add more actions if needed */}
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
