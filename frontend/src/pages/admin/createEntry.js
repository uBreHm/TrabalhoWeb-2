// pages/admin/createEntry.js
import React from "react";
import EntryForm from "@/components/createEditEntry";
import Navbar from "@/components/navbar";
import { authMiddleware } from "@/middleware/auth";

const CreateEntry = () => {
  return (
    <div>
      <Navbar />
      <div style={{ marginLeft: '220px', padding: '20px' }}> {/* Ajuste para não sobrepor o navbar fixo */}
        <h1>Criar Nova Entrada</h1>
        <EntryForm />
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const authResult = await authMiddleware(ctx);
  if ('redirect' in authResult) {
    return authResult;
  }
  return {
    props: { ...authResult.props },
  };
}

export default CreateEntry;
