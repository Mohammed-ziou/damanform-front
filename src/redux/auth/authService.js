import axios from "axios";

const API_URL_REGISTER = "/api/users/register";
const API_URL_LOGIN = "/api/users/login";

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL_REGISTER, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Log out
const logOut = () => {
  localStorage.removeItem("user");
};

// Log in
const logIn = async (userData) => {
  const response = await axios.post(API_URL_LOGIN, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const authService = {
  register,
  logOut,
  logIn,
};

export default authService;
