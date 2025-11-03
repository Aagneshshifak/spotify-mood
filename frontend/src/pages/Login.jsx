// frontend/src/pages/Login.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Music, Loader2 } from 'lucide-react';

const Login = () => {
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center p-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-md p-8 border border-gray-700">
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <Music className="w-16 h-16 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Spotify Mood
          </h1>
          <p className="text-gray-400">
            Sign in to discover music based on your emotions
          </p>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Music className="w-5 h-5" />
              <span>Login with Spotify</span>
            </>
          )}
        </button>

        <p className="text-gray-500 text-sm text-center mt-6">
          By continuing, you agree to our terms of service
        </p>
      </div>
    </div>
  );
};

export default Login;