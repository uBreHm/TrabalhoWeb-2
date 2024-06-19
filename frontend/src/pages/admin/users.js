// pages/admin/userForm.js
import { authMiddleware } from '@/middleware/auth';
import Navbar from '../../components/navbar';
import FormUser from '../../components/tableUsers';
import { Box } from '@chakra-ui/react';

const CreateUser = () => {
  return (
    <Box display="flex">
      <Navbar />
      <Box ml="220px" p={4} width="100%">
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
