import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
const container = document.getElementById('root');
const root = createRoot(container);
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
