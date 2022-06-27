import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });
const API_URL = "/api/docs/";

// create new form
const createForm = async (formData, token) => {
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, formData, config);

  return response.data;
};

// get all forms
const getForms = async (token, querys) => {
  const { query, pN } = querys;
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `?pn=${pN}&q=${query}`, config);
  return response.data;
};

// get all forms count
const getFormsCount = async (token) => {
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "count", config);
  return response.data;
};

// get one forms
const getForm = async (docId, token) => {
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + docId, config);
  return response.data;
};

// Delete A doc
const deleteForm = async (docId, token) => {
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("/api/docs/" + docId, config);
  console.log(response.data);
  return response.data;
};

// update form
const updateForm = async (formData, docId, token) => {
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + docId, formData, config);

  return response.data;
};

const docService = {
  createForm,
  getForms,
  deleteForm,
  getForm,
  updateForm,
  getFormsCount,
};

export default docService;
