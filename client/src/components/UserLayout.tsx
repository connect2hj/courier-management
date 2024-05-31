"use client";

import { AppBar, Stack } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";
import UserHeader from "./UserHeader";
type UserLayoutProps = { children: React.ReactNode };
export const UserLayout = ({ children }: UserLayoutProps) => {
  const router = useRouter();

  return (
    <Stack sx={{ width: "100vw", height: "100vh" }}>
      <Stack height={"60px"}>
        <UserHeader />
      </Stack>
      <Stack sx={{ height: "calc(100vh - 60px)" }}>{children}</Stack>
    </Stack>
  );
};
