import React from 'react';
import AIPersonalitySelector from './AIPersonalitySelector';
import ChatBubble from './ChatBubble';

const EnhancedOnboardingFlow = () => {
  return (
    <div className="onboarding">
      <h1>Welcome to the Onboarding Flow</h1>
      <AIPersonalitySelector />
      <ChatBubble />
    </div>
  );
};

export default EnhancedOnboardingFlow;
