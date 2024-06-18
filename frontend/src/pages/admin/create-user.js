// pages/createEditUsers.js
import Navbar from '../../components/navbar';
import FormUser from '../../components/formUsers';
import { Box } from '@chakra-ui/react';

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

export default CreateUser;
