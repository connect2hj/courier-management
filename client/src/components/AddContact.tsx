"use client";
import { FETCH_CONTACTS } from "@/app/contacts/page";
import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { AdminLayout } from "./AdminLayout";
const CREATE_CUSTOMER = gql`
  mutation createCustomer($input: CustomerInput!) {
    createCustomer(input: $input) {
      id
      name
      phone
    }
  }
`;
export const AddContact = () => {
  const [form, setForm] = React.useState<{ name: string; phone: string }>({
    name: "",
    phone: "",
  });
  const router = useRouter();
  const [createCustomer, { data, error }] = useMutation(CREATE_CUSTOMER);
  const disabled = form.name.length < 3 || form.phone.length < 10;
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
          Add contact
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
            value={form.name}
            autoFocus
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="phone"
            label="Phone"
            type="string"
            value={form.phone}
            id="phone"
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value.slice(0, 13) })
            }
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={async () => {
              await createCustomer({
                variables: {
                  input: form,
                },
                refetchQueries: [FETCH_CONTACTS],
              });
              router.push("/contacts");
            }}
            disabled={disabled}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
