import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import EntryForm from "@/components/createEditEntry";
import { fetchEntryById } from "@/pages/api/entries";
import { authMiddleware } from "@/middleware/auth";

const EntryPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetchEntryById(id);
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




export default EntryPage;
