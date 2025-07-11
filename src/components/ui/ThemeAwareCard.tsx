import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface ThemeAwareCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const ThemeAwareCard: React.FC<ThemeAwareCardProps> = ({ 
  children, 
  className = '', 
  hover = false, 
  onClick 
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`
        bg-card text-card-foreground
        border border-border rounded-xl p-6 
        shadow-sm hover:shadow-md 
        transition-all duration-200
        ${onClick ? 'cursor-pointer' : ''} 
        ${className}
      `}
      style={{
        backgroundColor: `rgb(var(--color-card))`,
        color: `rgb(var(--color-card-foreground))`,
        borderColor: `rgb(var(--color-border))`,
      }}
    >
      {children}
    </motion.div>
  );
};

// Example usage component showing theme-aware styling
export const ThemeShowcase: React.FC = () => {
  const { theme, resolvedTheme } = useTheme();

  return (
    <div className="space-y-6 p-6">
      <ThemeAwareCard>
        <h3 className="text-lg font-semibold mb-2">Theme Information</h3>
        <div className="space-y-2 text-sm">
          <div>Current theme setting: <span className="font-mono">{theme}</span></div>
          <div>Resolved theme: <span className="font-mono">{resolvedTheme}</span></div>
        </div>
      </ThemeAwareCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ThemeAwareCard hover>
          <div className="text-primary font-semibold mb-2">Primary Color</div>
          <div className="w-full h-4 rounded" style={{ backgroundColor: `rgb(var(--color-primary))` }}></div>
        </ThemeAwareCard>

        <ThemeAwareCard hover>
          <div className="text-secondary-foreground font-semibold mb-2">Secondary Color</div>
          <div className="w-full h-4 rounded" style={{ backgroundColor: `rgb(var(--color-secondary))` }}></div>
        </ThemeAwareCard>

        <ThemeAwareCard hover>
          <div className="text-success-foreground font-semibold mb-2">Success Color</div>
          <div className="w-full h-4 rounded" style={{ backgroundColor: `rgb(var(--color-success))` }}></div>
        </ThemeAwareCard>

        <ThemeAwareCard hover>
          <div className="text-error-foreground font-semibold mb-2">Error Color</div>
          <div className="w-full h-4 rounded" style={{ backgroundColor: `rgb(var(--color-error))` }}></div>
        </ThemeAwareCard>
      </div>
    </div>
  );
};