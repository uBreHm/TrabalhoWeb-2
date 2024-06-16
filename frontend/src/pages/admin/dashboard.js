// pages/admin/dashboard.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { checkAdmin } from '../api/hello';
import Nav from '../../components/nav'; // Verifique se o caminho está correto
import styles from '../../styles/dashboard.module.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    } else {
      checkAdmin(token)
        .then((isAdminResponse) => {
          if (isAdminResponse.isAdmin) {
            setUser(isAdminResponse);
          } else {
            console.error('Usuário não é administrador');
            router.push('/');
          }
        })
        .catch((error) => {
          console.error('Erro ao verificar acesso de administrador:', error.message);
          router.push('/login');
        })
        .finally(() => {
          setLoading(false); // Finaliza o estado de carregamento
        });
    }
  }, [router]);

  if (loading) {
    return <p>Carregando...</p>; // Renderiza um estado de carregamento
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      {/* <Nav /> */}
      <div className={styles.form}>
        <h1>Admin Dashboard</h1>
        <p>Bem-vindo, {user.user}!</p>
      </div>
    </div>
  );
}
