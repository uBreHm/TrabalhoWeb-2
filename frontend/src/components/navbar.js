//components/navbar
import { Box, Button, VStack } from '@chakra-ui/react';
import { SkipNavLink } from '@chakra-ui/skip-nav';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/login');
  };

  return (
    <Box w="220px" bg="gray.800" color="white" p={4} position="fixed" height="100vh" display="flex" flexDirection="column" alignItems="center">
      <SkipNavLink>Skip to content</SkipNavLink>
      <VStack align="stretch" spacing={4} width="100%">
        <NextLink href="/admin/dashboard" passHref>
          <Button colorScheme="teal" variant="ghost" width="100%" textAlign="left">
            Dashboard
          </Button>
        </NextLink>
        <NextLink href="/admin/entriesTable" passHref>
          <Button colorScheme="teal" variant="ghost" width="100%" textAlign="left">
            Lançamentos
          </Button>
        </NextLink>
        <NextLink href="/admin/categories" passHref>
          <Button colorScheme="teal" variant="ghost" width="100%" textAlign="left">
            Categorias
          </Button>
        </NextLink>
        <NextLink href="/admin/accounts" passHref>
          <Button colorScheme="teal" variant="ghost" width="100%" textAlign="left">
            Contas
          </Button>
        </NextLink>
        <NextLink href='/admin/users' passHref>
          <Button colorScheme="teal" variant="ghost" width="100%" textAlign="left">
            Usuários
          </Button>
        </NextLink>
        <Button onClick={handleLogout} colorScheme="teal" variant="outline" width="100%">
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default Navbar;
