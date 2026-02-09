import React from 'react';
import { aiPersonalities } from '../lib/data/aiPersonalities';
import { useAI } from '../lib/hooks/useAI';

export const PersonalitySelector = () => {
  const { personality, setPersonality } = useAI();

  return (
    <div>
      <h3>Select Personality</h3>
      <select
        value={personality.id}
        onChange={(e) => setPersonality(aiPersonalities.find(p => p.id === e.target.value) || aiPersonalities[0])}
      >
        {aiPersonalities.map((p) => (
          <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>
    </div>
  );
};
