"use client";

import { AppBar, Stack } from "@mui/material";
import React from "react";
import Header from "./Header";
import { ApolloWrapper } from "@/utils/ApolloWrapper";
import { useReactiveVar } from "@apollo/client";
import { authVar } from "@/utils/vars";
import { useRouter } from "next/navigation";
type AdminLayoutProps = { children: React.ReactNode };
export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const authenticatedUser = useReactiveVar(authVar);
  if (!authenticatedUser) {
    router.push("/login");
    return null;
  }

  return (
    <Stack sx={{ width: "100vw", height: "100vh" }}>
      <Stack height={"60px"}>
        <Header />
      </Stack>
      <Stack sx={{ height: "calc(100vh - 60px)" }}>{children}</Stack>
    </Stack>
  );
};
