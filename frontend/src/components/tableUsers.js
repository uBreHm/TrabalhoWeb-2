// components/TableUsers.js
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
  Heading,
} from "@chakra-ui/react";
import { fetchUsers, deleteUser } from "../pages/api/user";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const TableUsers = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Apenas executa uma vez no início

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      const updatedUsers = users.filter((user) => user._id !== id);
      setUsers(updatedUsers);
      console.log("Usuário deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/formUser/${id}`);
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
    <Box display="flex">
      <Box p={5} boxShadow="base" borderRadius="md" bg="white" width="100%">
        <Box mb={4}>
          <Heading as="h2" size="lg" mb={4}>
            Usuários
          </Heading>
          <Table variant="striped" size="md" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Usuário</Th>
                <Th>Nível</Th>
                <Th>Status</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user) => (
                <Tr key={user._id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.user}</Td>
                  <Td>{user.level}</Td>
                  <Td>{user.status}</Td>
                  <Td>
                    <IconButton
                      as="button"
                      variant="ghost"
                      colorScheme="teal"
                      aria-label="Editar"
                      icon={<EditIcon />}
                      onClick={() => handleEdit(user._id)}
                    />
                    <IconButton
                      variant="ghost"
                      colorScheme="red"
                      aria-label="Deletar"
                      icon={<DeleteIcon />}
                      onClick={() => handleDelete(user._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default TableUsers;
