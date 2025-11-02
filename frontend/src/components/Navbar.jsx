import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 border-b border-gray-800">
      <h1 className="text-2xl font-bold text-green-500">Spotify Mood</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-green-400">Home</Link>
        <Link to="/mood" className="hover:text-green-400">Mood</Link>
        <Link to="/library" className="hover:text-green-400">Library</Link>
        <Link to="/login" className="hover:text-green-400">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;