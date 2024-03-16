// config.js

//const API_URL = "http://localhost:4500/api"; // Ensure this matches your backend's host and port
const API_URL = "https://eae-backend.onrender.com";

const config = {
  endpoints: {
    login: `${API_URL}/clients/login`,
    register: `${API_URL}/clients/signup`,
    clientInfo: `${API_URL}/clients/:id`, // Placeholder for client ID
    features: `${API_URL}/features`,
    projects: `${API_URL}/projects`,
    clientsWithProjects: `${API_URL}/clients/withProjectsAndFeatures`,
    allProjects: `${API_URL}/projects/all`, // Add this line
    addFeature: `${API_URL}/features`,
    allClients: `${API_URL}/clients`,
  },
};

export default config;
