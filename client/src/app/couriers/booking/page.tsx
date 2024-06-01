"use client";
import { AdminLayout } from "@/components/AdminLayout";
import React from "react";
import { AddCourier } from "@/components/AddCourier";
const Page = () => {
  return (
    <AdminLayout>
      <AddCourier />
    </AdminLayout>
  );
};

export default Page;
