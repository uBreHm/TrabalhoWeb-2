import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { fetchEntryById, createEntry, updateEntry } from '@/pages/api/entries';
import { fetchCategories } from '@/pages/api/categories';
import { fetchAccounts } from '@/pages/api/accounts';
import { authMiddlewares } from '@/middleware/auth';

const EntryForm = ({ entryId }) => {
  const [formData, setFormData] = useState({
    type: '',
    categories: '',
    description: '',
    value: '',
    due_date: '',
    payment_date: '',
    account: '',
    status: '',
    comments: '',
  });
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const router = useRouter();
  const toast = useToast();
  const [accountsOptions, setAccountsOptions] = useState([]);
  const [filterCategoriesOptions, setFilterCategoriesOptions] = useState([]);

  useEffect(() => {

    fetchCategoriesByType();
    fetchAccountsByType();
    if (entryId) fetchEntry(entryId)

  }, [entryId]);

  const fetchEntry = async (id) => {
    try {
      const response = await fetchEntryById(id);
      setFormData({
        ...response,
        due_date: response.due_date ? response.due_date.substring(0, 10) : '',
        payment_date: response.payment_date ? response.payment_date.substring(0, 10) : '',
      });

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

  const fetchAccountsByType = async () => {
    try {
      const accounts = await fetchAccounts(formData.type);
      setAccountsOptions(accounts);
    } catch (error) {
      toast({
        title: 'Erro ao buscar categorias por tipo.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }

  const fetchCategoriesByType = async () => {
    try {
      const categories = await fetchCategories(formData.type);
      setCategoriesOptions(categories);
      setFilterCategoriesOptions(categories);
    } catch (error) {
      toast({
        title: 'Erro ao buscar categorias por tipo.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

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
      if (entryId) {
        await updateEntry(entryId, formData);
        toast({
          title: 'Entrada atualizada.',
          description: 'Entrada atualizada com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        await createEntry(formData);
        toast({
          title: 'Entrada criada.',
          description: 'Entrada criada com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
      router.push('/admin/dashboard');
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

  const handleTypeChange = async (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      type: value,
    }));
    const filterCategories = categoriesOptions.filter(category => category.type === value);
    setFilterCategoriesOptions(filterCategories);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl id="type" isRequired>
            <FormLabel>Tipo</FormLabel>
            <Select
              name="type"
              value={formData.type}
              onChange={handleTypeChange}
            >
              <option value="Receita">Receita</option>
              <option value="Despesa">Despesa</option>
            </Select>
          </FormControl>

          <FormControl id="categories" isRequired>
            <FormLabel>Categorias</FormLabel>
            {filterCategoriesOptions && <Select
              name="categories"
              value={formData.categories}
              onChange={handleChange}
            >
              {filterCategoriesOptions.map((category) => (
                <option key={category._id} value={category.description}>
                  {category.description}
                </option>
              ))}
            </Select>}
          </FormControl>

          <FormControl id="description" isRequired>
            <FormLabel>Descrição</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="value" isRequired>
            <FormLabel>Valor</FormLabel>
            <Input
              type="text"
              name="value"
              value={formData.value}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="due_date" isRequired>
            <FormLabel>Data de Vencimento</FormLabel>
            <Input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="payment_date">
            <FormLabel>Data de Pagamento</FormLabel>
            <Input
              type="date"
              name="payment_date"
              value={formData.payment_date}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="account" isRequired>
            <FormLabel>Conta</FormLabel>
            <Select
              name="account"
              value={formData.account}
              onChange={handleChange}
            >
              {accountsOptions.map((accounts) => (
                <option key={accounts._id} value={accounts.description + " - " + accounts.comments}>
                  {accounts.description + " - " + accounts.comments}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="status" isRequired>
            <FormLabel>Status</FormLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Lançada">Lançada</option>
              <option value="Confirmada">Confirmada</option>
              <option value="Paga">Paga</option>
              <option value="Cancelada">Cancelada</option>
            </Select>
          </FormControl>

          <FormControl id="comments">
            <FormLabel>Comentários</FormLabel>
            <Select
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            >
              <option value="On">On</option>
              <option value="Off">Off</option>
            </Select>
          </FormControl>

          <Button mt={4} colorScheme="teal" type="submit">
            {entryId ? 'Atualizar Entrada' : 'Criar Entrada'}
          </Button>
        </VStack>
      </form>
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

export default EntryForm;
