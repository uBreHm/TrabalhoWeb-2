// src/components/Nav.js

import { Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link'; // Importando Link do Next.js

export default function Nav() {
  return (
    <nav>
      <Flex direction="column" alignItems="flex-start">
        <Flex direction="column" mt="auto" pt="20px">
          <Button as={NextLink} href="/admin/cadastrar-usuario" variant="solid">
            Cadastrar Usuário
          </Button>
          <Button as={NextLink} href="/admin/cadastrar-contas" variant="solid">
            Cadastrar Contas
          </Button>
        </Flex>
      </Flex>
    </nav>
  );
}
