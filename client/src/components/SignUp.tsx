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
import React, { useState } from "react";

const CREATE_USER = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      phone
      email
      password
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
  const [createUser, { error, loading }] = useMutation(CREATE_USER, {
    onCompleted: () => router.push("/login"),
    onError: (e) => alert(JSON.stringify(e.message)),
  });

  const handleSubmit = async () => {
    if (form.password !== form.currentPassword) {
      alert("Passwords do not match");
      return;
    }

    await createUser({
      variables: {
        input: {
          name: form.name,
          phone: form.phone,
          email: form.email,
          password: form.password,
          currentPassword: form.currentPassword,
        },
      },
    });
  };

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
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone"
                type="string"
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="currentPassword"
                label="Confirm Password"
                type="password"
                id="currentPassword"
                value={form.currentPassword}
                onChange={(e) =>
                  setForm({ ...form, currentPassword: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
                disabled={loading}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => router.push("/login")}
              >
                Already Have an account? Sign-In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
