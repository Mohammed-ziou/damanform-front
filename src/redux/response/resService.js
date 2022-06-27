import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });
const API_URL = "/api/docs/";

// download responses
const downloadResponses = async (docId, token) => {
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + docId + "/download", config);
  return response.data;
};

const resService = {
  downloadResponses,
};

export default resService;
