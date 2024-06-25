"use client";

import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const CREATE_USER = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      phone
      email
      password
      currentPassword
    }
  }
`;

export const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    currentPassword: "",
  });

  const router = useRouter();
  const [createUser, { data, error, loading }] = useMutation(CREATE_USER, {
    onCompleted: () => router.push("/login"),
    onError: (e) => alert(JSON.stringify(e.message)),
  });

  // Validation Onhold....
  // const disabled = form.name.length < 3  || form.phone.length < 10 || loading;
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register Here
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            type="string"
            autoFocus
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="phone"
            type="string"
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          {/* changes will be rectified Later after debugging */}

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="password"
            type="string"
            id="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="CurrentPassword"
            label="Confirm password"
            type="string"
            id="currentPassword"
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={async () => {
              await createUser({
                variables: {
                  input: form,
                },
              });
            }}
          >
            Register
          </Button>
          <Box>
            <Box>
              <Button fullWidth variant="outlined">
                {"Already Have an account? Sign-In"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
