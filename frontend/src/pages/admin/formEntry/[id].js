// pages/entries/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import Navbar from '../../../components/navbar';
import EntryForm from '../../../components/entryForm'; 
import { fetchEntryById } from '@/pages/api/entries';

const PageEntry = () => {
  const router = useRouter();
  const { id } = router.query;
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      if (id) {
        try {
          const data = await fetchEntryById(id);
          if (data) {
            setEntry(data);
          } else {
            setError('Nenhuma entrada encontrada com o ID especificado.');
          }
        } catch (error) {
          setError(`Erro ao buscar entrada: ${error.message}`);
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
          <EntryForm entryId={id} initialValues={entry} />
        ) : (
          <Text>Nenhuma entrada encontrada com o ID especificado.</Text>
        )}
      </Box>
    </Box>
  );
};

export default PageEntry;
