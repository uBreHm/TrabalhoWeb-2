
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



export default CreateEntry;
