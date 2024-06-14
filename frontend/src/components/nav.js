// components/Nav.js

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Nav = () => {
  const router = useRouter();

  const handleCreateUser = () => {
    router.push('/criar-usuario'); // Redireciona para a página de criação de usuário
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/admin-dashboard">
            <a>Admin Dashboard</a>
          </Link>
        </li>
        <li>
          <button onClick={handleCreateUser}>Criar Novo Usuário</button>
        </li>
      </ul>
    </nav>
  );
};
d
export default Nav;
