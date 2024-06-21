// components/EntryForm.jsx
import { useState, useEffect } from 'react';
import { Select, Input, FormControl, FormLabel, Button, Stack } from '@chakra-ui/react';
import { fetchCategories } from '@/pages/api/categories';
import { fetchEntryById, createEntry, updateEntry } from '@/pages/api/entries';

const EntryForm = ({ entryId, onSubmit }) => {
  const [formData, setFormData] = useState({
    type: 'Despesa',
    categories: '',
    description: '',
    value: '',
    due_date: '',
    payment_date: '',
    account: '',
    status: 'Paga',
    comments: '',
  });

  const [loading, setLoading] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categories = await fetchCategories();
        setCategoryOptions(categories);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        // Trate o erro conforme necessário
      }
    };

    fetchCategoriesData();
  }, []);

  useEffect(() => {
    const fetchEntryData = async () => {
      if (entryId) {
        try {
          const entry = await fetchEntryById(entryId);
          setFormData(entry); // Preenche o formulário com os dados da entrada encontrada
        } catch (error) {
          console.error('Erro ao buscar entrada:', error);
          // Trate o erro conforme necessário
        }
      }
    };

    fetchEntryData();
  }, [entryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (entryId) {
        await updateEntry(entryId, formData);
      } else {
        await createEntry(formData);
      }
      await onSubmit(formData);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <Stack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="type">Tipo</FormLabel>
          <Select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Receita">Receita</option>
            <option value="Despesa">Despesa</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="categories">Categoria</FormLabel>
          <Select
            name="categories"
            value={formData.categories}
            onChange={handleChange}
          >
            {categoryOptions.map((category) => (
              <option key={category._id} value={category.description}>
                {category.description}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="description">Descrição</FormLabel>
          <Input
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="value">Valor</FormLabel>
          <Input
            type="number"
            step="0.01"
            name="value"
            value={formData.value}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="due_date">Data de Vencimento</FormLabel>
          <Input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="payment_date">Data de Pagamento</FormLabel>
          <Input
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="account">Conta</FormLabel>
          <Input
            name="account"
            value={formData.account}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="status">Status</FormLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Paga">Paga</option>
            <option value="Pendente">Pendente</option>
            {/* Adicione outras opções de status conforme necessário */}
          </Select>
        </FormControl>

        <Button type="submit" isLoading={loading}>
          {entryId ? 'Atualizar Entrada' : 'Criar Entrada'}
        </Button>
      </Stack>
    </form>
  );
};

export default EntryForm;
