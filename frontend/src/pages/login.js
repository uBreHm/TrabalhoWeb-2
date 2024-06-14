// Login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { login, checkAdmin } from '../pages/api/hello'; // Importe as funções de login e checkAdmin
import styles from '../styles/login.module.css'; // Importe o estilo CSS
import Cookies from 'js-cookie'; // Importe js-cookie

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    user: '',
    pwd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData.user, formData.pwd);
      if (response && response.token) {
        Cookies.set('token', response.token); // Armazena o token em um cookie

        try {
          const isAdminResponse = await checkAdmin(response.token);
          if (isAdminResponse.isAdmin === true) {
            router.push('/admin/dashboard'); // Redireciona para a dashboard de admin
          } else {
            console.error('Usuário não é administrador');
            router.push('/'); // Redireciona para a página inicial
          }
        } catch (error) {
          console.error('Erro ao verificar acesso de administrador:', error.message);
          router.push('/login'); // Em caso de erro, redireciona para o login
        }
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      router.push('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Login</h1>
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
