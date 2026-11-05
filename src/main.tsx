import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App';
import { PrefsProvider } from './lib/prefs';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <PrefsProvider><App /></PrefsProvider>
    </MotionConfig>
  </StrictMode>,
);
