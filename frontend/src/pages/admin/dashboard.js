// pages/admin/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      try {
        const decodedToken = jwtDecode(token);
        // Verifica se o token foi decodificado corretamente e se tem a propriedade 'level'
        if (decodedToken && decodedToken.level === 'admin') {
          // Aqui você pode fazer uma chamada para um endpoint que retorne os dados do usuário
          // e definir os dados do usuário no estado
          setUser(decodedToken); // Definindo os dados do usuário no estado
        } else {
          router.push('/'); // Redireciona para a página inicial se não for um usuário admin
        }
      } catch (error) {
        console.error('Erro ao decodificar token:', error.message);
        router.push('/login');
      }
    }
  }, [router]);

  if (!user) {
    return null; // Pode renderizar um componente de carregamento enquanto busca os dados do usuário
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Bem-vindo, {user.user}!</p>
      {/* Conteúdo da dashboard */}
    </div>
  );
}
