import AdminLayout from "@/components/AdminLayout";
import StaffDashboard from "@/components/StaffDashboard";
import React from "react";

const page = () => {
  return (
    <AdminLayout>
      <StaffDashboard />
    </AdminLayout>
  );
};

export default page;
