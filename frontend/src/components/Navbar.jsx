// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Music, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link to="/" className="flex items-center space-x-2 group">
          <Music className="w-8 h-8 text-green-400 group-hover:text-green-300 transition" />
          <h1 className="text-2xl font-bold text-green-400 group-hover:text-green-300 transition">
            Spotify Mood
          </h1>
        </Link>

        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <Link
                to="/"
                className={`px-3 py-2 rounded-lg transition ${
                  isActive('/') 
                    ? 'text-green-400 bg-gray-800' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Home
              </Link>
              <Link
                to="/mood"
                className={`px-3 py-2 rounded-lg transition ${
                  isActive('/mood') 
                    ? 'text-green-400 bg-gray-800' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Mood Detection
              </Link>
              <Link
                to="/library"
                className={`px-3 py-2 rounded-lg transition ${
                  isActive('/library') 
                    ? 'text-green-400 bg-gray-800' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Library
              </Link>
              
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
                {user?.images?.[0] && (
                  <img
                    src={user.images[0].url}
                    alt={user.display_name}
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm text-gray-300 hidden md:block">
                  {user?.display_name || user?.id}
                </span>
                <button
                  onClick={logout}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;