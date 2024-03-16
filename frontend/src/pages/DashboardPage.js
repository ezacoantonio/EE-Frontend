import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
// import SearchIcon from "@mui/icons-material/Search";
// import AssessmentIcon from "@mui/icons-material/Assessment";
import CreateProjectForm from "../components/ActionCards/CreateProjectForm";
import CreateFrontendComponentForm from "../components/ActionCards/CreateFrontendComponentForm";
import CreateBackendComponentForm from "../components/ActionCards/CreateBackendComponentForm";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ProjectCard from "./ProjectsPage";
Chart.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalProjects: 0,
    ongoingProjects: 0,
    completedProjects: 0,
    notStartedProjects: 0,
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
  });
  const [openCreateProject, setOpenCreateProject] = useState(false);
  const [openCreateFrontendComponent, setOpenCreateFrontendComponent] =
    useState(false);

  // Function to close the CreateFrontendComponentForm dialog
  const handleCloseCreateFrontendComponent = () =>
    setOpenCreateFrontendComponent(false);

  // Inside your Dashboard component, add state management for opening/closing the backend component form dialog
  const [openCreateBackendComponent, setOpenCreateBackendComponent] =
    useState(false);

  // Add a function to handle opening and closing this dialog
  const handleOpenCreateBackendComponent = () =>
    setOpenCreateBackendComponent(true);
  const handleCloseCreateBackendComponent = () =>
    setOpenCreateBackendComponent(false);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching dashboard data
        const dashboardResponse = await axios.get(
          "http://localhost:2000/api/dashboard-data/project-task-overview"
        );
        setDashboardData(dashboardResponse.data);

        // Fetching projects data
        const projectsResponse = await axios.get(
          "http://localhost:2000/api/projects"
        );
        setProjects(projectsResponse.data);
        console.log(projectsResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const dashboardActions = [
    {
      icon: <CreateNewFolderIcon />,
      name: "Create Project",
      action: () => setOpenCreateProject(true),
    },
    {
      icon: <DesignServicesIcon />,
      name: "Create Frontend Component",
      action: () => setOpenCreateFrontendComponent(true),
    },
    {
      icon: <PsychologyIcon />,
      name: "Create Backend Component",
      action: handleOpenCreateBackendComponent,
    },
  ];

  return (
    <Box
      sx={{ display: "flex", flexDirection: matches ? "row" : "column", m: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box>
            {/* Doughnut Chart and Task Summary Cards here */}
            <DoughnutChart chartData={dashboardData} />
            <TaskSummaryCard
              title="Total Tasks"
              count={dashboardData.totalTasks}
            />
            <TaskSummaryCard
              title="Pending Tasks"
              count={dashboardData.pendingTasks}
            />
            <TaskSummaryCard
              title="Completed Tasks"
              count={dashboardData.completedTasks}
            />
            {/* Projects display section */}
            <Grid item xs={12} md={8}>
              <Typography variant="h6">Projects</Typography>
              <Grid container spacing={2}>
                {projects.map((project) => (
                  <Grid item xs={12} sm={6} md={4} key={project._id}>
                    <ProjectCard project={project} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box></Box>
        </Grid>
      </Grid>

      {/* SpeedDial for quick actions */}
      <SpeedDial
        ariaLabel="Dashboard Actions"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          "& .MuiSpeedDial-fab": {
            bgcolor: "black", // Background color
            "&:hover": {
              bgcolor: "black", // To keep the button black on hover as well
            },
          },
        }}
        icon={<SpeedDialIcon />}
      >
        {dashboardActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        ))}
      </SpeedDial>

      {/* Dialog for CreateProjectForm */}
      <Dialog
        open={openCreateProject}
        onClose={() => setOpenCreateProject(false)}
        aria-labelledby="create-project-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="create-project-dialog-title">
          Create New Project
        </DialogTitle>
        <DialogContent>
          <CreateProjectForm />
        </DialogContent>
        <Button onClick={() => setOpenCreateProject(false)}>Close</Button>
      </Dialog>
      {/* New Dialog for CreateFrontendComponentForm */}
      <Dialog
        open={openCreateFrontendComponent}
        onClose={handleCloseCreateFrontendComponent}
        aria-labelledby="create-frontend-component-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="create-frontend-component-dialog-title">
          Create New Frontend Component
        </DialogTitle>
        <DialogContent>
          <CreateFrontendComponentForm
            open={openCreateFrontendComponent}
            handleClose={handleCloseCreateFrontendComponent}
          />
        </DialogContent>
        <Button onClick={handleCloseCreateFrontendComponent}>Close</Button>
      </Dialog>
      <Dialog
        open={openCreateBackendComponent}
        onClose={handleCloseCreateBackendComponent}
        aria-labelledby="create-backend-component-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="create-backend-component-dialog-title">
          Create New Backend Component
        </DialogTitle>
        <DialogContent>
          <CreateBackendComponentForm
            open={openCreateBackendComponent}
            handleClose={handleCloseCreateBackendComponent}
          />
        </DialogContent>
        <Button onClick={handleCloseCreateBackendComponent}>Close</Button>
      </Dialog>
    </Box>
  );
};

// Doughnut chart component
const DoughnutChart = ({ chartData }) => {
  const theme = useTheme();
  const data = {
    labels: [
      "Total Projects",
      "Ongoing Projects",
      "Completed Projects",
      "Not Started Projects",
    ],
    datasets: [
      {
        data: [
          chartData.totalProjects,
          chartData.ongoingProjects,
          chartData.completedProjects,
          chartData.notStartedProjects,
        ],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main,
          theme.palette.error.main,
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Project Overview",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

// Task summary card component
const TaskSummaryCard = ({ title, count }) => (
  <Box sx={{ minWidth: 275, margin: 2 }}>
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {title}
    </Typography>
    <Typography variant="h5" component="div">
      {count}
    </Typography>
  </Box>
);

export default Dashboard;
