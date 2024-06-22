"use client";

import { AppBar, Stack } from "@mui/material";
import React from "react";
import Header from "./Header";
import { ApolloWrapper } from "@/utils/ApolloWrapper";
import { useReactiveVar } from "@apollo/client";
import { authVar, isLoggedIn } from "@/utils/vars";
import { useRouter } from "next/navigation";
import { AuthenticatedUser } from "@gql";
type AdminLayoutProps = { children: React.ReactNode };
export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const authenticatedUser = useReactiveVar(authVar);

  const token = (
    localStorage.getItem("authToken") as unknown as
      | AuthenticatedUser
      | undefined
  )?.token;
  const mounted = typeof window !== "undefined";
  React.useEffect(() => {
    authVar(
      (mounted &&
        (JSON.parse(
          localStorage.getItem("authToken") as string
        ) as AuthenticatedUser)) ||
        null
    );
  }, []);
  console.log("here", authenticatedUser);

  React.useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, []);
  return (
    <Stack sx={{ width: "100vw", height: "100vh" }}>
      <Stack height={"60px"}>
        <Header />
      </Stack>
      <Stack sx={{ height: "calc(100vh - 60px)" }}>{children}</Stack>
    </Stack>
  );
};
export default AdminLayout;
