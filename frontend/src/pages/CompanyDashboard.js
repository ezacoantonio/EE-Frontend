import React, { useState, useEffect } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import config from "../config";
import AddIcon from "@mui/icons-material/Add";
import AddFeatureDialog from "../components/AddFeature";
import AddProjectDialog from "../components/AddProjectDialog";
import { useAlert } from "../components/AlertContext";

const FeatureEditDialog = ({ open, onClose, feature, onSave }) => {
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (feature) {
      setEditData({
        title: feature.title,
        description: feature.description,
        status: feature.status,
      });
    }
  }, [feature]);

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Call API to update feature
    onSave(editData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Feature</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          fullWidth
          variant="outlined"
          value={editData.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          value={editData.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="status"
          label="Status"
          fullWidth
          variant="outlined"
          value={editData.status}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

const CollapsibleTable = () => {
  const [clients, setClients] = useState([]);
  const [editFeatureDialogOpen, setEditFeatureDialogOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(null);
  const [addFeatureDialogOpen, setAddFeatureDialogOpen] = useState(false);
  const [addProjectDialogOpen, setAddProjectDialogOpen] = useState(false);
  const triggerAlert = useAlert();
  // Define fetchClients function here
  const fetchClients = async () => {
    try {
      const response = await axios.get(config.endpoints.clientsWithProjects);
      setClients(response.data);
    } catch (error) {
      console.error("Failed to fetch clients", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleEditFeature = (feature) => {
    setCurrentFeature(feature);
    setEditFeatureDialogOpen(true);
  };

  const handleSaveFeature = async (editedFeature) => {
    try {
      await axios.put(
        `${config.endpoints.features}/${currentFeature._id}`,
        editedFeature
      );
      console.log("Feature updated successfully");
      triggerAlert("Feature updated successfully", "success");
      setEditFeatureDialogOpen(false);
      await fetchClients(); // Refresh the list to show updated data
    } catch (error) {
      console.error("Failed to update feature", error);
      triggerAlert("Failed to update feature", "error");
    }
  };

  const handleDeleteFeature = async (featureId) => {
    try {
      await axios.delete(`${config.endpoints.features}/${featureId}`);
      console.log("Feature deleted successfully");
      await fetchClients(); // Refresh the list to reflect the deletion
    } catch (error) {
      console.error("Failed to delete feature", error);
    }
  };
  const handleOpenAddFeatureDialog = () => {
    setAddFeatureDialogOpen(true);
  };
  const tableContainerStyle = {
    margin: "20px auto", // Centering the table
    maxWidth: "calc(90% - 40px)", // Ensuring some margin on the sides
    overflowX: "auto", // Allowing horizontal scrolling on smaller screens
  };

  const handleOpenAddProjectDialog = () => {
    setAddProjectDialogOpen(true);
  };

  return (
    <TableContainer component={Paper} style={tableContainerStyle} elevation={0}>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenAddFeatureDialog}
        style={{
          marginBottom: 20,
          backgroundColor: "#000",
          color: "#fff",
          marginRight: "10px",
        }} // Added backgroundColor for black and color for text
      >
        Add Feature
      </Button>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpenAddProjectDialog}
        style={{
          marginBottom: 20,
          backgroundColor: "#000",
          color: "#fff",
          marginRight: "10px",
        }} // Adjust as needed
      >
        Add Project
      </Button>

      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Client Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Projects</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client) => (
            <ClientRow
              key={client._id}
              client={client}
              onEditFeature={handleEditFeature}
              onDeleteFeature={handleDeleteFeature}
            />
          ))}
          {addFeatureDialogOpen && (
            <AddFeatureDialog
              open={addFeatureDialogOpen}
              onClose={(refresh) => {
                setAddFeatureDialogOpen(false);
                if (refresh) fetchClients(); // Only fetchClients if refresh is true indicating a successful add
              }}
            />
          )}
          {addProjectDialogOpen && (
            <AddProjectDialog
              open={addProjectDialogOpen}
              onClose={(refresh) => {
                setAddProjectDialogOpen(false);
                if (refresh) {
                  fetchClients(); // If needed to refresh clients list
                }
              }}
            />
          )}
        </TableBody>
      </Table>
      {currentFeature && (
        <FeatureEditDialog
          open={editFeatureDialogOpen}
          onClose={() => setEditFeatureDialogOpen(false)}
          feature={currentFeature}
          onSave={handleSaveFeature}
        />
      )}
    </TableContainer>
  );
};

function ClientRow({ client, onEditFeature, onDeleteFeature }) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {client.name}
        </TableCell>
        <TableCell>{client.email}</TableCell>
        <TableCell align="right">{client.projects.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {client.projects.map((project) => (
              <Box key={project._id} sx={{ margin: 1 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  sx={{ fontWeight: "bold" }}
                >
                  Project: {project.name}
                </Typography>
                {/* Features Table */}
                <Table size="small" aria-label="features">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Edit</TableCell>
                      <TableCell>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {project.features.map((feature) => (
                      <TableRow key={feature._id}>
                        <TableCell>{feature.title}</TableCell>
                        <TableCell>{feature.description}</TableCell>
                        <TableCell>{feature.status}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => onEditFeature(feature)}>
                            <ModeEditIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => onDeleteFeature(feature._id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default CollapsibleTable;
