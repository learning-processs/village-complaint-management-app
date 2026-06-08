import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AutContext = createContext();

const AutContextProvider = ({ children }) => {
  const API = import.meta.env.VITE_API_URL;

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load user & token from localStorage on app start

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");


    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`

    }
  }, []);

  // register

  const register = async (formData) => {
    setLoading(true);

    try {
      const { data } = await axios.post(API + "/api/auth/register", formData);
      if (data.success) {
        setUser(data.data.user);
        setToken(data.data.user);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.data.token);
      }

      return data;
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // login

  const login = async (formData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(`${API}/api/auth/login`, formData);
      if (data.success) {
        setUser(data.data.user);
        setToken(data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("token", data.data.token);
      }
      return data;
    } catch (error) {
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  // logout

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log('Token set in axios:', token)  // ← add debug

    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const value = {user, setUser, token, setToken, register, login, logout };
  return <AutContext.Provider value={value}>{children}</AutContext.Provider>;
};

export default AutContextProvider;
