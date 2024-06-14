// pages/_app.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css'; // Importe seus estilos globais aqui

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Redireciona para a página de login assim que o aplicativo for inicializado
    router.replace('/login');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
