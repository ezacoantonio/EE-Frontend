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
import CustomSnackbar from "../CustomSnackbar";

const CreateFrontendComponentForm = ({ open, handleClose }) => {
  const [componentData, setComponentData] = useState({
    componentName: "",
    description: "",
    codeSnippet: "",
    dependencies: [],
    styles: "",
    props: [],
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleChange = (e) => {
    if (e.target.name === "dependencies") {
      setComponentData({
        ...componentData,
        dependencies: e.target.value.split(","),
      });
    } else {
      setComponentData({ ...componentData, [e.target.name]: e.target.value });
    }
  };

  const handlePropChange = (index, e) => {
    const newProps = componentData.props.map((prop, propIndex) => {
      if (index === propIndex) {
        return { ...prop, [e.target.name]: e.target.value };
      }
      return prop;
    });
    setComponentData({ ...componentData, props: newProps });
  };

  const addNewProp = () => {
    setComponentData({
      ...componentData,
      props: [
        ...componentData.props,
        { propName: "", propType: "", defaultValue: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.endpoints.frontendComponents}`, componentData);
      setSnackbar({
        open: true,
        message: "Frontend component created successfully",
        severity: "success",
      });
      handleClose(); // Consider if you want to close the dialog here
    } catch (error) {
      setSnackbar({
        open: true,
        message: `Error creating component: ${error.response.data.message}`,
        severity: "error",
      });
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Create New Frontend Component</DialogTitle>
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
              <Grid item xs={12}>
                <TextField
                  label="Code Snippet"
                  name="codeSnippet"
                  value={componentData.codeSnippet}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Dependencies (comma separated)"
                  name="dependencies"
                  value={componentData.dependencies.join(",")}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Styles"
                  name="styles"
                  value={componentData.styles}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
              {componentData.props.map((prop, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={4}>
                    <TextField
                      label="Prop Name"
                      name="propName"
                      value={prop.propName}
                      onChange={(e) => handlePropChange(index, e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Prop Type"
                      name="propType"
                      value={prop.propType}
                      onChange={(e) => handlePropChange(index, e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label="Default Value"
                      name="defaultValue"
                      value={prop.defaultValue}
                      onChange={(e) => handlePropChange(index, e)}
                      fullWidth
                    />
                  </Grid>
                </React.Fragment>
              ))}
              <Grid item xs={12}>
                <Button onClick={addNewProp} variant="contained">
                  Add New Prop
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
      <CustomSnackbar
        open={snackbar.open}
        handleClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </>
  );
};

export default CreateFrontendComponentForm;
