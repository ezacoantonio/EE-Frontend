import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
} from "@mui/material";
import axios from "axios";
import config from "../../config";

const CreateBackendComponentForm = ({ open, handleClose }) => {
  const [componentData, setComponentData] = useState({
    componentName: "",
    description: "",
    files: [{ filePath: "", fileCode: "" }],
  });

  const handleChange = (e, index) => {
    if (e.target.name.startsWith("files")) {
      let files = [...componentData.files];
      const fieldName = e.target.name.split(".")[1];
      files[index][fieldName] = e.target.value;
      setComponentData({ ...componentData, files });
    } else {
      setComponentData({ ...componentData, [e.target.name]: e.target.value });
    }
  };

  const handleAddFile = () => {
    setComponentData({
      ...componentData,
      files: [...componentData.files, { filePath: "", fileCode: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.endpoints.components}`, componentData);
      alert("Backend component created successfully");
      handleClose();
    } catch (error) {
      alert(
        `Error creating backend component: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Create New Backend Component</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Component Name"
                name="componentName"
                value={componentData.componentName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={componentData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={2}
              />
            </Grid>
            {componentData.files.map((file, index) => (
              <React.Fragment key={index}>
                <Grid item xs={6}>
                  <TextField
                    label="File Path"
                    name={`files.filePath`}
                    value={file.filePath}
                    onChange={(e) => handleChange(e, index)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="File Code"
                    name={`files.fileCode`}
                    value={file.fileCode}
                    onChange={(e) => handleChange(e, index)}
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>
              </React.Fragment>
            ))}

            <Grid item xs={12}>
              <Button onClick={handleAddFile} variant="contained">
                Add File
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Create Component
              </Button>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBackendComponentForm;
