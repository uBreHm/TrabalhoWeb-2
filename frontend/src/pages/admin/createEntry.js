// pages/admin/createEntry.js
import React from "react";
import EntryForm from "@/components/entryForm";
import Navbar from "@/components/navbar";
import { authMiddleware } from "@/middleware/auth";

const CreateEntry = () => {
  return (
    <div>
      <Navbar />
      <div style={{ marginLeft: '220px', padding: '20px' }}>
        <EntryForm />
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { props } = await authMiddleware(ctx);
  return { props };
};

export default CreateEntry;
