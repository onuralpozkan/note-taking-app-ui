import { useState, lazy, Suspense } from 'react';
/* Third Party */
import { Routes, Route } from 'react-router-dom';
/* Loading Spinner */
import { PuffLoader } from 'react-spinners';
/* Styles */
import './App.scss';

const Home = lazy(() => import('./pages/HomePage'));
const Login = lazy(() => import('./pages/Auth'));

function App() {
  const [user, setUser] = useState(false);

  return (
    <Routes>
      <Route
        index
        element={
          <Suspense fallback={<PuffLoader />}>
            <Login setUser={setUser} />
          </Suspense>
        }
      />
      <Route
        path="auth"
        element={
          <Suspense fallback={<PuffLoader />}>
            <Login setUser={setUser} />
          </Suspense>
        }
      />
      <Route
        path="home"
        element={
          <Suspense fallback={<PuffLoader />}>
            <Home user={user} />
          </Suspense>
        }
      />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
