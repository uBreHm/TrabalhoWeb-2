import { Box, Flex } from "@chakra-ui/react";
import Navbar from "../../components/navbar";
import TableAccounts from "../../components/accountsTable";

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

export default AccountsPage;
