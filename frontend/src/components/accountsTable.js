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
import { fetchAccounts, deleteAccounts } from "../pages/api/accounts";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

const TableAccounts = () => {
    const router = useRouter();
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAccounts();
                setAccounts(data);
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
            await deleteAccounts(id);
            const updatedAccounts = accounts.filter((account) => account._id !== id);
            setAccounts(updatedAccounts);
            console.log("Conta deletada com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar conta:", error);
        }
    };

    const handleEdit = (id) => {
        router.push(`/admin/formAccounts/${id}`);
    };

    const handleCreate = () => {
        router.push(`/admin/createAccounts`); // Redireciona para o formulário sem um ID
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
                <Heading as="h2" size="lg">Contas</Heading>
            </Box>
            <Table variant="striped" size="md" colorScheme="gray">
                <Thead>
                    <Tr>
                        <Th>Descrição</Th>
                        <Th>Comentários</Th>
                        <Th>Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {accounts.map((account) => (
                        <Tr key={account._id}>
                            <Td>{account.description}</Td>
                            <Td>{account.comments}</Td>
                            <Td>
                                <IconButton
                                    variant="ghost"
                                    colorScheme="teal"
                                    aria-label="Editar"
                                    icon={<EditIcon />}
                                    onClick={() => handleEdit(account._id)}
                                />
                                <IconButton
                                    variant="ghost"
                                    colorScheme="red"
                                    aria-label="Deletar"
                                    icon={<DeleteIcon />}
                                    onClick={() => handleDelete(account._id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Box mt={4} display="flex" justifyContent="flex-end">
                <Button colorScheme="teal" onClick={handleCreate}>
                    Criar Nova Conta
                </Button>
            </Box>
        </Box>
    );
};

export default TableAccounts;
