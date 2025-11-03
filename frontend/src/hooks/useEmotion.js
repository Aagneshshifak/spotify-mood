// frontend/src/hooks/useEmotion.js
import { useState, useCallback } from 'react';
import emotionAPI from '../api/emotion';

export const useEmotion = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predict = useCallback(async (text) => {
    if (!text || !text.trim()) return null;
    
    setLoading(true);
    setError(null);
    try {
      const result = await emotionAPI.predict(text);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const predictFromAudio = useCallback(async (audioFile) => {
    setLoading(true);
    setError(null);
    try {
      const result = await emotionAPI.predictFromAudio(audioFile);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    predict,
    predictFromAudio,
    loading,
    error,
  };
};