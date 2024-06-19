import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import EntryForm from "@/components/EntryForm";
import { getEntryById } from "@/pages/api/entries";
import { authMiddleware } from "@/middleware/auth";

const EntryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await getEntryById(id);
        setEntry(response.data);
      } catch (error) {
        console.error("Error fetching entry:", error);
      }
    };

    if (id) {
      fetchEntry();
    }
  }, [id]);

  return (
    <Box>
      <EntryForm entry={entry} />
    </Box>
  );
};

export default EntryPage;
