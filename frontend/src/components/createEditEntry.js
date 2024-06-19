import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { updateEntry, createEntry } from "@/pages/api/entries";
import { fetchCategories } from "@/pages/api/categories"; // Importe corrigido da função fetchCategories

const EntryForm = ({ entry }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    type: entry ? entry.type : "",
    category: entry ? entry.category : "", // Renomeei categories para category para refletir melhor o campo
    description: entry ? entry.description : "",
    value: entry ? entry.value : "",
    due_date: entry ? entry.due_date : "",
    payment_date: entry ? entry.payment_date : "",
    account: entry ? entry.account : "",
    status: entry ? entry.status : "",
    comments: entry ? entry.comments : "",
  });

  const [categories, setCategories] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories(); // Chamada para buscar categorias
        setCategories(categoriesData); // Atualiza o estado com as categorias recebidas
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        // Trate o erro ao buscar categorias
      }
    };

    fetchCategoriesData();
  }, []); // [] garante que isso é executado apenas uma vez ao montar o componente

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        value: parseFloat(formData.value).toFixed(2),
      };

      if (entry) {
        await updateEntry(`${entry._id}`, dataToSend);
        setAlertMessage("Entrada atualizada com sucesso!");
      } else {
        await createEntry(dataToSend);
        setAlertMessage("Entrada criada com sucesso!");
      }
      setFormData({
        type: "",
        category: "", // Limpa o campo de categoria
        description: "",
        value: "",
        due_date: "",
        payment_date: "",
        account: "",
        status: "",
        comments: "",
      });
      setAlertType("success");
    } catch (error) {
      console.error("Erro:", error);
      setAlertType("error");
      setAlertMessage("Erro ao enviar entrada. Por favor, tente novamente.");
    }
  };

  const handleCancel = () => {
    router.push('/admin/dashboard');
  };

  return (
    <Box p={5} ml={5} mt={5} boxShadow="base" borderRadius="md" bg="white" width="80%">
      {alertMessage && (
        <Alert status={alertType} mb={4} rounded="md">
          <AlertIcon />
          {alertMessage}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <FormControl id="type" mb={4}>
          <FormLabel>Tipo</FormLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="Despesa">Despesa</option>
            <option value="Receita">Receita</option>
          </Select>
        </FormControl>

        <FormControl id="category" mb={4}>
          <FormLabel>Categoria</FormLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.description}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl id="description" mb={4}>
          <FormLabel>Descrição</FormLabel>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl id="value" mb={4}>
          <FormLabel>Valor</FormLabel>
          <Input
            type="text"
            name="value"
            value={formData.value}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl id="due_date" mb={4}>
          <FormLabel>Data de Vencimento</FormLabel>
          <Input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
            required
          />
        </FormControl>

        <FormControl id="payment_date" mb={4}>
          <FormLabel>Data de Pagamento</FormLabel>
          <Input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="account" mb={4}>
          <FormLabel>Conta</FormLabel>
          <Select
            name="account"
            value={formData.account}
            onChange={handleChange}
            required
          >
            <option value="Conta Corrente">Conta Corrente</option>
            <option value="Conta Poupança">Conta Poupança</option>
          </Select>
        </FormControl>

        <FormControl id="status" mb={4}>
          <FormLabel>Status</FormLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Lancada">Lançada</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Paga">Paga</option>
            <option value="Cancelada">Cancelada</option>
          </Select>
        </FormControl>

        <FormControl id="comments" mb={4}>
          <FormLabel>Comentários</FormLabel>
          <Textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />
        </FormControl>

        <Button colorScheme="teal" type="submit">
          {entry ? "Atualizar Entrada" : "Criar Entrada"}
        </Button>
        <Button colorScheme="gray" onClick={handleCancel} m={5}>
          Cancelar
        </Button>
      </form>
    </Box>
  );
};

export default EntryForm;
