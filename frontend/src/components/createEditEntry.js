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
  Heading,
} from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { updateEntry, createEntry } from "@/pages/api/entries";
import { fetchCategories } from "@/pages/api/categories";
import { fetchAccounts } from "@/pages/api/accounts";

const EntryForm = ({ entry }) => {
  const router = useRouter();

  const initialFormData = {
    type: entry ? entry.type : "",
    category: entry ? entry.category?._id : "",
    categoryDescription: entry ? entry.category?.description : "",
    description: entry ? entry.description : "",
    value: entry ? entry.value : "",
    due_date: entry ? entry.due_date.split('T')[0] : "",
    payment_date: entry ? (entry.payment_date ? entry.payment_date.split('T')[0] : "") : "",
    account: entry ? entry.account : "",
    status: entry ? entry.status : "",
    comments: entry ? entry.comments : "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const fetchAccountsData = async () => {
      try {
        const accountsData = await fetchAccounts();
        setAccounts(accountsData);
      } catch (error) {
        console.error("Erro ao buscar contas:", error);
      }
    };

    fetchAccountsData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'category') {
      const selectedCategoryId = value; // Aqui pegamos o ID da categoria selecionada diretamente do evento
      const selectedCategory = categories.find(category => category._id === selectedCategoryId);

      if (selectedCategory) {
        setFormData((prevData) => ({
          ...prevData,
          category: selectedCategory._id, // Atualizamos o ID da categoria selecionada
          categoryDescription: selectedCategory.description,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        value: parseFloat(formData.value).toFixed(2),
        category: formData.category, // Aqui estamos enviando o ID da categoria
        due_date: formData.due_date,
        payment_date: formData.payment_date,
      };

      if (entry) {
        await updateEntry(`${entry._id}`, dataToSend);
        router.push('/admin/dashboard');
        setAlertMessage("Entrada atualizada com sucesso!");
      } else {
        await createEntry(dataToSend);
        router.push('/admin/dashboard');
        setAlertMessage("Entrada criada com sucesso!");
      }
      setFormData(initialFormData); // Limpa o formulário após submissão
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
      <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="lg">{entry ? "Editar Entrada" : "Criar Entrada"}</Heading>
      </Box>

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
            <option value="">Selecione o tipo</option>
            {categories.map((category) => (
              <option key={category._id} value={category.type}>
                {category.type}
              </option>
            ))}
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
            <option value="">Selecione a Categoria</option>
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
            <option value="">Selecione a Conta</option>
            {accounts.map((account) => (
              <option key={account._id} value={account.description}>
                {account.description} ({account.comments})
              </option>
            ))}
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
            <option value="">Selecione o Status</option>
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
