"use client";
import AdminLayout from "@/components/AdminLayout";
import { gql, useQuery } from "@apollo/client";
import { Stack } from "@mui/material";
import React from "react";

export const FETCH_CONTACTS = gql`
  query fetch {
    fetchCustomers {
      id
      name
      phone
    }
  }
`;
export const page = () => {
  const fetch = useQuery(FETCH_CONTACTS);
  const contacts = fetch.data?.fetchCustomers || [];
  if (fetch.error) {
    return <div>{fetch.error.message}</div>;
  }
  return (
    <AdminLayout>
      <Stack>
        {contacts.map((contact: any) => (
          <>
            <Stack>{contact.id}</Stack>

            <Stack>{contact.name}</Stack>
            <Stack>{contact.phone}</Stack>
          </>
        ))}
      </Stack>
    </AdminLayout>
  );
};

export default page;
