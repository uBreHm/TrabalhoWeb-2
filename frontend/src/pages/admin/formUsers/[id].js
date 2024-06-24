// pages/formUsers/[id].js

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import FormUser from "@/components/formUsers";
import Navbar from "@/components/navbar";
import { fetchUsersById } from "../../api/user";
import { authMiddleware } from "@/middleware/auth";

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUsersById(id);
        setUser(userData);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);


  return (
    <Box>
      <Navbar />
      <Box p={4} width="100%">
        <h1>Editar Usuário</h1>
        {user ? (
          <FormUser userData={user} /> // Passe os dados do usuário para o componente FormUser
        ) : (
          <p>Carregando...</p>
        )}
      </Box>
    </Box>
  );
};

export const getServerSideProps = async (ctx) => {
  const authResult = await authMiddleware(ctx);

  if (authResult.redirect) {
    return authResult;
  }

  if (!authResult.props || !authResult.props.isAdmin) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { isAdmin: authResult.props.isAdmin },
  };
};



export default UserPage;
