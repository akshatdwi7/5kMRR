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

try {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('App rendered successfully!');
} catch (error) {
  console.error('Failed to render app:', error);
  // Fallback UI
  rootElement.innerHTML = `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: system-ui;">
      <div style="text-align: center;">
        <h1>Screeno - Loading...</h1>
        <p>Application is starting up...</p>
        <p style="color: red;">Error: ${error.message}</p>
      </div>
    </div>
  `;
}
