// pages/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import { login, checkAdmin } from '../pages/api/hello'; // Verifique se o caminho está correto
import styles from '../styles/login.module.css';
import Cookies from 'js-cookie';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user: '',
    pwd: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await login(formData.user, formData.pwd);
      if (response && response.token) {
        Cookies.set('token', response.token);
        try {
          const isAdminResponse = await checkAdmin(response.token);
          if (isAdminResponse.isAdmin) {
            router.push('/admin/dashboard');
          } else {
            setError('Usuário não é administrador');
            router.push('/');
          }
        } catch (error) {
          setError('Erro ao verificar acesso de administrador');
          router.push('/login');
        }
      } else {
        setError('Credenciais inválidas');
        router.push('/login');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      setError('Erro ao fazer login');
      Cookies.remove('token');
      router.push('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <div>
            <label>Usuário:</label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              name="pwd"
              value={formData.pwd}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>Entrar</button>
        </form>
      </div>
    </div>
  );
}
