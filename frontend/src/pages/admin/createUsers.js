// pages/createEditUsers.js
import Navbar from '../../components/navbar';
import FormUser from '../../components/formUsers';
import { Box } from '@chakra-ui/react';
import { authMiddleware } from '@/middleware/auth';

const CreateUser = () => {
  return (
    <Box display="flex">
      <Navbar />
      <Box ml="220px" p={4} width="100%">
        <h1>Criar Usuário</h1>
        <FormUser />
      </Box>
    </Box>
  );
};

export async function getServerSideProps(ctx) {
  const authResult = await authMiddleware(ctx);
  if ('redirect' in authResult) {
    return authResult;
  }
  return {
    props: { ...authResult.props },
  };
}

export default CreateUser;
