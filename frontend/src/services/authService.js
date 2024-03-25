import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const validateEmail = (email) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

// REGISTER USER

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData, { withCredentials: true });

    if (response.status >= 200 && response.status < 300) {
      toast.success("User Registered successfully");
    }

    return response.data;
  } catch (error) {
    console.error(error);

    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();

    toast.error(message);
  }
};

// LOGIN USER

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData);

    if (response.status >= 200 && response.status < 300) {
      toast.success("log in successful");
    }

    return response.data;
  } catch (error) {
    console.error(error);

    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();

    toast.error(message);
  }
};

// LOGOUT USER


export const logoutUser = async () => {
  try {
    await axios.get(`${BACKEND_URL}/api/users/logout`);
  } catch (error) {
    console.error(error);

    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();

    toast.error(message);
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (userData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/users/forgotpassword`, userData);
    toast.success(response.data.message)
    return response.data;
  } catch (error) {
    console.error(error);

    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();

    toast.error(message);
  }
};

// RESET PASSWORD
export const resetPassword = async (userData, resetToken) => {
  try {
    const response = await axios.put(`${BACKEND_URL}/api/users/resetpassword/${resetToken}`, userData);
    toast(response.data.message)
    return response.data;
  } catch (error) {
    console.error(error);

    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();

    toast.error(message);
  }
};

// GET LOGIN STATUS
export const getLoginStatus= async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/users/loggedin/`);
    toast(response.data.message);
    return response.data;
  } catch (error) {
    console.error(error);

    const message = (
      error.response && error.response.data && error.response.data.message
    ) || error.message || error.toString();

    toast.error(message);
  }
};