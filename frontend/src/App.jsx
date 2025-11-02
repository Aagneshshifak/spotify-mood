import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Player from "./components/Player";
import Home from "./pages/Home";
import MoodPlaylist from "./pages/MoodPlaylist";
import Library from "./pages/Library";
import Login from "./pages/Login";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mood" element={<MoodPlaylist />} />
          <Route path="/library" element={<Library />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
      <Player />
    </div>
  );
}

export default App;