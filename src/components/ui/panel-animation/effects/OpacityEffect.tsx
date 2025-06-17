import React from 'react';

interface OpacityEffectProps {
  opacity: number;
  children: React.ReactNode;
}

export const OpacityEffect: React.FC<OpacityEffectProps> = ({ opacity, children }) => {
  // TODO: Implement opacity effect component
  return (
    <div style={{ opacity }}>
      {children}
    </div>
  );
}; 