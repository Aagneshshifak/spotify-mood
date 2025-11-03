// frontend/src/api/emotion.js
const EMOTION_API = import.meta.env.VITE_EMOTION_API_URL || 'http://localhost:8000';

const emotionAPI = {
  predict: async (text) => {
    const res = await fetch(`${EMOTION_API}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error('Failed to predict emotion');
    return res.json();
  },

  predictFromAudio: async (audioFile) => {
    const formData = new FormData();
    formData.append('audio', audioFile);
    
    const res = await fetch(`${EMOTION_API}/predict-audio`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Failed to predict emotion from audio');
    return res.json();
  },
};

export default emotionAPI;