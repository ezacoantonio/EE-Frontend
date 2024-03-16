import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config"; // Make sure this points to your actual config file

// Import the components
import ProjectsList from "../components/ProjectsList"; // Update this path according to your directory structure

const ClientsPage = () => {
  const [clientProjects, setClientProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Initialize storedUser outside of useEffect to use its value in the return statement
  const storedUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!storedUser) {
      setError("No user found in local storage.");
      navigate("/login");
      return;
    }

    const fetchProjects = async () => {
      try {
        const projectsEndpoint = `${config.endpoints.projects}/byClient/${storedUser._id}`; // Adjust according to your config structure
        const response = await axios.get(projectsEndpoint);
        setClientProjects(response.data);
      } catch (error) {
        setError("Failed to fetch projects.");
        console.error("Error fetching projects: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]); // Use navigate as the dependency

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Use the storedUser.name to welcome the client by name */}
      <h1>Welcome, {storedUser ? storedUser.name : "User"}!</h1>
      <ProjectsList projects={clientProjects} />
    </div>
  );
};

export default ClientsPage;
