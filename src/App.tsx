import { useEffect, useState, Fragment, useRef } from 'react';
/* Third Party */
/* ReactQuill Text Editor */
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
/* Loading Spinner */
import { PuffLoader } from 'react-spinners';
/* Toastify alerts */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
/* Icons */
import { Delete, Save, NoteAdd, StickyNote2 } from '@mui/icons-material';
/* Components */
import Button from './components/Button';
/* Styles */
import { Link, RouterProvider, Routes, Route } from 'react-router-dom';
import './App.scss';
import Login from './pages/Auth';
import Home from './pages/HomePage';

function App() {
  const [user, setUser] = useState(false);
  console.log({ user });

  return (
    <Routes>
      <Route index element={<Login setUser={setUser} />} />
      <Route path="auth" element={<Login setUser={setUser} />} />
      <Route path="home" element={<Home user={user} />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
