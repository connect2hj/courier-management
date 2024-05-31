"use client";
import AdminDashboard from "@/components/AdminDashboard";
import AdminLayout from "@/components/AdminLayout";
import React from "react";

const page = () => {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  );
};

export default page;
