// pages/admin/userForm.js
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

export default CreateUser;
