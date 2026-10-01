import { createContext, useState } from "react";
import API from "../api/axios";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // REGISTER
  const registerUser = async (formData) => {
    try {
      const response = await API.post(
        "/users/register/",
        formData
      );
      return response.status === 201;
    } catch (error) {
      console.log(
        "REGISTER ERROR:",
        error.response?.data
      );
      return false;
    }
  };
  // LOGIN
  const loginUser = async (formData) => {
  try {
    const response = await API.post(
      "/users/login/",
      formData
    );
    localStorage.setItem(
      "access",
      response.data.access
    );
    localStorage.setItem(
      "refresh",
      response.data.refresh
    );
    return true;
  } catch (error) {
    console.log(
      "LOGIN ERROR:",
      error.response?.data
    );
    return false;
  }
}
  
  const logoutUser = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };
  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        logoutUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};