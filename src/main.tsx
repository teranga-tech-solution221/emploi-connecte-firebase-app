import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { register } from './serviceWorkerRegistration'

// Register service worker for PWA functionality
register();

createRoot(document.getElementById("root")!).render(<App />);
