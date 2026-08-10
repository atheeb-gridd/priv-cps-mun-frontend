import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import apiClient from '../lib/axios';

const AuthContext = createContext(null);

export const clearUserLocalSession = () => {
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  const targetKeys = [
    'cps_payment_verified',
    'cps_mun_reg_type',
    'cps_school_payment_attempted',
    'cps_mun_paid_txn_id',
    'cps_mun_saved_formdata',
    'pendingVerifyEmail',
    'pendingResetEmail'
  ];
  targetKeys.forEach(k => localStorage.removeItem(k));

  Object.keys(localStorage).forEach(key => {
    if (
      key.startsWith('cps_paid_') ||
      key.startsWith('cps_mun_draft_') ||
      (key.startsWith('cps_') && key !== 'cps_mun_delegate_fee')
    ) {
      localStorage.removeItem(key);
    }
  });
  if (rememberedEmail) {
    localStorage.setItem('rememberedEmail', rememberedEmail);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { data } = await apiClient.get('/auth/me', { timeout: 30000 }); // extra time for Vercel cold starts
      setUser(data.user);
    } catch (error) {
      // Only clear session if the server explicitly rejected the token (401).
      // Transient errors (network timeout, Vercel cold-start 5xx) should NOT
      // log the user out — the token may still be perfectly valid.
      if (error.response?.status === 401) {
        console.warn('Session invalid (401), clearing local session.');
        clearUserLocalSession();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
      } else {
        // Transient error (timeout / network / 5xx) — keep local session intact.
        // Only log in dev so the production console stays clean.
        if (process.env.NODE_ENV !== 'production') {
          console.warn('Session check failed transiently, keeping session:', error.message);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    setLoading(true);
    const cleanEmail = (email || '').trim().toLowerCase();
    try {
      const { data } = await apiClient.post('/auth/login', { email: cleanEmail, password });
      clearUserLocalSession();
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setUser(data.user);
      return data.user;
    } catch (error) {
      throw error.response?.data?.message || 'Login failed. Please try again.';
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (fullName, email, password, confirmPassword) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    try {
      clearUserLocalSession();
      const { data } = await apiClient.post('/auth/register', {
        fullName,
        email: cleanEmail,
        password,
        confirmPassword,
      });
      return data;
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.response?.data?.errors;
      throw errorMsg || 'Registration failed. Please try again.';
    }
  };

  const verifyEmailOtp = async (email, code) => {
    setLoading(true);
    const cleanEmail = (email || '').trim().toLowerCase();
    try {
      const { data } = await apiClient.post('/auth/verify-email', { email: cleanEmail, code });
      if (data.accessToken && data.refreshToken) {
        clearUserLocalSession();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setUser(data.user);
      }
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Verification failed. Please try again.';
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async (email) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    try {
      const { data } = await apiClient.post('/auth/send-otp', { email: cleanEmail });
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to send OTP. Please try again.';
    }
  };

  const sendForgotPasswordOtp = async (email) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    try {
      const { data } = await apiClient.post('/auth/forgot-password', { email: cleanEmail });
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to send password reset code.';
    }
  };

  const resetPasswordWithOtp = async (email, otp, newPassword, confirmPassword) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    try {
      const { data } = await apiClient.post('/auth/reset-password', {
        email: cleanEmail,
        otp,
        newPassword,
        confirmPassword,
      });
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to reset password.';
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      clearUserLocalSession();
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        registerUser,
        verifyEmailOtp,
        resendOtp,
        sendForgotPasswordOtp,
        resetPasswordWithOtp,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
