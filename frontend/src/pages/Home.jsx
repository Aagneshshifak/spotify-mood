// frontend/src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Music, Heart } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Sparkles className="w-16 h-16 text-green-400 mx-auto" />
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Welcome to Spotify Mood
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover music that matches your emotions. Let AI detect your mood and curate
            personalized playlists just for you.
          </p>
          
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="inline-block px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition transform hover:scale-105"
            >
              Get Started
            </Link>
          ) : (
            <Link
              to="/mood"
              className="inline-block px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full transition transform hover:scale-105"
            >
              Detect Your Mood
            </Link>
          )}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-800/50 rounded-2xl p-6 hover:bg-gray-800 transition">
            <Music className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Emotion Detection</h3>
            <p className="text-gray-400">
              Our advanced ML model analyzes your text or voice to understand your current mood.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 hover:bg-gray-800 transition">
            <Sparkles className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Personalized Playlists</h3>
            <p className="text-gray-400">
              Get curated playlists from Spotify that perfectly match your detected emotion.
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-2xl p-6 hover:bg-gray-800 transition">
            <Heart className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Save & Share</h3>
            <p className="text-gray-400">
              Save your favorite mood-based playlists and share them with friends.
            </p>
          </div>
        </div>

        {/* How It Works */}
        {isAuthenticated && (
          <div className="mt-16 bg-gray-800/30 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                'Express your mood',
                'AI detects emotion',
                'Get music recommendations',
                'Enjoy your playlist',
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-xl font-bold mb-3 mx-auto">
                    {index + 1}
                  </div>
                  <p className="text-gray-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;