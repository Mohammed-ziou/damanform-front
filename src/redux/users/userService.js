import axios from "axios";

// const API = axios.create({ baseURL: "http://localhost:5000" });
const API_URL = "/api/users/";

// get all forms
const getUsers = async (token) => {
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// get one forms
const getUser = async (docId, token) => {
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + docId, config);
  return response.data;
};

// Delete A doc
const deleteUser = async (docId, token) => {
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + "editusers/" + docId, config);
  return response.data;
};

// update user
const updateUser = async (data, token) => {
  const config = {
    headers: {
      token: `Bearer ${token}`,
    },
  };
  console.log(data);
  const response = await axios.put(
    API_URL + "editusers/" + data._id,
    data,
    config
  );

  return response.data;
};

const userService = {
  getUsers,
  deleteUser,
  getUser,
  updateUser,
};

export default userService;
