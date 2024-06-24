// pages/categories/[id].js
import { useRouter } from 'next/router';
import CategoryForm from '@/components/categoryForm';
import Navbar from '@/components/navbar';
import { Box } from '@chakra-ui/react';
import { authMiddleware } from '@/middleware/auth';

const EditCategory = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Box display="flex">
      <Navbar />
      <Box ml="220px" p={4} width="100%">
        <CategoryForm categoryId={id} />
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


export default EditCategory;
