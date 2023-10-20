/* Toastify alerts */
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@/components/Button';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type Props = { setUser: React.Dispatch<React.SetStateAction<boolean>> };

const Login = ({ setUser }: Props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget) as unknown as Iterable<
      [{ username: string; password: string }, FormDataEntryValue]
    >;
    const { password, username }: { username: string; password: string } = Object.fromEntries(formData);
    const options = {
      headers: {
        'Content-Type': 'application/json',
      },

      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    };
    fetch('http://localhost:3000/auth', options)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.message);
          setUser(true);
          navigate('/home', { replace: true });
        } else {
          toast.error(res.message);
          setUser(false);
        }
        console.log('****auth res', res);
      })
      .catch((e) => console.log('****auth e', e))
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="login-page">
      <ToastContainer />
      <form className="login-page__form" onSubmit={handleSubmit}>
        <input type="text" name="username" id="username" placeholder="Kullanıcı Adı" pattern="\w{3,16}" required />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Şifre"
          pattern="\d{4,4}"
          maxLength={4}
          required
        />

        <Button label={isLoading ? '...' : 'Onayla'} type="submit" disabled={isLoading} />
      </form>
    </div>
  );
};

export default Login;
