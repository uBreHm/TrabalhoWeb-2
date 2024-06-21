// pages/admin/createEntry.js
import React from "react";
import CategoryForm from "@/components/categoryForm";
import Navbar from "@/components/navbar";
import { authMiddleware } from "@/middleware/auth";

const CreateEntry = () => {
  return (
    <div>
      <Navbar />
      <div style={{ marginLeft: '220px', padding: '20px' }}>
        <CategoryForm />
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const { props } = await authMiddleware(ctx);
  return { props };
};

export default CreateEntry;
