// frontend/src/pages/Library.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import spotifyAPI from '../api/spotify';
import { Music, Loader2, ExternalLink } from 'lucide-react';

const Library = () => {
  const { accessToken, isAuthenticated } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && accessToken) {
      fetchPlaylists();
    }
  }, [isAuthenticated, accessToken]);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const data = await spotifyAPI.getUserPlaylists(accessToken);
      setPlaylists(data.items || []);
    } catch (error) {
      console.error('Failed to fetch playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Please login to view your library</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Your Library</h1>
        <p className="text-gray-400 mb-8">Your saved playlists and favorite music</p>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-green-400" />
          </div>
        ) : playlists.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition group cursor-pointer"
              >
                {playlist.images?.[0] ? (
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    className="w-full rounded-lg mb-3 aspect-square object-cover"
                  />
                ) : (
                  <div className="w-full aspect-square rounded-lg bg-gray-700 flex items-center justify-center mb-3">
                    <Music className="w-12 h-12 text-gray-500" />
                  </div>
                )}
                <h3 className="font-semibold truncate mb-1">{playlist.name}</h3>
                <p className="text-sm text-gray-400">
                  {playlist.tracks?.total || 0} songs
                </p>
                {playlist.external_urls?.spotify && (
                  <a
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-green-400 hover:text-green-300 mt-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Open in Spotify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No playlists found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;