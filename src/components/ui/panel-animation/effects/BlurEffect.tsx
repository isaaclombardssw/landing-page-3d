import React from 'react';

interface BlurEffectProps {
  filter: string;
  children: React.ReactNode;
}

export const BlurEffect: React.FC<BlurEffectProps> = ({ filter, children }) => {
  // TODO: Implement blur effect component
  return (
    <div style={{ filter }}>
      {children}
    </div>
  );
}; 