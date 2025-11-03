// frontend/src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Player from './components/Player';
import Home from './pages/Home';
import MoodPlaylist from './pages/MoodPlaylist';
import Library from './pages/Library';
import Login from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/mood" element={<MoodPlaylist />} />
            <Route path="/library" element={<Library />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Player />
      </div>
    </AuthProvider>
  );
}

export default App;