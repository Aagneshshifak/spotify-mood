// frontend/src/api/spotify.js
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api/spotify';

const spotifyAPI = {
  getAuthUrl: async () => {
    const res = await fetch(`${API_BASE}/auth-url`);
    if (!res.ok) throw new Error('Failed to get auth URL');
    return res.json();
  },

  exchangeCode: async (code) => {
    const res = await fetch(`${API_BASE}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    if (!res.ok) throw new Error('Failed to exchange code');
    return res.json();
  },

  refreshToken: async (refreshToken) => {
    const res = await fetch(`${API_BASE}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) throw new Error('Failed to refresh token');
    return res.json();
  },

  getMe: async (accessToken) => {
    const res = await fetch(`${API_BASE}/me`, {
      headers: { 
        'accessToken': accessToken,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Failed to get user info');
    return res.json();
  },

  searchByMood: async (accessToken, emotion, limit = 20) => {
    const res = await fetch(`${API_BASE}/search-by-mood`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'accessToken': accessToken,
      },
      body: JSON.stringify({ emotion, limit }),
    });
    if (!res.ok) throw new Error('Failed to search tracks');
    return res.json();
  },

  searchTracks: async (accessToken, query, limit = 20) => {
    const res = await fetch(`${API_BASE}/search-tracks`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'accessToken': accessToken,
      },
      body: JSON.stringify({ query, limit }),
    });
    if (!res.ok) throw new Error('Failed to search tracks');
    return res.json();
  },

  createPlaylist: async (accessToken, userId, name, description, trackUris) => {
    const res = await fetch(`${API_BASE}/create-playlist`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'accessToken': accessToken,
      },
      body: JSON.stringify({ userId, name, description, trackUris }),
    });
    if (!res.ok) throw new Error('Failed to create playlist');
    return res.json();
  },

  getUserPlaylists: async (accessToken, limit = 50) => {
    const res = await fetch(`${API_BASE}/user-playlists`, {
      method: 'GET',
      headers: { 
        'accessToken': accessToken,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Failed to get playlists');
    return res.json();
  },

  getPlaylistTracks: async (accessToken, playlistId) => {
    const res = await fetch(`${API_BASE}/playlist-tracks/${playlistId}`, {
      method: 'GET',
      headers: { 
        'accessToken': accessToken,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) throw new Error('Failed to get playlist tracks');
    return res.json();
  },
};

export default spotifyAPI;