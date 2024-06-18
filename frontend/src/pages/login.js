import { useState } from 'react';
import { useRouter } from 'next/router';
import { login, checkAdmin } from '../pages/api/hello';
import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Message from '../components/messages';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ user: '', pwd: '' });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData.user, formData.pwd);
      if (response && response.token) {
        Cookies.set('token', response.token);
        try {
          const isAdminResponse = await checkAdmin(response.token);
          if (isAdminResponse.isAdmin) {
            setMessage({ type: 'success', text: 'Login efetuado com sucesso' });
            router.push('/admin/dashboard');
          } else {
            setMessage({ type: 'error', text: 'Usuário não é administrador' });
            router.push('/');
          }
        } catch (error) {
          setMessage({ type: 'error', text: 'Erro ao verificar acesso de administrador' });
        }
      } else {
        setMessage({ type: 'error', text: 'Credenciais inválidas' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao fazer login' });
      Cookies.remove('token');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bg="gray.800" color="white">
      <Box bg="gray.700" p={8} borderRadius="lg" maxW="md" w="100%">
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="user">Usuário</FormLabel>
              <Input
                type="text"
                id="user"
                name="user"
                value={formData.user}
                onChange={handleChange}
                color="white"
                bg="gray.600"
                border="1px solid"
                borderColor="gray.600"
                _hover={{ borderColor: 'gray.400' }}
                _focus={{ borderColor: 'teal.400', boxShadow: 'outline' }}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="pwd">Senha</FormLabel>
              <Input
                type="password"
                id="pwd"
                name="pwd"
                value={formData.pwd}
                onChange={handleChange}
                color="white"
                bg="gray.600"
                border="1px solid"
                borderColor="gray.600"
                _hover={{ borderColor: 'gray.400' }}
                _focus={{ borderColor: 'teal.400', boxShadow: 'outline' }}
                required
              />
            </FormControl>
            <Button type="submit" bg="teal.400" color="white" _hover={{ bg: 'teal.500' }}>
              Entrar
            </Button>
          </Stack>
        </form>
        {message.text && <Message type={message.type} message={message.text} />}
      </Box>
    </Box>
  );
};

export default Login;
