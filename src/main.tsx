import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add error handling for deployment debugging
console.log('Main.tsx loading...');
console.log('Environment:', import.meta.env.MODE);

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found!');
  throw new Error('Root element not found');
}

console.log('Root element found, rendering app...');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
