// frontend/src/components/Player.jsx
import React, { useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { formatTime } from '../utils/formatTime';

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  // Mock track for now
  const mockTrack = {
    name: 'No track selected',
    artists: [{ name: 'Select a song to play' }],
    album: {
      images: [{ url: 'https://via.placeholder.com/64' }],
    },
    duration_ms: 0,
  };

  const track = currentTrack || mockTrack;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // TODO: Implement actual Spotify playback
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    setIsMuted(newVolume === '0');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Current Track Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          {track.album?.images?.[0] && (
            <img
              src={track.album.images[0].url}
              alt={track.name}
              className="w-14 h-14 rounded object-cover"
            />
          )}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{track.name}</p>
            <p className="text-xs text-gray-400 truncate">
              {track.artists?.map((a) => a.name).join(', ') || 'Unknown Artist'}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-white transition">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 transition"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5 ml-0.5" />
              )}
            </button>
            <button className="text-gray-400 hover:text-white transition">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-2 w-full max-w-md">
            <span className="text-xs text-gray-400">0:00</span>
            <div className="flex-1 h-1 bg-gray-700 rounded-full cursor-pointer group">
              <div className="h-full bg-green-500 rounded-full w-0 group-hover:bg-green-400 transition"></div>
            </div>
            <span className="text-xs text-gray-400">
              {formatTime(track.duration_ms)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-gray-400 hover:text-white transition"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Player;