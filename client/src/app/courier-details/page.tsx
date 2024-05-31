"use client";
import { AdminLayout } from "@/components/AdminLayout";
import { CourierDetails } from "@/components/CourierDetails";
import React from "react";

const Page = () => {
  return (
    <AdminLayout>
      <CourierDetails />
    </AdminLayout>
  );
};

export default Page;
