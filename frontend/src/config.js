const API_URL = "http://localhost:2000/api";

const config = {
  endpoints: {
    login: `${API_URL}/auth/login`,
    register: `${API_URL}/auth/register`,
  },
};

export default config;
