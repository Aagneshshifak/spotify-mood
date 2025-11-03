// frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import spotifyAPI from '../api/spotify';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Check for stored tokens on mount
  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    const refresh = localStorage.getItem('spotify_refresh_token');
    
    if (token) {
      setAccessToken(token);
      if (refresh) setRefreshToken(refresh);
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  // Handle OAuth callback
  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    
    if (error) {
      console.error('OAuth error:', error);
      setLoading(false);
      return;
    }
    
    if (code) {
      handleCallback(code);
    }
  }, [searchParams]);

  const fetchUser = async (token) => {
    try {
      const userData = await spotifyAPI.getMe(token);
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // Token might be expired, try to refresh
      const refresh = localStorage.getItem('spotify_refresh_token');
      if (refresh) {
        await refreshAccessToken(refresh);
      } else {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshAccessToken = async (refresh) => {
    try {
      const { accessToken: newToken, refreshToken: newRefresh } = 
        await spotifyAPI.refreshToken(refresh);
      
      localStorage.setItem('spotify_access_token', newToken);
      if (newRefresh) {
        localStorage.setItem('spotify_refresh_token', newRefresh);
        setRefreshToken(newRefresh);
      }
      setAccessToken(newToken);
      await fetchUser(newToken);
    } catch (error) {
      console.error('Failed to refresh token:', error);
      logout();
    }
  };

  const login = async () => {
    try {
      const { authUrl } = await spotifyAPI.getAuthUrl();
      window.location.href = authUrl;
    } catch (error) {
      console.error('Login failed:', error);
      alert('Failed to initiate login. Please try again.');
    }
  };

  const handleCallback = async (code) => {
    try {
      setLoading(true);
      const { accessToken: token, refreshToken: refresh } = 
        await spotifyAPI.exchangeCode(code);
      
      localStorage.setItem('spotify_access_token', token);
      if (refresh) {
        localStorage.setItem('spotify_refresh_token', refresh);
        setRefreshToken(refresh);
      }
      setAccessToken(token);
      await fetchUser(token);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Callback failed:', error);
      alert('Login failed. Please try again.');
      navigate('/login', { replace: true });
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    navigate('/login');
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    login,
    logout,
    loading,
    isAuthenticated: !!accessToken && !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};