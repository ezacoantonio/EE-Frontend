import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import config from "../config";
import { useAlert } from "./AlertContext";

const AddFeatureDialog = ({ open, onClose }) => {
  const triggerAlert = useAlert();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(config.endpoints.allProjects);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    if (open) {
      fetchProjects();
    }
  }, [open]);

  const handleAddFeature = async () => {
    if (!selectedProject) {
      alert("Please select a project.");
      return;
    }

    try {
      const feature = {
        projectId: selectedProject,
        title,
        description,
        status,
      };
      await axios.post(config.endpoints.addFeature, feature);
      triggerAlert("Feature added successfully", "success");
      onClose(true); // Pass true to indicate a successful add operation
    } catch (error) {
      console.error("Error adding feature:", error);
      triggerAlert("Error adding feature", "error");
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Add Feature</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>Project</InputLabel>
          <Select
            value={selectedProject}
            label="Project"
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            {projects.map((project) => (
              <MenuItem key={project._id} value={project._id}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Title"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button onClick={handleAddFeature}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFeatureDialog;
