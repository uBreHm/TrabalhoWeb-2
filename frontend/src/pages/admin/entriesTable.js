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
  Button,
  Select,
} from "@chakra-ui/react";
import { fetchEntries, deleteEntry } from "../api/entries";
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import styles from "../../styles/tableEntries.module.css";
import { useRouter } from "next/router";
import { authMiddleware } from "@/middleware/auth";

const TableEntries = () => {
  const router = useRouter();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterMonth, setFilterMonth] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEntries();
        setEntries(data);
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
      await deleteEntry(id);
      const updatedEntries = entries.filter((entry) => entry._id !== id);
      setEntries(updatedEntries);
      console.log("Entrada deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar entrada:", error);
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/formEntry/${id}`);
  };

  const handleCreate = () => {
    router.push(`/admin/createEntry`);
  };

  const handleConfirm = (id) => {
    // Lógica para confirmar o lançamento
  };

  const handlePay = (id) => {
    // Lógica para realizar o pagamento
  };

  const handleCancel = (id) => {
    // Lógica para cancelar o lançamento
  };

  const handleFilterChange = (event) => {
    setFilterMonth(event.target.value);
  };

  const filteredEntries = filterMonth
    ? entries.filter(
        (entry) =>
          new Date(entry.due_date).getMonth() === parseInt(filterMonth, 10) - 1
      )
    : entries;

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
    <Box p={5} boxShadow="base" borderRadius="md" bg="white">
      <Box mb={4}>
        <Heading as="h2" size="lg" mb={4}>
          Lançamentos
        </Heading>
        <Box mb={4} display="flex" justifyContent="space-between">
          <Select placeholder="Filtrar por mês" onChange={handleFilterChange}>
            <option value="1">Janeiro</option>
            <option value="2">Fevereiro</option>
            <option value="3">Março</option>
            <option value="4">Abril</option>
            <option value="5">Maio</option>
            <option value="6">Junho</option>
            <option value="7">Julho</option>
            <option value="8">Agosto</option>
            <option value="9">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </Select>
          <Button colorScheme="teal" onClick={handleCreate}>
            Criar Lançamento
          </Button>
        </Box>
        <Box className={styles["table-wrapper"]}>
          <Table
            className={styles["custom-table"]}
            variant="striped"
            size="md"
            colorScheme="gray"
          >
            <Thead>
              <Tr>
                <Th>Tipo</Th>
                <Th>Categoria</Th>
                <Th>Descrição</Th>
                <Th>Valor</Th>
                <Th>Data de Vencimento</Th>
                <Th>Data de Pagamento</Th>
                <Th>Conta</Th>
                <Th>Status</Th>
                <Th>Comentários</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredEntries.map((entry) => (
                <Tr key={entry._id}>
                  <Td>{entry.type}</Td>
                  <Td>{entry.categories}</Td>
                  <Td>{entry.description}</Td>
                  <Td>{`R$ ${parseFloat(entry.value).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}</Td>
                  <Td>{new Date(entry.due_date).toLocaleDateString()}</Td>
                  <Td>
                    {entry.payment_date
                      ? new Date(entry.payment_date).toLocaleDateString()
                      : "N/A"}
                  </Td>
                  <Td>{entry.account}</Td>
                  <Td>{entry.status}</Td>
                  <Td>{entry.comments}</Td>
                  <Td>
                    <IconButton
                      as="button"
                      variant="ghost"
                      colorScheme="teal"
                      aria-label="Editar"
                      icon={<EditIcon />}
                      onClick={() => handleEdit(entry._id)}
                    />
                    <IconButton
                      variant="ghost"
                      colorScheme="red"
                      aria-label="Deletar"
                      icon={<DeleteIcon />}
                      onClick={() => handleDelete(entry._id)}
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

export default TableEntries;
