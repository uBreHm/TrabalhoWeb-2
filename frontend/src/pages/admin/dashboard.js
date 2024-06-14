import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { checkAdmin } from '../api/hello';
import styles from '../../styles/dashboard.module.css'; // Importe o novo estilo CSS

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    } else {
      try {

        checkAdmin(token)
          .then((isAdminResponse) => {
            if (isAdminResponse.isAdmin === true) {
              // Se for administrador, pode definir mais estados ou carregar dados da dashboard
            } else {
              console.error('Usuário não é administrador');
              router.push('/');
            }
          })
          .catch((error) => {
            console.error('Erro ao verificar acesso de administrador:', error.message);
            router.push('/login');
          });

      } catch (error) {
        console.error('Erro ao decodificar token:', error.message);
        router.push('/login');
      }
    }
  }, [router]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Admin Dashboard</h1>
        <p>Bem-vindo, {user.user}!</p>
        {/* Conteúdo da dashboard */}
      </div>
    </div>
  );
}
