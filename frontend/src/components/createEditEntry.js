import { useState } from "react";
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
import axios from "axios";
import { useRouter } from 'next/router';
import { updateEntry } from "@/pages/api/entries";

const EntryForm = ({ entry }) => {
  const router = useRouter();

  // Inicialização simples do estado
  const [formData, setFormData] = useState({
    type: entry ? entry.type : "",
    categories: entry ? entry.categories : "",
    description: entry ? entry.description : "",
    value: entry ? entry.value : "",
    due_date: entry ? entry.due_date : "",
    payment_date: entry ? entry.payment_date : "",
    account: entry ? entry.account : "",
    status: entry ? entry.status : "",
    comments: entry ? entry.comments : "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  // Função para lidar com a mudança nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        value: parseFloat(formData.value).toFixed(2),
      };

      if (entry) {
        await updateEntry(`${entry._id}`, dataToSend);
      } else {
        await axios.post(dataToSend);
      }
      setFormData({
        type: "",
        categories: "",
        description: "",
        value: "",
        due_date: "",
        payment_date: "",
        account: "",
        status: "",
        comments: "",
      });
      setAlertType("success");
      setAlertMessage(entry ? "Entrada atualizada com sucesso!" : "Entrada criada com sucesso!");
    } catch (error) {
      console.error("Error:", error);
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

        <FormControl id="categories" mb={4}>
          <FormLabel>Categoria</FormLabel>
          <Input
            name="categories"
            value={formData.categories}
            onChange={handleChange}
            required
          />
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
            type="text" // Mantido como texto para formatação
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
          <Input
            name="account"
            value={formData.account}
            onChange={handleChange}
            required
          />
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
        <Button colorScheme="gray" type="submit" onClick={handleCancel} m={5}>
          Cancelar
        </Button>
      </form>
    </Box>
  );
};

export default EntryForm;
