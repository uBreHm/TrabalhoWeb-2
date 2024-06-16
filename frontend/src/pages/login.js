// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { login, checkAdmin } from '../pages/api/hello';
import styles from '../styles/login.module.css';
import Cookies from 'js-cookie';
import Message from '../components/messages';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ user: '', pwd: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData.user, formData.pwd);
      if (response && response.token) {
        Cookies.set('token', response.token);
        try {
          const isAdminResponse = await checkAdmin(response.token);
          if (isAdminResponse.isAdmin) {
            setMessage({ type: 'success', text: 'Login efetuado com sucesso' });
            router.push('/admin/dashboard');
          } else {
            setMessage({ type: 'error', text: 'Usuário não é administrador' });
            router.push('/');
          }
        } catch (error) {
          setMessage({ type: 'error', text: 'Erro ao verificar acesso de administrador' });
        }
      } else {
        setMessage({ type: 'error', text: 'Credenciais inválidas' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao fazer login' });
      Cookies.remove('token');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Login</h1>
        {message.text && <Message type={message.type} message={message.text} />}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Usuário:</label>
            <input type="text" name="user" value={formData.user} onChange={handleChange} className={styles.input} />
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" name="pwd" value={formData.pwd} onChange={handleChange} className={styles.input} />
          </div>
          <button type="submit" className={styles.button}>Entrar</button>
        </form>
      </div>
    </div>
  );
}
