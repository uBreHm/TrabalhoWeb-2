import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { checkAdmin } from '../api/hello';
import Navbar from '../../components/navbar'; // Certifique-se de que o caminho está correto
import styles from '../../styles/dashboard.module.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login');
    } else {
      checkAdmin(token)
        .then((isAdminResponse) => {
          if (isAdminResponse && isAdminResponse.isAdmin) {
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
          setLoading(false);
        });
    }
  }, [router]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <h1>Admin Dashboard</h1>
        <p>Bem-vindo, administrador!</p>
      </div>
    </div>
  );
}
