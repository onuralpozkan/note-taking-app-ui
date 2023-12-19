import { useEffect, useState, Fragment, useRef } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
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
import Button from '@/components/Button';
/* Styles */
import './Home.scss';

interface User {
  user: boolean;
}
function Home({ user }: User) {
  // if (!user) {
  //   return <Navigate to="/auth" replace />;
  // }

  const [data, setData] = useState<{ label: string; id: string; selected: boolean; note: string }[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  const newNoteInput = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [labelValue, setLabelValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectedNoteId, setSetselectedNoteId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [noteList, setNoteList] = useState<string[]>([]);
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addNote = () => {
    setNoteList([...noteList, labelValue])
  };

  console.log(noteList);

  return (
    <>
      <div className="noteapp">
        <header className="header">
          <span className="header__title">Note App</span>
          <button className="header__menu" type="button" onClick={() => setIsMenuOpen((prevState) => !prevState)}>
            ---
          </button>
        </header>
        <div className="rich-text">
          <ReactQuill />
        </div>
        <div className="textarea">
          <textarea name="textarea" id=""></textarea>
        </div>
      </div>
      <div className={`note-list__overlay note-list__overlay--${isMenuOpen ? 'open' : 'close'}`}>
        <div className={`note-list__menu note-list__menu--${isMenuOpen ? 'open' : 'close'}`}>
          <ul className="list">
            <li className="list-item list-item__title">
              List Title <StickyNote2 />
            </li>
            <li className="list-item">İtem 1</li>
            {noteList.length && noteList.map((i) => <li className="list-item">{i}</li>)}
            <li className="list-item list-item__add-note">
              <input
                type="text"
                name="add-note"
                id="add-note"
                placeholder="Yeni not ekle..."
                onChange={(e) => setLabelValue(e.target.value)}
                value={labelValue}
              />
              <button onClick={addNote}>
                <NoteAdd />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Home;
