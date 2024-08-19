import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Main from './App.jsx'; // Importer Main au lieu de App
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Main />
    </StrictMode>,
);
