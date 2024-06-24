// pages/admin/dashboard.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { checkAdmin } from '../api/hello';
import styles from '../../styles/dashboard.module.css';
import Nav from '@/components/navbar'; 
import TableEntries from '@/components/entryTable';
import EntryForm from '@/components/entryForm'; // Importe o componente de formulário de entrada

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingEntry, setEditingEntry] = useState(null); // Estado para controlar se está editando uma entrada

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
          router.push('/');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [router]);

  const handleEditEntry = (id) => {
    setEditingEntry(id); // Define o ID da entrada que está sendo editada
  };

  const handleBackToTable = () => {
    setEditingEntry(null); // Limpa o estado de edição para exibir a tabela novamente
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Nav />
      <div className={styles.content}>
        <h1>Admin Dashboard</h1>
        <p>Bem-vindo, administrador!</p>
        {editingEntry ? (
          <EntryForm entryId={editingEntry} onBackToTable={handleBackToTable} />
        ) : (
          <TableEntries onEditEntry={handleEditEntry} />
        )}
      </div>
    </div>
  );
}
