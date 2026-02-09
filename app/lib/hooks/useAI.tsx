import React, { useState, useEffect } from 'react';
import { aiPersonalities } from '../data/aiPersonalities';
import { aiResponses } from '../data/aiResponses';

export const useAI = () => {
  const [personality, setPersonality] = useState(aiPersonalities[0]);
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (personality) {
      const personalityResponse = aiResponses[personality.id];
      setResponse(personalityResponse || '');
    }
  }, [personality]);

  return { personality, setPersonality, response };
};
