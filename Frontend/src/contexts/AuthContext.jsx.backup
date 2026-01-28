import React, { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        loading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        refreshToken: null,
        loading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  loading: true,
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      
      if (token) {
        try {
          const profileData = await api.getProfile();
          dispatch({
            type: 'SET_USER',
            payload: profileData.data,
          });
          dispatch({
            type: 'LOGIN_SUCCESS',
            payload: {
              user: profileData.data,
              token,
              refreshToken: localStorage.getItem('refreshToken'),
            },
          });
        } catch (error) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch({ type: 'LOGOUT' });
        }
      }
      
      dispatch({ type: 'SET_LOADING', payload: false });
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await api.login(email, password);
      
      if (response.success) {
        const { user, token, refreshToken } = response.data;
        
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token, refreshToken },
        });
        
        return { success: true };
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Login failed',
      };
    }
  };

  const register = async (userData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const response = await api.register(userData);
      
      if (response.success) {
        const { user, token, refreshToken } = response.data;
        
        localStorage.setItem('accessToken', token);
        localStorage.setItem('refreshToken', refreshToken);
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { user, token, refreshToken },
        });
        
        return { success: true };
      }
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Registration failed',
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch({ type: 'LOGOUT' });
  };

  const updateProfile = async (profileData) => {
    try {
      dispatch({
        type: 'UPDATE_PROFILE',
        payload: profileData,
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error?.message || 'Profile update failed',
      };
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};