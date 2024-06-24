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


export default AccountPage;

