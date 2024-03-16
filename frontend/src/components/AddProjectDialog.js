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
import config from "../config"; // Ensure this path correctly points to your config file

const AddProjectDialog = ({ open, onClose }) => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Use the correct endpoint from the config
        const response = await axios.get(config.endpoints.allClients);
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    if (open) {
      fetchClients();
    }
  }, [open]);

  const handleAddProject = async () => {
    if (!selectedClient || !projectName || !projectDescription) {
      console.error("All fields are required.");
      return;
    }

    try {
      const projectData = {
        clientId: selectedClient,
        name: projectName,
        description: projectDescription,
      };
      // Use the projects endpoint from your config
      await axios.post(config.endpoints.projects, projectData);
      onClose(true); // Close the dialog and indicate success
    } catch (error) {
      console.error("Error adding project:", error);
      onClose(false); // Close the dialog and indicate failure
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Add Project</DialogTitle>
      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Client</InputLabel>
          <Select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            label="Client"
          >
            {clients.map((client) => (
              <MenuItem key={client._id} value={client._id}>
                {client.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin="normal"
          label="Project Name"
          fullWidth
          variant="outlined"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <TextField
          margin="normal"
          label="Description"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button onClick={handleAddProject}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectDialog;
