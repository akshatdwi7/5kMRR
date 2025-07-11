import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Sun, Moon, Monitor, Eye, Contrast } from 'lucide-react';
import { ThemeToggle, SimpleThemeToggle } from '../components/ui/ThemeToggle';
import { ThemeAwareCard, ThemeShowcase } from '../components/ui/ThemeAwareCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useTheme } from '../contexts/ThemeContext';
import { useColorSchemePreferences } from '../hooks/useThemePreference';

export const ThemeDemo: React.FC = () => {
  const { theme, resolvedTheme } = useTheme();
  const preferences = useColorSchemePreferences();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-3"
          >
            <Palette className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Dark Mode Demo</h1>
          </motion.div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive dark mode implementation with accessibility features, 
            smooth transitions, and respect for user preferences.
          </p>
        </div>

        {/* Theme Controls */}
        <ThemeAwareCard>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Theme Controls</h2>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Current: {theme} → {resolvedTheme}
              </div>
              <ThemeToggle />
              <SimpleThemeToggle />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <span className="font-medium">Light Mode</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Clean, bright interface for daytime use
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Moon className="h-4 w-4" />
                <span className="font-medium">Dark Mode</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Easy on the eyes for low-light environments
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Monitor className="h-4 w-4" />
                <span className="font-medium">System</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Follows your device's preference automatically
              </p>
            </div>
          </div>
        </ThemeAwareCard>

        {/* Accessibility Features */}
        <ThemeAwareCard>
          <div className="flex items-center space-x-3 mb-6">
            <Eye className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Accessibility Features</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">User Preferences</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Reduced Motion:</span>
                  <span className={preferences.prefersReducedMotion ? 'text-warning' : 'text-success'}>
                    {preferences.prefersReducedMotion ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>High Contrast:</span>
                  <span className={preferences.prefersHighContrast ? 'text-warning' : 'text-success'}>
                    {preferences.prefersHighContrast ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Reduced Transparency:</span>
                  <span className={preferences.prefersReducedTransparency ? 'text-warning' : 'text-success'}>
                    {preferences.prefersReducedTransparency ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Features</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>WCAG 2.1 AA compliant color contrast</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Screen reader announcements</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Keyboard navigation support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Focus indicators</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Respects prefers-reduced-motion</span>
                </li>
              </ul>
            </div>
          </div>
        </ThemeAwareCard>

        {/* Component Examples */}
        <ThemeAwareCard>
          <h2 className="text-2xl font-semibold mb-6">Component Examples</h2>
          
          <div className="space-y-6">
            {/* Buttons */}
            <div>
              <h3 className="text-lg font-medium mb-3">Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>
            
            {/* Inputs */}
            <div>
              <h3 className="text-lg font-medium mb-3">Form Elements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                <Input placeholder="Enter your name" />
                <Input type="email" placeholder="Enter your email" />
              </div>
            </div>
            
            {/* Color Palette */}
            <div>
              <h3 className="text-lg font-medium mb-3">Color Palette</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="w-full h-12 bg-primary rounded"></div>
                  <div className="text-sm font-medium">Primary</div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-12 bg-secondary rounded"></div>
                  <div className="text-sm font-medium">Secondary</div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-12 bg-success rounded"></div>
                  <div className="text-sm font-medium">Success</div>
                </div>
                <div className="space-y-2">
                  <div className="w-full h-12 bg-error rounded"></div>
                  <div className="text-sm font-medium">Error</div>
                </div>
              </div>
            </div>
          </div>
        </ThemeAwareCard>

        {/* Theme Showcase */}
        <ThemeShowcase />
      </div>
    </div>
  );
};