import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input, Select, useToast } from '@chakra-ui/react';
import { updateUser, createUser, fetchUsersById } from '../pages/api/user';
import { authMiddleware } from '@/middleware/auth';

const FormUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    user: '',
    pwd: '',
    level: '',
    status: ''
  });

  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      if (id) {
        try {
          const data = await fetchUsersById(id);
          const userData = data.foundedUser; // Acesse a estrutura correta da resposta
          setFormData({
            name: userData.name || '',
            email: userData.email || '',
            user: userData.user || '',
            pwd: '',
            level: userData.level || '',
            status: userData.status || ''
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast({ title: 'Erro ao buscar dados do usuário.', description: error.message, status: 'error' });
        }
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCancel = () => {
    router.push('/admin/users', authMiddleware);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateUser(id, formData); // Atualiza o usuário se já existir o ID
        toast({ title: 'Usuário atualizado com sucesso!', status: 'success' });
      } else {
        await createUser(formData); // Cria um novo usuário se não existir ID
        toast({ title: 'Usuário criado com sucesso!', status: 'success' });
      }
      router.push('/admin/dashboard');
    } catch (err) {
      toast({ title: 'Erro ao salvar usuário.', description: err.message, status: 'error' });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={8}>
      <form onSubmit={handleSubmit}>
        <FormControl id="name" isRequired>
          <FormLabel>Nome</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl id="email" isRequired mt={4}>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormControl>
        <FormControl id="user" isRequired mt={4}>
          <FormLabel>Usuário</FormLabel>
          <Input type="text" name="user" value={formData.user} onChange={handleChange} />
        </FormControl>
        <FormControl id="pwd" mt={4}>
          <FormLabel>Senha</FormLabel>
          <Input type="password" name="pwd" value={formData.pwd} onChange={handleChange} />
        </FormControl>
        <FormControl id="level" isRequired mt={4}>
          <FormLabel>Nível</FormLabel>
          <Select name="level" value={formData.level} onChange={handleChange}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Select>
        </FormControl>
        <FormControl id="status" isRequired mt={4}>
          <FormLabel>Status</FormLabel>
          <Select name="status" value={formData.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="teal" mt={4}>
          {id ? 'Atualizar' : 'Criar'} Usuário
        </Button>
        <Button onClick={handleCancel} colorScheme="gray" mt={4} ml={3}>
          Cancelar
        </Button>
      </form>
    </Box>
  );
};

export default FormUser;
