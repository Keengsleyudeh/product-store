import { create } from "zustand";
import Cookies from "js-cookie";


export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: !!Cookies.get('token'), // Check if token exists in cookies
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save token to cookies
      Cookies.set('token', data.token, { 
        // expires: 7, // Token expires in 7 days
        // secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
        // sameSite: 'strict'
      });

      localStorage.setItem('user', JSON.stringify(data.user)); // Store user data in local storage

      set({ 
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
      
      return { success: true, data };
    } catch (error) {
      set({ 
        error: error.message,
        loading: false,
        isAuthenticated: false,
      });
      return { success: false, error: error.message };
    }
  },


  signup: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }
      
      return { success: true, data };
    } catch (error) {
      set({ 
        error: error.message,
        loading: false,
        isAuthenticated: false,
      });
      return { success: false, error: error.message };
    }
  },


  logout: () => {
    // Remove token from cookies
    Cookies.remove('token');
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
    localStorage.removeItem('user') // Clear user data from local storage
  },


  clearError: () => set({ error: null }),

  // Helper function to get token
  getToken: () => Cookies.get('token'),
}));