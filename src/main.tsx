import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import '@styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Router>
    <App />
  </Router>
);
