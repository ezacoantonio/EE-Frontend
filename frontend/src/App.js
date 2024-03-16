import ClientDashboard from "./pages/ClientsPage";
import CompanyDashboard from "./pages/CompanyDashboard";
//import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import SettingsPage from "./pages/SettingsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AlertProvider } from "./components/AlertContext";

const App = () => {
  return (
    <Router>
      <AlertProvider>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          {/* Define other routes here */}
        </Routes>
      </AlertProvider>
    </Router>
  );
};

export default App;
