import { Flex } from '@chakra-ui/react';
import Navbar from '@/components/navbar';
import AccountForm from '@/components/accountForms';
import { authMiddleware } from '@/middleware/auth';

const AccountPage = ({ accountId }) => {
  return (
    <Flex>
      <Navbar />
      <Flex ml="220px" p={4} width="100%">
        <AccountForm accountId={accountId} />
      </Flex>
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

export default AccountPage;

