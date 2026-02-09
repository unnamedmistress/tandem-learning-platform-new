import React, { useState } from 'react';

const AIPersonalitySelector = () => {
  const [selected, setSelected] = useState('default');

  const handleSelect = (personality: string) => {
    setSelected(personality);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Choose AI Personality</h3>
      <div className="flex gap-2">
        <button 
          aria-label="Select Friendly Persona" 
          onClick={() => handleSelect('friendly')}
          className="px-4 py-2 bg-orange-100 hover:bg-orange-200 rounded transition-colors"
        >
          Friendly
        </button>
        <button 
          aria-label="Select Tech-Savvy Persona" 
          onClick={() => handleSelect('tech-savvy')}
          className="px-4 py-2 bg-green-100 hover:bg-green-200 rounded transition-colors"
        >
          Tech-Savvy
        </button>
        <button 
          aria-label="Select Minimalist Persona" 
          onClick={() => handleSelect('minimalist')}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          Minimalist
        </button>
      </div>
      <p className="mt-3 text-sm text-gray-600">Selected: {selected}</p>
    </div>
  );
};

export default AIPersonalitySelector;
