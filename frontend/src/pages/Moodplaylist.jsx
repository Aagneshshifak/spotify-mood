import React, { useState } from "react";

const moods = [
  { label: "Happy 😊", color: "bg-yellow-400" },
  { label: "Sad 😔", color: "bg-blue-400" },
  { label: "Energetic ⚡", color: "bg-red-500" },
  { label: "Relaxed 🌙", color: "bg-purple-500" },
  { label: "Romantic ❤️", color: "bg-pink-500" },
];

const MoodPlaylist = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    console.log(`Mood selected: ${mood.label}`);
    // Later: Fetch playlist from backend or Spotify API based on mood
  };

  const mockPlaylists = [
    { title: "Good Vibes Only", artist: "Various Artists", songs: 25 },
    { title: "Morning Boost", artist: "DJ Rise", songs: 18 },
    { title: "Chill Evening", artist: "Lo-Fi Beats", songs: 20 },
  ];

  return (
    <div className="p-6 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Mood-Based Playlists 🎵</h1>
      <p className="text-gray-300 mb-8">
        Select your mood and explore playlists that match your vibe.
      </p>

      {/* Mood Selection */}
      <div className="flex flex-wrap gap-4 mb-10">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => handleMoodSelect(mood)}
            className={`px-5 py-3 rounded-full text-black font-semibold transition transform hover:scale-105 ${mood.color} ${
              selectedMood?.label === mood.label ? "ring-4 ring-white" : ""
            }`}
          >
            {mood.label}
          </button>
        ))}
      </div>

      {/* Playlist Display */}
      {selectedMood ? (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {selectedMood.label} Playlists
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPlaylists.map((playlist, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl p-5 shadow-md hover:bg-gray-700 transition"
              >
                <h3 className="text-xl font-bold mb-2">{playlist.title}</h3>
                <p className="text-gray-400 mb-1">{playlist.artist}</p>
                <p className="text-gray-500 text-sm">{playlist.songs} songs</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-400 text-lg italic">
          Select a mood to see personalized playlists 🎧
        </p>
      )}
    </div>
  );
};

export default MoodPlaylist;