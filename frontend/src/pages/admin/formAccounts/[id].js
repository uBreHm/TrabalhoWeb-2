import { Flex } from '@chakra-ui/react';
import Navbar from '@/components/navbar';
import AccountForm from '@/components/accountForms';

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

export default AccountPage;

export async function getServerSideProps({ params }) {
  return {
    props: {
      accountId: params.id || null,
    },
  };
}
