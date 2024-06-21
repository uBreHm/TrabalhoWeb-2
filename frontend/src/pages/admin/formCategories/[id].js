// pages/categories/[id].js
import { useRouter } from 'next/router';
import CategoryForm from '@/components/categoryForm';
import Navbar from '@/components/navbar';
import { Box } from '@chakra-ui/react';

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

export default EditCategory;
