import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import TableAccounts from "../../components/accountsTable";
import { authMiddleware } from "@/middleware/auth";

const AccountsPage = () => {
  return (
    <Flex>
      <Navbar />
      <Box ml="220px" p="4">
        <TableAccounts />
      </Box>
    </Flex>
  );
};

export const getServerSideProps = async (ctx) => {
  debugger
  const authResult = await authMiddleware(ctx);
  if (!authResult.isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { isAdmin: authResult.isAdmin },
  };
};

export default AccountsPage;
