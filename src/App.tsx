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
import './App.scss';

function App() {
  const [data, setData] = useState<{ label: string; id: string; selected: boolean; note: string }[]>([]);
  const divRef = useRef<HTMLDivElement>(null);
  const newNoteInput = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [labelValue, setLabelValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectedNoteId, setSetselectedNoteId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const DELAY_TIME = 500;
  const addNote = () => {
    if (labelValue === '') {
      newNoteInput.current?.focus();
    }
    const id = crypto.randomUUID();
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },

      method: 'POST',
      body: JSON.stringify({
        id: id,
        note: '',
        selected: true,
        label: labelValue,
      }),
    };
    fetch('http://localhost:3000/add-note', options)
      .then((res) => res.json())
      .then((data) => toast.info(data.message));

    setLabelValue('');

    setTimeout(() => {
      getNotes();
    }, DELAY_TIME);
  };
  const selectNote = (id: string) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, selected: true };
      } else {
        return { ...item, selected: false };
      }
    });

    setData(newData);
  };
  const saveText = () => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        id: selectedNoteId,
        note: value,
        selected: true,
        label: 'Label',
      }),
    };
    fetch('http://localhost:3000/note/' + selectedNoteId, options)
      .then((res) => res.json())
      .then((data) => toast.success(data.message));
    setTimeout(() => {
      getNotes();
    }, DELAY_TIME);
  };

  const deleteText = () => {
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    };
    fetch('http://localhost:3000/note/' + selectedNoteId, options)
      .then((res) => res.json())
      .then((data) => toast.warn(data.message));
    setTimeout(() => {
      getNotes();
    }, DELAY_TIME);
  };
  const onChange = (e: any) => {
    console.log(e);

    setValue(e);
    setTextareaValue(e);
  };

  const getNotes = () => {
    setIsLoading(true);
    fetch('http://localhost:3000/notes')
      .then((res) => res.json())
      .then((data) => {
        if (data) setData(data);
        return;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setTextareaValue(data.find((item) => item.selected)?.note || '');
    setSetselectedNoteId(data.find((item) => item.selected)?.id || '');
  }, [data]);

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="noteapp flex-center">
      <section className="noteapp-container">
        <aside>
          <div className="add-note__container">
            <Button label="Note List" className="item__button item__header" />
            {data.map((item) => {
              return (
                <Fragment key={item.id}>
                  <Button
                    label={item.label}
                    onClick={() => selectNote(item.id)}
                    icon={<StickyNote2 />}
                    isSelected={item.selected}
                  />
                </Fragment>
              );
            })}
          </div>
          <div className="add-note__button-container flex-center">
            <input
              type="text"
              ref={newNoteInput}
              name="label-input"
              id="label-input"
              placeholder="New Note"
              value={labelValue}
              onChange={(e) => setLabelValue(e.target.value)}
            />
            <button onClick={addNote} className="flex-center">
              <NoteAdd />
            </button>
          </div>
        </aside>
        <header>
          <h5>Note Takin' App</h5>
        </header>
        <main className={isLoading || data.length === 0 ? 'flex-center' : ''}>
          {isLoading ? (
            <span className="flex-center" style={{ height: '100%' }}>
              <PuffLoader color="var(--primary)" />
            </span>
          ) : data.length !== 0 ? (
            <div id={data.find((item) => item.selected)?.id || ''} ref={divRef} className="edit-container">
              <ReactQuill className="note-editor" theme="snow" value={textareaValue} onChange={onChange} />
            </div>
          ) : (
            <span className="flex-center" style={{ height: '100%' }}>
              No notes have been created yet
            </span>
          )}
        </main>
        <footer>
          {data.length > 0 ? (
            <div className="action-buttons">
              <Button label="Save" onClick={saveText} icon={<Save />} />
              <Button label="Delete" onClick={deleteText} icon={<Delete />} />
            </div>
          ) : null}
        </footer>
      </section>
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
