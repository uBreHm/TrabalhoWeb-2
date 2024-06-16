import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { authMiddleware } from '../middleware/auth'; // Importa o middleware de autenticação
import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Middleware global para autenticação
  useEffect(() => {
    const handleRouteChange = async (url) => {
      const response = await authMiddleware({ url, cookies: document.cookie }); // Passa os cookies como um objeto
      if (response) {
        const { next, status, headers } = response;
        if (next) {
          router.replace(next.pathname);
        } else if (status === 302 && headers && headers.location) {
          router.replace(headers.location);
        }
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
