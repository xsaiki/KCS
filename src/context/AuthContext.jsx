import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingVerification, setPendingVerification] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('kcs_user');
    const token = localStorage.getItem('kcs_token');
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    const response = await authService.register(userData);
    setPendingVerification({
      email: userData.email,
      fullName: userData.fullName,
      verificationCode: response.data.verificationCode,
    });
    return response.data;
  };

  const verifyAccount = async (code) => {
    if (!pendingVerification) throw new Error('No pending verification');
    const response = await authService.verifyAccount(pendingVerification.email, code);
    const { token, user: verifiedUser } = response.data;
    const fullUser = { ...verifiedUser, fullName: pendingVerification.fullName };
    localStorage.setItem('kcs_token', token);
    localStorage.setItem('kcs_user', JSON.stringify(fullUser));
    setUser(fullUser);
    setPendingVerification(null);
    return fullUser;
  };

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    const { token, user: loggedUser } = response.data;
    localStorage.setItem('kcs_token', token);
    localStorage.setItem('kcs_user', JSON.stringify(loggedUser));
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    pendingVerification,
    register,
    verifyAccount,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};