"use client";
import { AdminLayout } from "@/components/AdminLayout";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Stack } from "@mui/material";

export const FETCH_COURIERS = gql`
  query fetch {
    fetchCouriers {
      id
      courierDesc
    }
  }
`;
export const Page = () => {
  const fetch = useQuery(FETCH_COURIERS);
  const couriers = fetch.data?.fetchCouriers || [];
  if (fetch.error) {
    return <div>{fetch.error.message}</div>;
  }
  return (
    <AdminLayout>
      <Stack>
        {couriers.map((courier: any) => (
          <>
            <Stack>{courier.id}</Stack>

            <Stack>{courier.courierDesc}</Stack>
          </>
        ))}
      </Stack>
    </AdminLayout>
  );
};

export default Page;
