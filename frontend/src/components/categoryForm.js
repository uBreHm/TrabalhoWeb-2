import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input, Select, useToast } from '@chakra-ui/react';
import { createCategories, updateCategories, fetchCategoriesById } from '@/pages/api/categories';

const CategoryForm = ({ categoryId }) => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (categoryId) {
      fetchCategory(categoryId);
    }
  }, [categoryId]);

  const fetchCategory = async (id) => {
    try {
      const response = await fetchCategoriesById(`/${id}`);
      const { description, type } = response;
      setDescription(description);
      setType(type);
    } catch (error) {
      toast({
        title: 'Erro ao buscar categoria.',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { description, type };

    try {
      if (categoryId) {
        await updateCategories(`/${categoryId}`, categoryData);
        toast({
          title: 'Categoria atualizada.',
          description: 'Categoria atualizada com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      } else {
        await createCategories(categoryData);
        toast({
          title: 'Categoria criada.',
          description: 'Categoria criada com sucesso!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      }
      router.push('/admin/categories');
    } catch (error) {
      toast({
        title: 'Erro.',
        description: `Erro ao ${categoryId ? 'atualizar' : 'criar'} categoria: ${error.message}`,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <FormControl id="type" isRequired mt={4}>
          <FormLabel>Tipo</FormLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Selecione o tipo"
          >
            <option value="Receita">Receita</option>
            <option value="Despesa">Despesa</option>
          </Select>
        </FormControl>
        <FormControl id="description" isRequired>
          <FormLabel>Descrição</FormLabel>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">
          {categoryId ? 'Atualizar Categoria' : 'Criar Categoria'}
        </Button>
      </form>
    </Box>
  );
};

export default CategoryForm;
