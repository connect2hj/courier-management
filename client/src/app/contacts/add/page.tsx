"use client";
import { AddContact } from "@/components/AddContact";
import AdminLayout from "@/components/AdminLayout";
import React from "react";

const page = () => {
  return (
    <AdminLayout>
      <AddContact />
    </AdminLayout>
  );
};

export default page;
