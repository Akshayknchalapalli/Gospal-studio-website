import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/manrope/wght.css';
import '@fontsource-variable/space-grotesk/wght.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/home.css';
import './styles/hero.css';
import './styles/production.css';
import './styles/dialog.css';
import './styles/motion.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode><App /></StrictMode>,
);
