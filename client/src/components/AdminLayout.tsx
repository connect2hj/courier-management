import { AppBar, Stack } from "@mui/material";
import React from "react";
import Header from "./Header";
type AdminLayoutProps = {children: React.ReactNode}
const AdminLayout = ({children}:AdminLayoutProps) => {
  return (
    <Stack sx={{ width: "100vw", height: "100vh" }}>
      <Stack height={'60px'}>
        <Header/>
      </Stack>
      <Stack sx={{height: 'calc(100vh - 60px)'}}>
        {children}
         </Stack>
    </Stack>
  );
};

export default AdminLayout;
