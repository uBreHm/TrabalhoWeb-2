
import Navbar from '../../components/navbar';
import FormUser from '../../components/formUsers';
import { Box } from '@chakra-ui/react';
import { authMiddleware } from '@/middleware/auth';

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

export const getServerSideProps = async (ctx) => {
  const authResult = await authMiddleware(ctx);

  if (authResult.redirect) {
    return authResult;
  }

  if (!authResult.props || !authResult.props.isAdmin) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { isAdmin: authResult.props.isAdmin },
  };
};



export default CreateUser;
