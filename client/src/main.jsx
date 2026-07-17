import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import "@fontsource/syne/700.css";
import "@fontsource/syne/800.css";

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
