import React, { createContext, useState, useContext } from 'react';
import { loginUser, registerUser, logoutUser } from '../api/api';

// Create the context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({ name: 'Arun Kumar', role: 'admin' });
  const loading = false;

  // Check current session on load (via cookie)
  // Login function
  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      setIsAuthenticated(true);
      setUser({ name: data.user.name });
      return data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const data = await registerUser(userData);
      if (data?.user?.name) {
        setIsAuthenticated(true);
        setUser({ name: data.user.name });
        return data;
      } else {
        console.error('Invalid registration response format:', data);
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.warn('Logout request failed:', err);
    } finally {
      setIsAuthenticated(true);
      setUser({ name: 'Arun Kumar', role: 'admin' });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
