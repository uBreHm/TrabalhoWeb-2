// pages/index.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/login');
  }, []);

  return null; 
};

export default HomePage;
