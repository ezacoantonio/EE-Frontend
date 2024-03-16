import React, { useState } from "react";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";
import axios from "axios";
import config from "../../config"; // Ensure this path matches your project structure
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../../styles/textFieldStyles";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import CustomSnackbar from "../CustomSnackbar"; // Adjust the path as necessary

const CreateProjectForm = () => {
  const [projectData, setProjectData] = useState({
    projectName: "",
    clientName: "",
    description: "",
    startDate: "",
    endDate: "",
    repositories: [{ repoLink: "", password: "" }],
    onlineServices: [{ serviceName: "", serviceLink: "", password: "" }],
    tasks: [
      { taskName: "", status: "To Do", priority: "Medium", assignee: "" },
    ],
    milestones: [{ title: "", dueDate: "", status: "Pending" }],
    communicationLog: [{ date: "", notes: "" }],
    documentationLinks: [""],
    budget: { total: 0, spent: 0 },
    teamMembers: [{ name: "", role: "" }],
    deploymentStatus: "",
    hostingDetails: "",
    analytics: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // or "error", based on the operation result
  });

  const handleChange = (e, sectionIndex, section) => {
    if (section) {
      let updatedSection = projectData[section].map((item, index) => {
        if (index === sectionIndex) {
          return { ...item, [e.target.name]: e.target.value };
        }
        return item;
      });
      setProjectData({ ...projectData, [section]: updatedSection });
    } else {
      setProjectData({ ...projectData, [e.target.name]: e.target.value });
    }
  };

  const handleAddSectionItem = (section) => {
    const newItemTemplates = {
      repositories: { repoLink: "", password: "" },
      onlineServices: { serviceName: "", serviceLink: "", password: "" },
      tasks: {
        taskName: "",
        status: "To Do",
        priority: "Medium",
        assignee: "",
      },
      milestones: { title: "", dueDate: "", status: "Pending" },
      communicationLog: { date: "", notes: "" },
      documentationLinks: "",
      teamMembers: { name: "", role: "" },
    };
    let updatedSection = [...projectData[section], newItemTemplates[section]];
    setProjectData({ ...projectData, [section]: updatedSection });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.endpoints.projects}`,
        projectData
      );
      console.log("Project Created Successfully:", response.data);
      // Success handling logic here
      setSnackbar({
        open: true,
        message: "Project created successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error creating project:", error);
      // Error handling logic here
      setSnackbar({
        open: true,
        message: "Failed to create project. Please try again.",
        severity: "error",
      });
    }
  };

  const handleRemoveSectionItem = (sectionIndex, section) => {
    let updatedSection = projectData[section].filter(
      (_, index) => index !== sectionIndex
    );
    setProjectData({ ...projectData, [section]: updatedSection });
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      sx={{ mt: 2 }}
    >
      <ThemeProvider theme={customTheme}>
        <Grid container spacing={2}>
          {/* Customer Information Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Customer Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Project Name"
              name="projectName"
              value={projectData.projectName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Client Name"
              name="clientName"
              value={projectData.clientName}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="description"
              value={projectData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Start Date"
              name="startDate"
              type="date"
              value={projectData.startDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="End Date"
              name="endDate"
              type="date"
              value={projectData.endDate}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          {/* Project Repositories Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Project Repositories
            </Typography>
          </Grid>
          {projectData.repositories.map((repo, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <TextField
                  label="Repository Link"
                  name="repoLink"
                  value={repo.repoLink}
                  onChange={(e) => handleChange(e, index, "repositories")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Repository Password (optional)"
                  name="password"
                  value={repo.password}
                  type="password"
                  onChange={(e) => handleChange(e, index, "repositories")}
                  fullWidth
                />
              </Grid>
              {/* Optionally, add a button to remove a repository item */}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveSectionItem(index, "repositories")}
                  sx={{ mt: 1, mb: 2 }}
                >
                  Remove Repository
                </Button>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button
              onClick={() => handleAddSectionItem("repositories")}
              variant="outlined"
              sx={{ mb: 2 }}
            >
              Add Repository
            </Button>
          </Grid>
          {/* Online Services Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Online Services
            </Typography>
          </Grid>
          {projectData.onlineServices.map((service, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4}>
                <TextField
                  label="Service Name"
                  name="serviceName"
                  value={service.serviceName}
                  onChange={(e) => handleChange(e, index, "onlineServices")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Service Link"
                  name="serviceLink"
                  value={service.serviceLink}
                  onChange={(e) => handleChange(e, index, "onlineServices")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Service Password (optional)"
                  name="password"
                  type="password"
                  value={service.password}
                  onChange={(e) => handleChange(e, index, "onlineServices")}
                  fullWidth
                />
              </Grid>
              {/* Optionally, add a button to remove an online service item */}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() =>
                    handleRemoveSectionItem(index, "onlineServices")
                  }
                  sx={{ mt: 1, mb: 2 }}
                >
                  Remove Service
                </Button>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button
              onClick={() => handleAddSectionItem("onlineServices")}
              variant="outlined"
              sx={{ mb: 2 }}
            >
              Add Online Service
            </Button>
          </Grid>
          {/* Tasks Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Tasks
            </Typography>
          </Grid>
          {projectData.tasks.map((task, index) => (
            <React.Fragment key={index}>
              <Grid item xs={3}>
                <TextField
                  label="Task Name"
                  name="taskName"
                  value={task.taskName}
                  onChange={(e) => handleChange(e, index, "tasks")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Status"
                  name="status"
                  select
                  value={task.status}
                  onChange={(e) => handleChange(e, index, "tasks")}
                  fullWidth
                >
                  {["To Do", "In Progress", "Done"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Priority"
                  name="priority"
                  select
                  value={task.priority}
                  onChange={(e) => handleChange(e, index, "tasks")}
                  fullWidth
                >
                  {["High", "Medium", "Low"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Assignee"
                  name="assignee"
                  value={task.assignee}
                  onChange={(e) => handleChange(e, index, "tasks")}
                  fullWidth
                />
              </Grid>
              {/* Optionally, add a button to remove a task item */}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveSectionItem(index, "tasks")}
                  sx={{ mt: 1, mb: 2 }}
                >
                  Remove Task
                </Button>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button
              onClick={() => handleAddSectionItem("tasks")}
              variant="outlined"
              sx={{ mb: 2 }}
            >
              Add Task
            </Button>
          </Grid>
          {/* Milestones Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Milestones
            </Typography>
          </Grid>
          {projectData.milestones.map((milestone, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4}>
                <TextField
                  label="Title"
                  name="title"
                  value={milestone.title}
                  onChange={(e) => handleChange(e, index, "milestones")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Due Date"
                  name="dueDate"
                  type="date"
                  value={milestone.dueDate}
                  onChange={(e) => handleChange(e, index, "milestones")}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Status"
                  name="status"
                  select
                  value={milestone.status}
                  onChange={(e) => handleChange(e, index, "milestones")}
                  fullWidth
                >
                  {["Pending", "Completed"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {/* Optionally, add a button to remove a milestone item */}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveSectionItem(index, "milestones")}
                  sx={{ mt: 1, mb: 2 }}
                >
                  Remove Milestone
                </Button>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button
              onClick={() => handleAddSectionItem("milestones")}
              variant="outlined"
              sx={{ mb: 2 }}
            >
              Add Milestone
            </Button>
          </Grid>
          {/* Team Members Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Team Members
            </Typography>
          </Grid>
          {projectData.teamMembers.map((member, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  name="name"
                  value={member.name}
                  onChange={(e) => handleChange(e, index, "teamMembers")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Role"
                  name="role"
                  value={member.role}
                  onChange={(e) => handleChange(e, index, "teamMembers")}
                  fullWidth
                />
              </Grid>
              {/* Optionally, add a button to remove a team member */}
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleRemoveSectionItem(index, "teamMembers")}
                  sx={{ mt: 1, mb: 2 }}
                >
                  Remove Member
                </Button>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button
              onClick={() => handleAddSectionItem("teamMembers")}
              variant="outlined"
              sx={{ mb: 2 }}
            >
              Add Team Member
            </Button>
          </Grid>
          {/* Budget Details Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Budget Details
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Total Budget"
              name="total"
              type="number"
              value={projectData.budget.total}
              onChange={(e) => handleChange(e, null, "budget")}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Amount Spent"
              name="spent"
              type="number"
              value={projectData.budget.spent}
              onChange={(e) => handleChange(e, null, "budget")}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Grid>
          {/* Deployment Status Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Deployment Status & Hosting Details
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Deployment Status"
              name="deploymentStatus"
              select
              value={projectData.deploymentStatus}
              onChange={handleChange}
              fullWidth
              helperText="Select the current status of the project"
              SelectProps={{
                native: true,
              }}
            >
              <option value=""></option>
              <option value="In Development">In Development</option>
              <option value="Staging">Staging</option>
              <option value="Production">Production</option>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Hosting Details"
              name="hostingDetails"
              value={projectData.hostingDetails}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>
          {/* Analytics Section */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Analytics Integration
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Analytics"
              name="analytics"
              value={projectData.analytics}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
              helperText="Specify any analytics integration (e.g., Google Analytics ID)"
            />
          </Grid>
          {/* Review and Submit Section */}
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Review & Submit
            </Typography>
            <Typography variant="body1" component="div" sx={{ mb: 2 }}>
              Please review all project details carefully before submission.
              Ensure all necessary information is accurate and complete.
            </Typography>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Create Project
        </Button>
      </ThemeProvider>
      <CustomSnackbar
        open={snackbar.open}
        handleClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default CreateProjectForm;
