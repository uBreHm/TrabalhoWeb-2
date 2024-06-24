import { Box } from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import AccountForm from "../../components/accountForms";
import { authMiddleware } from "@/middleware/auth";

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

export const getServerSideProps = async (ctx) => {
  const authResult = await authMiddleware(ctx);

  if (!authResult.props.isAdmin) {
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


export default CreateAccountsPage;
