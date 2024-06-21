import { Box } from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import AccountForm from "../../components/accountForms";

const CreateAccountsPage = () => {
  return (
    <Box display="flex" flexDirection="row" height="100vh">
      <Navbar />
      <Box ml="220px" p={5} width="100%">
        <AccountForm />
      </Box>
    </Box>
  );
};

export default CreateAccountsPage;
