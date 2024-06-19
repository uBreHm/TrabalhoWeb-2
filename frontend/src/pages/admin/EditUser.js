// pages/admin/EditUser.js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FormUser from '../../../components/FormUser';
import Navbar from '../../../components/Navbar';
import { Box } from '@chakra-ui/react';
import { fetchUserById } from '../../api/user';
import { authMiddleware } from '@/middleware/auth';

const EditUser = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchUserById(id);
        setUser(response);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  return (
    <Box display="flex">
      <Navbar />
      <Box ml="220px" p={4} width="100%">
        <h1>Editar Usuário</h1>
        {user ? <FormUser userId={id} /> : <p>Carregando...</p>}
      </Box>
    </Box>
  );
};

export const getServerSideProps = async (ctx) => {
  const { props } = await authMiddleware(ctx);
  return { props };
};

export default EditUser;
