import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import NotesService from '@/services/NotesService';

type Props = {};

const Notes = (props: Props) => {
  const navigate = useNavigate();
  const notesService = new NotesService();

  useEffect(() => {
    if (!Cookies.get('token')) {
      navigate('/login');
    }

    notesService.getNotes().then((res) => {
      console.log({ res });
    });
  }, []);

  const logoutHandler = () => {
    Cookies.remove('token');
    navigate('/login');
  };
  return (
    <div>
      Notes
      <button type="button" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default Notes;
