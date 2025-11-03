// frontend/src/hooks/useSpotify.js
import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import spotifyAPI from '../api/spotify';

export const useSpotify = () => {
  const { accessToken, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchByMood = useCallback(async (emotion, limit = 20) => {
    if (!accessToken) throw new Error('Not authenticated');
    
    setLoading(true);
    setError(null);
    try {
      const tracks = await spotifyAPI.searchByMood(accessToken, emotion, limit);
      return tracks;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const searchTracks = useCallback(async (query, limit = 20) => {
    if (!accessToken) throw new Error('Not authenticated');
    
    setLoading(true);
    setError(null);
    try {
      const tracks = await spotifyAPI.searchTracks(accessToken, query, limit);
      return tracks;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  const createPlaylist = useCallback(async (name, description, trackUris) => {
    if (!accessToken || !user) throw new Error('Not authenticated');
    
    setLoading(true);
    setError(null);
    try {
      const playlist = await spotifyAPI.createPlaylist(
        accessToken,
        user.id,
        name,
        description,
        trackUris
      );
      return playlist;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [accessToken, user]);

  return {
    searchByMood,
    searchTracks,
    createPlaylist,
    loading,
    error,
  };
};