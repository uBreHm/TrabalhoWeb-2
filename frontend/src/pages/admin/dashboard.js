// pages/admin-dashboard.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { checkAdmin } from '../api/hello';
import Nav from '../components/Nav'; // Importe o componente de navegação
import styles from '../../styles/dashboard.module.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    } else {
      checkAdmin(token)
        .then((isAdminResponse) => {
          if (isAdminResponse.isAdmin === true) {
            setUser(isAdminResponse);
          } else {
            console.error('Usuário não é administrador');
            router.push('/');
          }
        })
        .catch((error) => {
          console.error('Erro ao verificar acesso de administrador:', error.message);
          router.push('/login');
        });
    }
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Nav /> {/* Renderiza a barra de navegação */}
      <div className={styles.form}>
        <h1>Admin Dashboard</h1>
        <p>Bem-vindo, {user.user}!</p>
        {/* Conteúdo adicional do dashboard */}
      </div>
    </div>
  );
}
