"use client";
// Predefined Libraries from MUI/ Apollo Client/ GQL/ Router
import { FETCH_COURIERS } from "@/app/couriers/page";
import { gql, useMutation } from "@apollo/client";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";

// Creating an API....Creating Courier Details...
const CREATE_COURIER = gql`
  mutation Mutation($input: CourierInput!) {
    createCourier(input: $input) {
      courierDesc
      courierType
      destinationAddress
      returnAddress
      courierStatus
      arrivalDate
      courierWeight
      courierCost
    }
  }
`; // End of GQL..

export const AddCourier = () => {
  const [form, setForm] = useState({
    courierDesc: "",
    courierType: "",
    destinationAddress: "",
    returnAddress: "",
    courierStatus: "processing", //Default Value....
    arrivalDate: "",
    courierWeight: "",
    courierCost: "",
  });

  const router = useRouter();
  const [createCourier, { data, error, loading }] = useMutation(CREATE_COURIER);

  // Load development messages if in development environment
  useEffect(() => {
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) {
      loadDevMessages();
      loadErrorMessages();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createCourier({
        variables: { input: form },
        refetchQueries: [FETCH_COURIERS],
      });

      if (result.data.createCourier) {
        alert("Courier created successfully:");
        router.push("/couriers");
      } else {
        console.error("Courier creation failed:", result);
      }
    } catch (err: any) {
      console.error("Error creating courier:", err.message);
    }
  };

  return (
    // Creating Booking Registration form..
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" fontWeight={"semibold"}>
          Courier Details
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="courierDesc"
            label="Courier Description"
            name="courierDesc"
            type="string"
            autoFocus
            value={form.courierDesc}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="courierType"
            label="Courier Type"
            name="courierType"
            type="string"
            value={form.courierType}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="destinationAddress"
            label="Destination Address"
            name="destinationAddress"
            type="string"
            value={form.destinationAddress}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="returnAddress"
            label="Return Address"
            name="returnAddress"
            type="string"
            value={form.returnAddress}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="courierStatus"
            label="Courier Status"
            name="courierStatus"
            type="string"
            value={form.courierStatus}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="arrivalDate"
            label="Arrival Date"
            name="arrivalDate"
            type="string"
            value={form.arrivalDate}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="courierWeight"
            label="Courier Weight"
            name="courierWeight"
            type="string"
            value={form.courierWeight}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="courierCost"
            label="Courier Cost"
            name="courierCost"
            type="string"
            value={form.courierCost}
            onChange={handleChange}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Booking..." : "Book"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
