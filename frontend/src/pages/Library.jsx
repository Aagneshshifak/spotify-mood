import React from "react";

const Library = () => {
  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Your Library 🎶</h1>
      <p className="text-gray-300 mb-6">
        Browse your saved playlists, liked songs, and favorite artists.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Example placeholder cards */}
        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:bg-gray-700 transition">
          <h2 className="text-xl font-semibold mb-2">Chill Vibes</h2>
          <p className="text-gray-400">24 songs</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:bg-gray-700 transition">
          <h2 className="text-xl font-semibold mb-2">Workout Beats</h2>
          <p className="text-gray-400">18 songs</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-2xl shadow-lg hover:bg-gray-700 transition">
          <h2 className="text-xl font-semibold mb-2">Evening Acoustic</h2>
          <p className="text-gray-400">12 songs</p>
        </div>
      </div>
    </div>
  );
};

export default Library;