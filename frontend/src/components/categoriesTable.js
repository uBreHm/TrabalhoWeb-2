import { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center,
  Text,
  IconButton,
  Button,
  Heading,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { fetchCategories, deleteCategories } from "../pages/api/categories"; // Importe a função fetchCategories e deleteCategory da API de categorias
import { authMiddleware } from "@/middleware/auth";

const CategoriesTable = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteCategories(id);
      const updatedCategories = categories.filter((category) => category._id !== id);
      setCategories(updatedCategories);
      console.log("Categoria deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/formCategories/${id}`);
  };

  const handleCreate = () => {
    router.push(`/admin/createCategories`);
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">Erro: {error}</Text>
      </Center>
    );
  }

  return (
    <Box p={5} boxShadow="base" borderRadius="md" bg="white" width="100%">
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="lg">Categorias</Heading>
      </Box>
      <Table variant="striped" size="md" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>Descrição</Th>
            <Th>Tipo</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => (
            <Tr key={category._id}>
              <Td>{category.description}</Td>
              <Td>{category.type}</Td>
              <Td>
                <IconButton
                  variant="ghost"
                  colorScheme="teal"
                  aria-label="Editar"
                  icon={<EditIcon />}
                  onClick={() => handleEdit(category._id)}
                />
                <IconButton
                  variant="ghost"
                  colorScheme="red"
                  aria-label="Deletar"
                  icon={<DeleteIcon />}
                  onClick={() => handleDelete(category._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box mt={4} display="flex" justifyContent="flex-end">
        <Button colorScheme="teal" onClick={handleCreate}>
          Criar Nova Categoria
        </Button>
      </Box>
    </Box>
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

export default CategoriesTable;
