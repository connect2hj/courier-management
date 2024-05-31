"use client";
import { authVar } from "@/utils/vars";
import { useReactiveVar } from "@apollo/client";
import { AuthenticatedUser } from "@gql";
import { LocalActivity } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React from "react";

const AdminDashboard = () => {
  const router = useRouter();
  const authenticatedUser = useReactiveVar(authVar);
  const user = JSON.parse(
    localStorage?.getItem("authToken") as string
  ) as AuthenticatedUser | null;
  React.useEffect(() => {
    if (user) {
      authVar(user);
    }
  }, [router.refresh]);

  return (
    <div>
      You are in Admin Dashboard {JSON.stringify(authenticatedUser?.name)}
    </div>
  );
};

export default AdminDashboard;
