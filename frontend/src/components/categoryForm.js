// components/EntryForm.jsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, useToast } from '@chakra-ui/react';
import { createEntry, updateEntry, fetchEntryById } from '@/pages/api/entries'; // Defina suas funções de API para entradas

const EntryForm = ({ entryId }) => {
  const [type, setType] = useState('');
  const [categories, setCategories] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [account, setAccount] = useState('');
  const [status, setStatus] = useState('');
  const [comments, setComments] = useState('');

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (entryId) {
      fetchEntry(entryId);
    }
  }, [entryId]);

  const fetchEntry = async (id) => {
    try {
      const response = await fetchEntryById(`/${id}`);
      const { type, categories, description, value, due_date, payment_date, account, status, comments } = response;
      setType(type);
      setCategories(categories);
      setDescription(description);
      setValue(value);
      setDueDate(new Date(due_date).toISOString().split('T')[0]); // Formato YYYY-MM-DD para input date
      setPaymentDate(new Date(payment_date).toISOString().split('T')[0]); // Formato YYYY-MM-DD para input date
      setAccount(account);
      setStatus(status);
      setComments(comments);
    } catch (error) {
      toast({
        title: 'Erro ao buscar entrada.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const entryData = {
      type,
      categories,
      description,
      value,
      due_date: dueDate,
      payment_date: paymentDate,
      account,
      status,
      comments
    };

    try {
      if (entryId) {
        await updateEntry(`/${entryId}`, entryData);
        toast({
          title: 'Entrada atualizada.',
          description: 'Entrada atualizada com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        await createEntry(entryData);
        toast({
          title: 'Entrada criada.',
          description: 'Entrada criada com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
      router.push('/admin/entries');
    } catch (error) {
      toast({
        title: 'Erro.',
        description: `Erro ao ${entryId ? 'atualizar' : 'criar'} entrada: ${error.message}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl id="type" isRequired>
          <FormLabel>Tipo</FormLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option key="Despesa" value="Despesa">Despesa</option>
            <option key="Receita" value="Receita">Receita</option>
          </Select>
        </FormControl>
        <FormControl id="categories" isRequired mt={4}>
          <FormLabel>Categorias</FormLabel>
          <Input
            type="text"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
        </FormControl>
        <FormControl id="description" isRequired mt={4}>
          <FormLabel>Descrição</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <FormControl id="value" isRequired mt={4}>
          <FormLabel>Valor</FormLabel>
          <Input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </FormControl>
        <FormControl id="dueDate" isRequired mt={4}>
          <FormLabel>Data de Vencimento</FormLabel>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </FormControl>
        <FormControl id="paymentDate" mt={4}>
          <FormLabel>Data de Pagamento</FormLabel>
          <Input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
          />
        </FormControl>
        <FormControl id="account" isRequired mt={4}>
          <FormLabel>Conta</FormLabel>
          <Input
            type="text"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </FormControl>
        <FormControl id="status" isRequired mt={4}>
          <FormLabel>Status</FormLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option key="Paga" value="Paga">Paga</option>
            <option key="Confirmada" value="Confirmada">Confirmada</option>
            <option key="Pendente" value="Pendente">Pendente</option>
          </Select>
        </FormControl>
        <FormControl id="comments" mt={4}>
          <FormLabel>Comentários</FormLabel>
          <Textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          {entryId ? 'Atualizar Entrada' : 'Criar Entrada'}
        </Button>
      </form>
    </Box>
  );
};

export default EntryForm;
