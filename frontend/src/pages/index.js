// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a página de login assim que a página inicial for carregada
    router.replace('/login');
  }, []);

  return null; // Não renderiza nada na página inicial
}
