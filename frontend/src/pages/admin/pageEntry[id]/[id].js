import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import Navbar from '../../../components/navbar';
import EntryForm from '../../../components/createEditEntry'; // Corrigido o caminho de importação
import { fetchEntryById } from '../../../pages/api/entries'; // Corrigido o caminho de importação

const PageEntry = () => {
  const router = useRouter();
  const { id } = router.query; // Captura o parâmetro id da URL
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      if (id) {
        try {
          const data = await fetchEntryById(id); // Função para buscar a entrada por ID
          setEntry(data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  if (loading) {
    return (
      <Box p={5}>
        <Heading>Loading...</Heading>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={5}>
        <Heading>Error: {error}</Heading>
      </Box>
    );
  }

  return (
    <Box>
      <Navbar />
      <Box ml={220} p={5}>
        <Heading mb={5}>{entry ? 'Editar Entrada' : 'Criar Nova Entrada'}</Heading>
        {entry ? (
          <EntryForm entry={entry} />
        ) : (
          <Text>Nenhuma entrada encontrada com o ID especificado.</Text>
        )}
      </Box>
    </Box>
  );
};

export default PageEntry;
