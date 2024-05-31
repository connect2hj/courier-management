import { SearchOutlined } from "@mui/icons-material";
import { Button, InputAdornment, Stack, TextField } from "@mui/material";
import React from "react";
import ContactUs from "./ContactUs";

const LandingPage = () => {
  return (
    <Stack sx={{ height: "100vh" }}>
      <Stack
        sx={{ height: "90%", alignItems: "center", justifyContent: "center" }}
      >
        <TextField
          sx={{ width: { xs: "90%", md: "50%" } }}
          placeholder="Track Here(Phone Number/Ref ID)"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <Button variant="contained" sx={{ align: "right" }}>
                Track
              </Button>
            ),
          }}
        />
      </Stack>
    </Stack>
  );
};

export default LandingPage;
