import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import Navbar from '../../../components/navbar';
import EntryForm from '../../../components/createEditEntry'; 
import { fetchEntryById } from '../../api/entries';

const PageEntry = () => {
  const router = useRouter();
  const { id } = router.query;
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>  {
    const fetchEntry = async () => {
      if (id) {
        try {
          const data = await fetchEntryById(id);
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
        <Heading>Carregando...</Heading>
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
