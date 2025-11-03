// frontend/src/pages/Moodplaylist.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useEmotion } from '../hooks/useEmotion';
import { useSpotify } from '../hooks/useSpotify';
import { Sparkles, Loader2, Play, Plus } from 'lucide-react';
import { EMOTION_COLORS, EMOTION_EMOJIS } from '../utils/constants';
import { formatTime } from '../utils/formatTime';

const MoodPlaylist = () => {
  const { isAuthenticated } = useAuth();
  const { predict, loading: emotionLoading } = useEmotion();
  const { searchByMood, loading: spotifyLoading, createPlaylist } = useSpotify();
  
  const [userInput, setUserInput] = useState('');
  const [detectedEmotion, setDetectedEmotion] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [showCreatePlaylist, setShowCreatePlaylist] = useState(false);

  const handleDetectAndSearch = async () => {
    if (!userInput.trim()) {
      alert('Please enter how you are feeling');
      return;
    }

    if (!isAuthenticated) {
      alert('Please login first');
      return;
    }

    try {
      // Detect emotion
      const emotionResult = await predict(userInput);
      if (!emotionResult) {
        alert('Failed to detect emotion. Please try again.');
        return;
      }

      setDetectedEmotion(emotionResult);

      // Search tracks based on emotion
      const searchResults = await searchByMood(emotionResult.emotion, 30);
      setTracks(searchResults || []);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleCreatePlaylist = async () => {
    if (!playlistName.trim()) {
      alert('Please enter a playlist name');
      return;
    }

    try {
      const trackUris = tracks.map(track => track.uri).slice(0, 20);
      await createPlaylist(
        playlistName,
        `Playlist for ${detectedEmotion.emotion} mood`,
        trackUris
      );
      alert('Playlist created successfully!');
      setShowCreatePlaylist(false);
      setPlaylistName('');
    } catch (error) {
      console.error('Error creating playlist:', error);
      alert('Failed to create playlist. Please try again.');
    }
  };

  const loading = emotionLoading || spotifyLoading;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Emotion-Based Playlists
          </h1>
          <p className="text-gray-400">
            Tell us how you're feeling and we'll find the perfect music for you
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-gray-800/50 rounded-2xl p-6 mb-8 backdrop-blur-sm">
          <div className="flex items-start space-x-4">
            <Sparkles className="w-6 h-6 text-green-400 mt-2 flex-shrink-0" />
            <div className="flex-1">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="How are you feeling today? (e.g., 'I'm feeling energetic and happy!', 'Feeling sad and need some comfort music', 'Just want to relax and chill')"
                className="w-full p-4 rounded-xl bg-gray-900 text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-500 resize-none"
                rows="4"
              />
              <button
                onClick={handleDetectAndSearch}
                disabled={loading || !isAuthenticated}
                className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Detecting...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Detect Emotion & Get Playlists</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Detected Emotion Display */}
        {detectedEmotion && (
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 mb-8 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Detected Emotion</p>
                <div className="flex items-center space-x-3">
                  <span className="text-4xl">
                    {EMOTION_EMOJIS[detectedEmotion.emotion] || '😊'}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold capitalize">
                      {detectedEmotion.emotion}
                    </h2>
                    <p className="text-gray-400">
                      {(detectedEmotion.confidence * 100).toFixed(1)}% confidence
                    </p>
                  </div>
                </div>
              </div>
              {tracks.length > 0 && (
                <button
                  onClick={() => setShowCreatePlaylist(true)}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg flex items-center space-x-2 transition"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Playlist</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Create Playlist Modal */}
        {showCreatePlaylist && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">Create Playlist</h3>
              <input
                type="text"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                placeholder="Enter playlist name"
                className="w-full p-3 rounded-lg bg-gray-900 text-white mb-4 outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex space-x-3">
                <button
                  onClick={handleCreatePlaylist}
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowCreatePlaylist(false);
                    setPlaylistName('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tracks Display */}
        {tracks.length > 0 ? (
          <div>
            <h3 className="text-2xl font-semibold mb-4">
              Recommended Songs ({tracks.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className="bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800 transition group cursor-pointer"
                >
                  {track.album?.images?.[0] && (
                    <div className="relative mb-3">
                      <img
                        src={track.album.images[0].url}
                        alt={track.name}
                        className="w-full rounded-lg aspect-square object-cover"
                      />
                      <button className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <Play className="w-5 h-5 text-black ml-0.5" />
                      </button>
                    </div>
                  )}
                  <h4 className="font-semibold truncate mb-1">{track.name}</h4>
                  <p className="text-sm text-gray-400 truncate mb-2">
                    {track.artists?.map((a) => a.name).join(', ') || 'Unknown'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTime(track.duration_ms)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          detectedEmotion && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No tracks found. Please try a different mood or check your connection.
              </p>
            </div>
          )
        )}

        {/* Empty State */}
        {!detectedEmotion && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Enter your feelings above to detect your emotion and get personalized music recommendations 🎵
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodPlaylist;