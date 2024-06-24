// pages/admin/createCategory.js
import { Box } from '@chakra-ui/react';
import Navbar from '@/components/navbar'; 
import CategoriesTable from '@/components/categoriesTable'; 
import { authMiddleware } from '@/middleware/auth';

const CreateCategoryPage = () => {
  return (
    <Box display="flex">
      <Navbar />
      <Box ml="220px" p={10} flex="1">
        <CategoriesTable />
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


export default CreateCategoryPage;
