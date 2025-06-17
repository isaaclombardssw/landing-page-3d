import React from 'react';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'minimal' | 'glass';
}

export const Panel: React.FC<PanelProps> = ({ 
  children, 
  className = '',
  variant = 'default'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'minimal':
        return 'bg-white dark:bg-gray-900 rounded-lg shadow-lg';
      case 'glass':
        return 'bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl';
      default:
        return 'border-4 border-[#6C6C6C] bg-[#222222] rounded-[30px] shadow-2xl';
    }
  };

  const getBoxShadow = () => {
    if (variant === 'default') {
      return "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003";
    }
    return undefined;
  };

  return (
    <div
      className={`max-w-6xl -mt-48 mx-auto h-[30rem] md:h-[38rem] w-full p-2 md:p-6 relative overflow-hidden ${getVariantStyles()} ${className}`}
      style={{
        boxShadow: getBoxShadow()
      }}
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </div>
  );
}; 