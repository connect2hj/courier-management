"use client";

import { FETCH_CONTACTS } from "@/app/contacts/page";
import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

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
  const [createCustomer, { error }] = useMutation(CREATE_CUSTOMER, {
    refetchQueries: [FETCH_CONTACTS],
    onCompleted: () => {
      router.push("/contacts");
    },
    onError: (err) => {
      alert(`Error: ${err.message}`);
    },
  });

  const disabled = form.name.length < 3 || form.phone.length < 10;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value.slice(0, 9);
    if (!isNaN(Number(phone))) {
      setForm({ ...form, phone });
    }
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
          Add contact
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
                value={form.name}
                autoFocus
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone"
                type="text"
                value={form.phone}
                id="phone"
                onChange={handlePhoneChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={async () => {
                  await createCustomer({
                    variables: {
                      input: form,
                    },
                  });
                }}
                disabled={disabled}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
