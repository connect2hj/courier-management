"use client";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import React from "react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthenticatedUser, User } from "@gql";
import { authVar, isLoggedIn } from "@/utils/vars";

//Email and password validation section
const emailRegex = /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/;

// taking data form DataBase to authanticate the user using Existing Credentials....
const AUTH_USER = gql`
  mutation validateUser($input: LoginInput!) {
    validateUser(input: $input) {
      id
      token
      email
      name
    }
  }
`;
const writeToken = (token: AuthenticatedUser) =>
  localStorage.setItem("authToken", JSON.stringify(token));
const fetchToken = localStorage?.getItem("authToken");
const token = fetchToken
  ? (JSON.parse(fetchToken as string) as AuthenticatedUser)
  : null;
export const SignIn = () => {
  const [form, setForm] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const disabled = !emailRegex.test(form.email) || form.password.length < 6;
  //calling router
  const router = useRouter();
  const [validateUser] = useMutation<{
    validateUser: AuthenticatedUser;
  }>(AUTH_USER, {
    onCompleted: (data) => {
      data?.validateUser && writeToken(data.validateUser);
      token &&
        authVar({
          id: token.id,
          name: token.name,
          token: token.token,
          email: token.email,
        });
      isLoggedIn(true);
      router.push("/dashboard/admin-dashboard");
    },
    onError: (e) => alert(e.message),
  });
  const [show, setShow] = React.useState(false);
  return (
    <Container component="main" maxWidth="xs">
      email: {form.email}/n password: {form.password}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            placeholder="example@example.com"
            autoFocus
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={show ? "text" : "password"}
            id="password"
            InputProps={{
              endAdornment: !show ? (
                <IconButton onClick={() => setShow(true)}>
                  <Visibility />
                </IconButton>
              ) : (
                <IconButton onClick={() => setShow(false)}>
                  {" "}
                  <VisibilityOff />
                </IconButton>
              ),
            }}
            autoComplete="current-password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
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
              await validateUser({
                variables: {
                  input: form,
                },
              });
            }}
            disabled={disabled}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
